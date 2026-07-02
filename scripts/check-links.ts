import { readFileSync } from "node:fs";
import { resolve } from "node:path";

interface ResourceEntry {
  id: string;
  title: string;
  url: string;
}

const TIMEOUT_MS = 15_000;
const CONCURRENCY = 8;

const USER_AGENT =
  "Mozilla/5.0 (compatible; borrowed-and-owned-link-checker/1.0; +https://borrowed-and-owned.vercel.app)";

function loadResources(): ResourceEntry[] {
  const filePath = resolve("src/content/resources.json");
  return JSON.parse(readFileSync(filePath, "utf8")) as ResourceEntry[];
}

function isOkStatus(status: number): boolean {
  return (
    (status >= 200 && status < 400) ||
    status === 403 ||
    status === 405 ||
    status === 429
  );
}

async function fetchWithMethod(
  url: string,
  method: "HEAD" | "GET",
  signal: AbortSignal,
): Promise<Response> {
  return fetch(url, {
    method,
    signal,
    redirect: "follow",
    headers: {
      "User-Agent": USER_AGENT,
      Accept: "text/html,application/xhtml+xml,*/*",
    },
  });
}

async function checkUrl(url: string): Promise<{ ok: boolean; status?: number; error?: string }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    let lastStatus: number | undefined;
    let lastError: string | undefined;

    for (const method of ["HEAD", "GET"] as const) {
      try {
        const response = await fetchWithMethod(url, method, controller.signal);
        lastStatus = response.status;

        if (isOkStatus(response.status)) {
          return { ok: true, status: response.status };
        }
      } catch (error) {
        lastError = error instanceof Error ? error.message : "unknown error";
      }
    }

    if (lastStatus !== undefined) {
      return { ok: false, status: lastStatus };
    }

    return { ok: false, error: lastError ?? "unreachable" };
  } finally {
    clearTimeout(timeout);
  }
}

async function runPool<T, R>(
  items: T[],
  worker: (item: T) => Promise<R>,
  concurrency: number,
): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let index = 0;

  async function runWorker() {
    while (index < items.length) {
      const current = index++;
      results[current] = await worker(items[current]);
    }
  }

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, runWorker),
  );

  return results;
}

async function main() {
  const resources = loadResources();
  console.log(`Checking ${resources.length} resource links...\n`);

  const results = await runPool(
    resources,
    async (resource) => {
      const result = await checkUrl(resource.url);
      const label = result.ok
        ? `OK (${result.status ?? "?"})`
        : `FAIL (${result.status ?? result.error})`;
      console.log(`${label.padEnd(16)} ${resource.id}`);
      return { resource, ...result };
    },
    CONCURRENCY,
  );

  const failures = results.filter((result) => !result.ok);

  if (failures.length > 0) {
    console.error(`\n${failures.length} broken link(s):\n`);
    for (const failure of failures) {
      console.error(`- ${failure.resource.id}: ${failure.resource.url}`);
      console.error(`  ${failure.status ?? failure.error}\n`);
    }
    process.exit(1);
  }

  console.log(`\nAll ${resources.length} links look reachable.`);
}

void main();
