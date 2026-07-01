import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ResourceFilters } from "@/components/ResourceFilters";
import { getAllTags, getResourcesByTag } from "@/lib/resources";
import { fetchRepoStarsMap } from "@/lib/repo-stars";

interface TagPageProps {
  params: Promise<{ tag: string }>;
}

export function generateStaticParams() {
  return getAllTags().map(({ tag }) => ({ tag }));
}

export async function generateMetadata({ params }: TagPageProps) {
  const { tag } = await params;
  return {
    title: `#${tag} — Borrowed & Owned`,
    description: `Rust learning resources tagged with ${tag}.`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const resources = getResourcesByTag(tag);

  if (resources.length === 0) {
    notFound();
  }

  const starsMap = await fetchRepoStarsMap(resources);

  return (
    <PageShell>
      <h1 className="mb-2 font-mono text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        #{tag}
      </h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        {resources.length} resources tagged with{" "}
        <span className="font-mono text-rust">#{tag}</span>
      </p>
      <ResourceFilters
        resources={resources}
        starsMap={starsMap}
        initialTag={tag}
        showCategoryFilters
      />
    </PageShell>
  );
}
