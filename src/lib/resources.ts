import Fuse from "fuse.js";
import resources from "@/content/resources.json";
import {
  CATEGORY_LABELS,
  LEVEL_ORDER,
  RESOURCE_CATEGORIES,
  type Resource,
  type ResourceCategory,
  type ResourceLevel,
  type SortOption,
} from "./types";

export interface ResourceFilters {
  query: string;
  category: ResourceCategory | "all";
  level: ResourceLevel | "all";
  freeOnly: boolean;
  paidOnly: boolean;
  sort: SortOption;
}

export function getAllResources(): Resource[] {
  return resources as Resource[];
}

export function getResourceById(id: string): Resource | undefined {
  return getAllResources().find((resource) => resource.id === id);
}

export function getResourcesByCategory(category: ResourceCategory): Resource[] {
  return getAllResources().filter((resource) => resource.category === category);
}

export function getResourcesByTag(tag: string): Resource[] {
  const normalized = tag.toLowerCase();
  return getAllResources().filter((resource) =>
    resource.tags?.some((t) => t.toLowerCase() === normalized),
  );
}

export function getAllTags(): { tag: string; count: number }[] {
  const counts = new Map<string, number>();

  for (const resource of getAllResources()) {
    for (const tag of resource.tags ?? []) {
      const key = tag.toLowerCase();
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag));
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

export function getPaidResources(): Resource[] {
  return getAllResources().filter((resource) => resource.free === false);
}

export function getPaidBooks(): Resource[] {
  return getAllResources().filter(
    (resource) => resource.category === "book" && resource.free === false,
  );
}

export function getRecentResources(limit = 10): Resource[] {
  return [...getAllResources()]
    .filter((resource) => resource.addedAt)
    .sort(
      (a, b) =>
        new Date(b.addedAt!).getTime() - new Date(a.addedAt!).getTime(),
    )
    .slice(0, limit);
}

function sortResources(items: Resource[], sort: SortOption): Resource[] {
  const sorted = [...items];

  switch (sort) {
    case "alpha":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "level":
      return sorted.sort(
        (a, b) =>
          (LEVEL_ORDER[a.level ?? "intermediate"] ?? 1) -
          (LEVEL_ORDER[b.level ?? "intermediate"] ?? 1),
      );
    case "recent":
      return sorted.sort(
        (a, b) =>
          new Date(b.addedAt ?? 0).getTime() -
          new Date(a.addedAt ?? 0).getTime(),
      );
    default:
      return sorted;
  }
}

export function filterResources(
  items: Resource[],
  filters: ResourceFilters,
): Resource[] {
  let result = items.filter((resource) => {
    if (filters.category !== "all" && resource.category !== filters.category) {
      return false;
    }
    if (filters.level !== "all" && resource.level !== filters.level) {
      return false;
    }
    if (filters.freeOnly && !resource.free) {
      return false;
    }
    if (filters.paidOnly && resource.free !== false) {
      return false;
    }
    return true;
  });

  const query = filters.query.trim();
  if (query) {
    const fuse = new Fuse(result, {
      keys: ["title", "description", "author", "tags"],
      threshold: 0.4,
    });
    result = fuse.search(query).map((match) => match.item);
  }

  return sortResources(result, filters.sort);
}

export function getRelatedResources(resource: Resource, limit = 3): Resource[] {
  return getAllResources()
    .filter(
      (item) =>
        item.id !== resource.id &&
        (item.category === resource.category ||
          item.tags?.some((tag) => resource.tags?.includes(tag))),
    )
    .slice(0, limit);
}
