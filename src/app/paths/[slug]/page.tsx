import Link from "next/link";
import { notFound } from "next/navigation";
import { PathProgressSection } from "@/components/PathProgressSection";
import { PageShell } from "@/components/PageShell";
import { ResourceCard } from "@/components/ResourceCard";
import { getAllPaths, getPathById, getPathResources } from "@/lib/paths";
import { fetchRepoStarsMap } from "@/lib/repo-stars";

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
  const starsMap = await fetchRepoStarsMap(resources);

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

      <PathProgressSection path={path} resources={resources} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.id}
            resource={resource}
            stars={starsMap[resource.id]}
          />
        ))}
      </div>
    </PageShell>
  );
}
