"use client";

import { useMemo, useState } from "react";
import {
  CATEGORY_LABELS,
  RESOURCE_CATEGORIES,
  type Resource,
  type ResourceCategory,
} from "@/lib/types";
import { filterResources } from "@/lib/resources";
import { ResourceCard } from "./ResourceCard";

interface ResourceFiltersProps {
  resources: Resource[];
}

export function ResourceFilters({ resources }: ResourceFiltersProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ResourceCategory | "all">("all");

  const filtered = useMemo(
    () => filterResources(resources, query, category),
    [resources, query, category],
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

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <input
            type="search"
            placeholder="Search books, videos, repos..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 pl-10 text-sm text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-rust/50 focus:ring-1 focus:ring-rust/30"
          />
          <svg
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-600"
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
        <p className="text-sm text-zinc-500">
          {filtered.length} of {resources.length} resources
        </p>
      </div>

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

      {filtered.length === 0 ? (
        <div className="rounded-xl border border-dashed border-zinc-800 py-16 text-center">
          <p className="text-zinc-400">No resources match your search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("all");
            }}
            className="mt-3 text-sm text-rust-light hover:text-rust transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((resource) => (
            <ResourceCard key={resource.id} resource={resource} />
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
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-full px-3 py-1.5 text-sm transition-colors ${
        active
          ? "bg-rust text-white"
          : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
      }`}
    >
      {label}
      <span className={`ml-1.5 ${active ? "text-rust-light/80" : "text-zinc-600"}`}>
        {count}
      </span>
    </button>
  );
}
