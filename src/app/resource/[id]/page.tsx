import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ResourceCard } from "@/components/ResourceCard";
import { fetchGitHubStars } from "@/lib/github-stars";
import {
  getAllResources,
  getRelatedResources,
  getResourceById,
} from "@/lib/resources";
import { CATEGORY_LABELS } from "@/lib/types";

interface ResourcePageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllResources().map((resource) => ({ id: resource.id }));
}

export async function generateMetadata({ params }: ResourcePageProps) {
  const { id } = await params;
  const resource = getResourceById(id);

  if (!resource) return { title: "Resource not found" };

  return {
    title: `${resource.title} — Borrowed & Owned`,
    description: resource.description,
  };
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { id } = await params;
  const resource = getResourceById(id);

  if (!resource) {
    notFound();
  }

  const related = getRelatedResources(resource);
  const stars =
    resource.category === "repo"
      ? await fetchGitHubStars(resource.url)
      : undefined;

  return (
    <PageShell>
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <Link
          href={`/category/${resource.category}`}
          className="rounded-full bg-rust/15 px-2.5 py-0.5 text-xs font-medium text-rust dark:text-rust-light"
        >
          {CATEGORY_LABELS[resource.category]}
        </Link>
        {resource.level && (
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs capitalize text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            {resource.level}
          </span>
        )}
        {resource.free && (
          <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            Free
          </span>
        )}
        {stars !== undefined && (
          <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
            ★ {stars.toLocaleString()} GitHub stars
          </span>
        )}
      </div>

      <h1 className="mb-2 text-4xl font-bold text-zinc-900 dark:text-zinc-50">
        {resource.title}
      </h1>
      {resource.author && (
        <p className="mb-4 text-zinc-500">by {resource.author}</p>
      )}
      <p className="mb-6 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        {resource.description}
      </p>

      {resource.tags && resource.tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          {resource.tags.map((tag) => (
            <Link
              key={tag}
              href={`/tags/${tag.toLowerCase()}`}
              className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-sm text-zinc-600 hover:text-rust dark:bg-zinc-800 dark:text-zinc-400 dark:hover:text-rust-light"
            >
              #{tag}
            </Link>
          ))}
        </div>
      )}

      <div className="mb-12 flex flex-wrap gap-3">
        <a
          href={resource.url}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-lg bg-rust px-5 py-2.5 font-medium text-white hover:bg-rust-light transition-colors"
        >
          Visit resource ↗
        </a>
        <Link
          href="/"
          className="rounded-lg border border-zinc-300 px-5 py-2.5 text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
        >
          ← Back to all resources
        </Link>
      </div>

      {related.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Related resources
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ResourceCard key={item.id} resource={item} />
            ))}
          </div>
        </section>
      )}
    </PageShell>
  );
}
