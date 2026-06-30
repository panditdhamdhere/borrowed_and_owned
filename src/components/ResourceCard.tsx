import { CATEGORY_LABELS, type Resource } from "@/lib/types";

interface ResourceCardProps {
  resource: Resource;
}

export function ResourceCard({ resource }: ResourceCardProps) {
  return (
    <article className="group flex flex-col rounded-xl border border-zinc-800 bg-zinc-900/50 p-5 transition-colors hover:border-rust/40 hover:bg-zinc-900">
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span className="rounded-full bg-rust/15 px-2.5 py-0.5 text-xs font-medium text-rust-light">
          {CATEGORY_LABELS[resource.category]}
        </span>
        {resource.level && (
          <span className="rounded-full bg-zinc-800 px-2.5 py-0.5 text-xs text-zinc-400 capitalize">
            {resource.level}
          </span>
        )}
        {resource.free && (
          <span className="rounded-full bg-emerald-950 px-2.5 py-0.5 text-xs text-emerald-400">
            Free
          </span>
        )}
      </div>

      <h3 className="mb-1 text-lg font-semibold text-zinc-50 group-hover:text-rust-light transition-colors">
        <a href={resource.url} target="_blank" rel="noopener noreferrer">
          {resource.title}
        </a>
      </h3>

      {resource.author && (
        <p className="mb-2 text-sm text-zinc-500">by {resource.author}</p>
      )}

      <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-400">
        {resource.description}
      </p>

      {resource.tags && resource.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {resource.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-zinc-800/80 px-2 py-0.5 font-mono text-xs text-zinc-500"
            >
              #{tag}
            </span>
          ))}
        </div>
      )}

      <a
        href={resource.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 text-sm font-medium text-rust-light hover:text-rust transition-colors"
      >
        Visit resource
        <span aria-hidden="true">→</span>
      </a>
    </article>
  );
}
