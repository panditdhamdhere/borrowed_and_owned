"use client";

import Link from "next/link";
import { ProgressStepList } from "@/components/ProgressStepList";
import { useProgress } from "@/hooks/useProgress";
import { countCompleted, kitProgressKey } from "@/lib/learning-progress";
import { buildKitSteps } from "@/lib/learning-steps";
import type { StarterKit } from "@/lib/types";

interface StarterKitProgressCardProps {
  kit: StarterKit;
}

export function StarterKitProgressCard({ kit }: StarterKitProgressCardProps) {
  const storageKey = kitProgressKey(kit.id);
  const { completed, toggleStep } = useProgress(storageKey);
  const steps = buildKitSteps(kit);
  const done = countCompleted(
    completed,
    steps.map((step) => step.id),
  );

  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            {kit.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {kit.description}
          </p>
        </div>
        <p className="text-sm text-zinc-500">
          {done}/{steps.length} done
        </p>
      </div>
      <ProgressStepList
        steps={steps}
        completed={completed}
        onToggle={toggleStep}
        showNumbers={false}
      />
      <Link
        href="/my-learning"
        className="mt-4 inline-block text-sm text-rust hover:text-rust-light"
      >
        View dashboard →
      </Link>
    </article>
  );
}
