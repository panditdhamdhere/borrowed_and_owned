import Link from "next/link";
import { LearningPathCard } from "@/components/LearningPathCard";
import { PageShell } from "@/components/PageShell";
import { ResourceFilters } from "@/components/ResourceFilters";
import { RustCrab } from "@/components/RustCrab";
import { getAllPaths, getPathResources } from "@/lib/paths";
import { getAllResources, getCategoriesWithCounts } from "@/lib/resources";
import { fetchRepoStarsMap } from "@/lib/repo-stars";
import { siteConfig } from "@/lib/site";

export default async function Home() {
  const resources = getAllResources();
  const categories = getCategoriesWithCounts();
  const paths = getAllPaths();
  const starsMap = await fetchRepoStarsMap(resources);

  return (
    <PageShell>
      <section className="mb-12">
        <div className="mb-6 flex items-start gap-6">
          <RustCrab
            size={80}
            className="hidden shrink-0 animate-bounce sm:block"
            style={{ animationDuration: "3s" }}
          />
          <div>
            <p className="mb-3 font-mono text-sm text-rust dark:text-rust-light">
              {"// open source · community curated"}
            </p>
            <h1 className="mb-4 max-w-2xl text-4xl font-bold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              Everything you need to learn Rust
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              Books, videos, courses, open source repos, and more — all in one
              place. Follow a learning path or browse everything below.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href={siteConfig.githubSubmitUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-rust px-4 py-2 text-sm font-medium text-white hover:bg-rust-light transition-colors"
              >
                Submit a resource
              </a>
              <Link
                href="/paths"
                className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:border-rust/50 dark:border-zinc-700 dark:text-zinc-300"
              >
                Browse learning paths
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          {categories.map(({ category, label, count }) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-sm text-zinc-600 transition-colors hover:border-rust/40 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-400"
            >
              <span className="font-semibold text-zinc-900 dark:text-zinc-200">
                {count}
              </span>{" "}
              {label.toLowerCase()}
            </Link>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            Learning paths
          </h2>
          <Link
            href="/paths"
            className="text-sm text-rust hover:text-rust-light"
          >
            View all →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {paths.slice(0, 4).map((path) => (
            <LearningPathCard
              key={path.id}
              path={path}
              resourceCount={getPathResources(path).length}
            />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          All resources
        </h2>
        <ResourceFilters resources={resources} starsMap={starsMap} />
      </section>
    </PageShell>
  );
}
