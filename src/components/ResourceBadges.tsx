import Link from "next/link";
import { CATEGORY_LABELS, type Resource } from "@/lib/types";

interface ResourceBadgesProps {
  resource: Resource;
  stars?: number;
  starsLabel?: string;
  starsSuffix?: string;
}

export function ResourceBadges({
  resource,
  stars,
  starsLabel = "★",
  starsSuffix,
}: ResourceBadgesProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={`/category/${resource.category}`}
        className="rounded-full bg-rust/15 px-2.5 py-0.5 text-xs font-medium text-rust hover:bg-rust/25 dark:text-rust-light"
      >
        {CATEGORY_LABELS[resource.category]}
      </Link>
      {resource.level && (
        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs capitalize text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {resource.level}
        </span>
      )}
      {resource.free === true && (
        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
          Free
        </span>
      )}
      {resource.free === false && (
        <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs text-amber-800 dark:bg-amber-950 dark:text-amber-300">
          Paid
        </span>
      )}
      {stars !== undefined && (
        <span className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400">
          {starsLabel} {stars.toLocaleString()}
          {starsSuffix ? ` ${starsSuffix}` : ""}
        </span>
      )}
    </div>
  );
}
