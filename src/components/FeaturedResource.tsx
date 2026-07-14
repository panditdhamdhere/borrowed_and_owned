import Link from "next/link";
import { ResourceBadges } from "@/components/ResourceBadges";
import { CATEGORY_LABELS, type Resource } from "@/lib/types";

interface FeaturedResourceProps {
  resource: Resource;
  stars?: number;
}

export function FeaturedResource({ resource, stars }: FeaturedResourceProps) {
  return (
    <section className="mb-12">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          Featured this week
        </h2>
        <Link
          href="/changelog"
          className="text-sm text-rust hover:text-rust-light"
        >
          Recently added →
        </Link>
      </div>
      <article className="rounded-2xl border border-rust/20 bg-gradient-to-br from-rust/5 to-transparent p-6 sm:p-8 dark:border-rust/30 dark:from-rust/10">
        <ResourceBadges
          resource={resource}
          stars={stars}
          starsLabel="★"
        />
        <h3 className="mt-4 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          <Link
            href={`/resource/${resource.id}`}
            className="hover:text-rust dark:hover:text-rust-light"
          >
            {resource.title}
          </Link>
        </h3>
        {resource.author && (
          <p className="mt-1 text-sm text-zinc-500">by {resource.author}</p>
        )}
        <p className="mt-3 max-w-2xl text-zinc-600 dark:text-zinc-400">
          {resource.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/resource/${resource.id}`}
            className="rounded-lg bg-rust px-4 py-2 text-sm font-medium text-white hover:bg-rust-light transition-colors"
          >
            View details
          </Link>
          <a
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:border-rust/50 dark:border-zinc-700 dark:text-zinc-300"
          >
            Visit {CATEGORY_LABELS[resource.category].toLowerCase()} ↗
          </a>
        </div>
      </article>
    </section>
  );
}
