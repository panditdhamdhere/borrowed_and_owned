"use client";

import Link from "next/link";
import { ProgressStepList } from "@/components/ProgressStepList";
import { useProgress } from "@/hooks/useProgress";
import { countCompleted, pathProgressKey } from "@/lib/learning-progress";
import { buildPathSteps } from "@/lib/learning-steps";
import type { LearningPath, Resource } from "@/lib/types";

interface PathProgressSectionProps {
  path: LearningPath;
  resources: Resource[];
}

export function PathProgressSection({
  path,
  resources,
}: PathProgressSectionProps) {
  const storageKey = pathProgressKey(path.id);
  const { completed, toggleStep } = useProgress(storageKey);
  const steps = buildPathSteps(resources);
  const done = countCompleted(
    completed,
    steps.map((step) => step.id),
  );

  return (
    <section className="mb-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Progress: {done} of {steps.length} resources completed
        </p>
        <Link
          href="/my-learning"
          className="text-sm text-rust hover:text-rust-light"
        >
          My learning →
        </Link>
      </div>
      <ProgressStepList
        steps={steps}
        completed={completed}
        onToggle={toggleStep}
      />
    </section>
  );
}
