import Link from "next/link";
import { BookmarkButton } from "@/components/BookmarkButton";
import { ResourceBadges } from "@/components/ResourceBadges";
import type { Resource } from "@/lib/types";

interface ResourceCardProps {
  resource: Resource;
  stars?: number;
}

export function ResourceCard({ resource, stars }: ResourceCardProps) {
  return (
    <article className="group flex flex-col rounded-xl border border-zinc-200 bg-white p-5 transition-colors hover:border-rust/40 hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900">
      <div className="mb-3">
        <ResourceBadges resource={resource} stars={stars} />
      </div>

      <h3 className="mb-1 text-lg font-semibold text-zinc-900 group-hover:text-rust transition-colors dark:text-zinc-50 dark:group-hover:text-rust-light">
        <Link href={`/resource/${resource.id}`}>{resource.title}</Link>
      </h3>

      {resource.author && (
        <p className="mb-2 text-sm text-zinc-500">by {resource.author}</p>
      )}

      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {resource.description}
      </p>

      {resource.tags && resource.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {resource.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase()}`}
              className="rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-xs text-zinc-500 hover:text-rust dark:bg-zinc-800/80 dark:hover:text-rust-light"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      <div className="flex items-center gap-4">
        <Link
          href={`/resource/${resource.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-rust hover:text-rust-light transition-colors"
        >
          Details
          <span aria-hidden="true">→</span>
        </Link>
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
        >
          Visit ↗
        </a>
        <BookmarkButton resourceId={resource.id} compact />
      </div>
    </article>
  );
}
