import Link from "next/link";
import { PageShell } from "@/components/PageShell";
import { getAllTags } from "@/lib/resources";

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <PageShell>
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        Browse by tag
      </h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        Explore resources grouped by topic and theme.
      </p>
      <div className="flex flex-wrap gap-3">
        {tags.map(({ tag, count }) => (
          <Link
            key={tag}
            href={`/tags/${tag}`}
            className="rounded-lg border border-zinc-200 bg-white px-4 py-2 font-mono text-sm text-zinc-700 transition-colors hover:border-rust/40 dark:border-zinc-800 dark:bg-zinc-900/50 dark:text-zinc-300"
          >
            #{tag}
            <span className="ml-2 text-zinc-400">({count})</span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
