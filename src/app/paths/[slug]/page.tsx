import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ResourceCard } from "@/components/ResourceCard";
import { getAllPaths, getPathById, getPathResources } from "@/lib/paths";

interface PathPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPaths().map((path) => ({ slug: path.id }));
}

export async function generateMetadata({ params }: PathPageProps) {
  const { slug } = await params;
  const path = getPathById(slug);

  if (!path) return { title: "Path not found" };

  return {
    title: `${path.title} — Learning Path`,
    description: path.description,
  };
}

export default async function PathPage({ params }: PathPageProps) {
  const { slug } = await params;
  const path = getPathById(slug);

  if (!path) {
    notFound();
  }

  const resources = getPathResources(path);

  return (
    <PageShell>
      <Link
        href="/paths"
        className="mb-6 inline-block text-sm text-rust hover:text-rust-light"
      >
        ← All paths
      </Link>
      <span className="mb-2 inline-block rounded-full bg-rust/15 px-2.5 py-0.5 text-xs font-medium capitalize text-rust dark:text-rust-light">
        {path.level}
      </span>
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        {path.title}
      </h1>
      <p className="mb-8 max-w-2xl text-zinc-600 dark:text-zinc-400">
        {path.description}
      </p>

      <ol className="mb-8 space-y-3">
        {resources.map((resource, index) => (
          <li
            key={resource.id}
            className="flex items-center gap-4 rounded-lg border border-zinc-200 bg-white px-4 py-3 dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-rust/15 text-sm font-bold text-rust dark:text-rust-light">
              {index + 1}
            </span>
            <div className="flex-1">
              <Link
                href={`/resource/${resource.id}`}
                className="font-medium text-zinc-900 hover:text-rust dark:text-zinc-100 dark:hover:text-rust-light"
              >
                {resource.title}
              </Link>
              <p className="text-sm text-zinc-500">{resource.description}</p>
            </div>
          </li>
        ))}
      </ol>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard key={resource.id} resource={resource} />
        ))}
      </div>
    </PageShell>
  );
}
