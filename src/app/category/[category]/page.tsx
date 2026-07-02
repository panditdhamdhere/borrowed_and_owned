import Link from "next/link";
import { notFound } from "next/navigation";
import { PageShell } from "@/components/PageShell";
import { ResourceFilters } from "@/components/ResourceFilters";
import { getResourcesByCategory } from "@/lib/resources";
import { fetchRepoStarsMap } from "@/lib/repo-stars";
import { CATEGORY_LABELS, RESOURCE_CATEGORIES, type ResourceCategory } from "@/lib/types";

interface CategoryPageProps {
  params: Promise<{ category: string }>;
  searchParams: Promise<{ paid?: string; free?: string }>;
}

export function generateStaticParams() {
  return RESOURCE_CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { category } = await params;
  const label = CATEGORY_LABELS[category as ResourceCategory];

  if (!label) return { title: "Category not found" };

  return {
    title: `${label} — Borrowed & Owned`,
    description: `Curated Rust ${label.toLowerCase()} for learning Rust.`,
  };
}

export default async function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const { category } = await params;
  const { paid, free } = await searchParams;

  if (!RESOURCE_CATEGORIES.includes(category as ResourceCategory)) {
    notFound();
  }

  const typedCategory = category as ResourceCategory;
  const resources = getResourcesByCategory(typedCategory);
  const starsMap = await fetchRepoStarsMap(resources);
  const label = CATEGORY_LABELS[typedCategory];
  const initialPaidOnly = paid === "1";
  const initialFreeOnly = free === "1";

  return (
    <PageShell>
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        {label}
        {initialPaidOnly && (
          <span className="ml-2 text-lg font-normal text-rust dark:text-rust-light">
            · Paid
          </span>
        )}
      </h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        {resources.length} curated {label.toLowerCase()} to help you learn Rust.
        {typedCategory === "book" && !initialPaidOnly && (
          <>
            {" "}
            <Link
              href="/category/book?paid=1"
              className="text-rust hover:text-rust-light"
            >
              Browse paid books →
            </Link>
          </>
        )}
      </p>
      <ResourceFilters
        resources={resources}
        starsMap={starsMap}
        initialCategory={typedCategory}
        initialPaidOnly={initialPaidOnly}
        initialFreeOnly={initialFreeOnly}
        showCategoryFilters={false}
      />
    </PageShell>
  );
}
