import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getRecentResources } from "@/lib/resources";
import { CATEGORY_LABELS } from "@/lib/types";

export default function ChangelogPage() {
  const recent = getRecentResources(50);

  return (
    <PageShell>
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        Changelog
      </h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        Recently added resources to the collection.
      </p>

      {recent.length === 0 ? (
        <p className="text-zinc-500">No dated entries yet.</p>
      ) : (
        <ul className="space-y-4">
          {recent.map((resource) => (
            <li
              key={resource.id}
              className="flex flex-col gap-1 rounded-lg border border-zinc-200 bg-white px-4 py-3 sm:flex-row sm:items-center sm:justify-between dark:border-zinc-800 dark:bg-zinc-900/50"
            >
              <div>
                <Link
                  href={`/resource/${resource.id}`}
                  className="font-medium text-zinc-900 hover:text-rust dark:text-zinc-100 dark:hover:text-rust-light"
                >
                  {resource.title}
                </Link>
                <p className="text-sm text-zinc-500">
                  {CATEGORY_LABELS[resource.category]}
                  {resource.author ? ` · ${resource.author}` : ""}
                </p>
              </div>
              {resource.addedAt && (
                <time
                  dateTime={resource.addedAt}
                  className="text-sm text-zinc-400"
                >
                  {new Date(resource.addedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </time>
              )}
            </li>
          ))}
        </ul>
      )}
    </PageShell>
  );
}
