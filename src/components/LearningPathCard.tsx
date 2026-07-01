import Link from "next/link";
import type { LearningPath } from "@/lib/types";

interface LearningPathCardProps {
  path: LearningPath;
  resourceCount: number;
}

export function LearningPathCard({ path, resourceCount }: LearningPathCardProps) {
  return (
    <Link
      href={`/paths/${path.id}`}
      className="group block rounded-xl border border-zinc-200 bg-white p-6 transition-colors hover:border-rust/40 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:bg-zinc-900"
    >
      <span className="mb-2 inline-block rounded-full bg-rust/15 px-2.5 py-0.5 text-xs font-medium capitalize text-rust dark:text-rust-light">
        {path.level}
      </span>
      <h3 className="mb-2 text-xl font-semibold text-zinc-900 group-hover:text-rust dark:text-zinc-50 dark:group-hover:text-rust-light">
        {path.title}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {path.description}
      </p>
      <p className="text-sm text-zinc-500">
        {resourceCount} resources · View path →
      </p>
    </Link>
  );
}
