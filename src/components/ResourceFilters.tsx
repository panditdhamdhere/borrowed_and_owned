"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  RESOURCE_CATEGORIES,
  RESOURCE_LEVELS,
  SORT_LABELS,
  SORT_OPTIONS,
  type Resource,
  type ResourceCategory,
  type ResourceLevel,
  type SortOption,
} from "@/lib/types";
import { filterResources } from "@/lib/resources";
import { ResourceCard } from "./ResourceCard";

interface ResourceFiltersProps {
  resources: Resource[];
  starsMap?: Record<string, number>;
  initialCategory?: ResourceCategory | "all";
  initialTag?: string;
  showCategoryFilters?: boolean;
}

export function ResourceFilters({
  resources,
  starsMap = {},
  initialCategory = "all",
  initialTag,
  showCategoryFilters = true,
}: ResourceFiltersProps) {
  const [query, setQuery] = useState(initialTag ? `#${initialTag}` : "");
  const [category, setCategory] = useState<ResourceCategory | "all">(
    initialCategory,
  );
  const [level, setLevel] = useState<ResourceLevel | "all">("all");
  const [freeOnly, setFreeOnly] = useState(false);
  const [sort, setSort] = useState<SortOption>("recent");

  const filtered = useMemo(
    () =>
      filterResources(resources, {
        query: query.startsWith("#") ? query.slice(1) : query,
        category,
        level,
        freeOnly,
        sort,
      }),
    [resources, query, category, level, freeOnly, sort],
  );

  const categoryCounts = useMemo(() => {
    const counts = new Map<ResourceCategory | "all", number>();
    counts.set("all", resources.length);

    for (const cat of RESOURCE_CATEGORIES) {
      counts.set(
        cat,
        resources.filter((resource) => resource.category === cat).length,
      );
    }

    return counts;
  }, [resources]);

  function clearFilters() {
    setQuery("");
    setCategory("all");
    setLevel("all");
    setFreeOnly(false);
    setSort("recent");
  }

  return (
    <div>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <input
            type="search"
            placeholder="Search books, videos, repos..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-2.5 pl-10 text-sm text-zinc-900 placeholder:text-zinc-400 outline-none focus:border-rust/50 focus:ring-1 focus:ring-rust/30 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-600"
          />
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M11 18a7 7 0 100-14 7 7 0 000 14z"
            />
          </svg>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
            className="rounded-lg border border-zinc-300 bg-white px-3 py-2.5 text-sm text-zinc-700 outline-none dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {SORT_LABELS[option]}
              </option>
            ))}
          </select>
          <label className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400">
            <input
              type="checkbox"
              checked={freeOnly}
              onChange={(event) => setFreeOnly(event.target.checked)}
              className="rounded border-zinc-400 accent-rust"
            />
            Free only
          </label>
          <p className="text-sm text-zinc-500">
            {filtered.length} of {resources.length}
          </p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        <FilterChip
          label="All levels"
          active={level === "all"}
          onClick={() => setLevel("all")}
        />
        {RESOURCE_LEVELS.map((lvl) => (
          <FilterChip
            key={lvl}
            label={lvl}
            active={level === lvl}
            onClick={() => setLevel(lvl)}
          />
        ))}
      </div>

      {showCategoryFilters && (
        <div className="mb-8 flex flex-wrap gap-2">
          <FilterChip
            label="All"
            count={categoryCounts.get("all") ?? 0}
            active={category === "all"}
            onClick={() => setCategory("all")}
          />
          {RESOURCE_CATEGORIES.filter(
            (cat) => (categoryCounts.get(cat) ?? 0) > 0,
          ).map((cat) => (
            <FilterChip
              key={cat}
              label={CATEGORY_LABELS[cat]}
              count={categoryCounts.get(cat) ?? 0}
              active={category === cat}
              onClick={() => setCategory(cat)}
            />
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-300 py-16 text-center dark:border-zinc-800">
          <p className="text-zinc-500 dark:text-zinc-400">
            No resources match your search.
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-3 text-sm text-rust hover:text-rust-light transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              stars={starsMap[resource.id]}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function FilterChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm capitalize transition-colors ${
        active
          ? "bg-rust text-white"
          : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
      }`}
    >
      {label}
      {count !== undefined && (
        <span
          className={`ml-1.5 ${active ? "text-white/80" : "text-zinc-400 dark:text-zinc-600"}`}
        >
          {count}
        </span>
      )}
    </button>
  );
}
