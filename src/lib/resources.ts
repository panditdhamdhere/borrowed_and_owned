import resources from "@/content/resources.json";
import {
  CATEGORY_LABELS,
  RESOURCE_CATEGORIES,
  type Resource,
  type ResourceCategory,
} from "./types";

export function getAllResources(): Resource[] {
  return resources as Resource[];
}

export function getResourceById(id: string): Resource | undefined {
  return getAllResources().find((resource) => resource.id === id);
}

export function getResourcesByCategory(category: ResourceCategory): Resource[] {
  return getAllResources().filter((resource) => resource.category === category);
}

export function getCategoriesWithCounts(): {
  category: ResourceCategory;
  label: string;
  count: number;
}[] {
  const all = getAllResources();

  return RESOURCE_CATEGORIES.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    count: all.filter((resource) => resource.category === category).length,
  })).filter(({ count }) => count > 0);
}

export function filterResources(
  items: Resource[],
  query: string,
  category: ResourceCategory | "all",
): Resource[] {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((resource) => {
    const matchesCategory =
      category === "all" || resource.category === category;

    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;

    const haystack = [
      resource.title,
      resource.description,
      resource.author ?? "",
      ...(resource.tags ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}
