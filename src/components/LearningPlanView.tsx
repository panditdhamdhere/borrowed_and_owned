"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { LearningPlan } from "@/lib/learning-goals";
import { ProgressStepList } from "@/components/ProgressStepList";
import { useProgress } from "@/hooks/useProgress";
import {
  countCompleted,
  kitProgressKey,
  pathProgressKey,
  writeActivePlan,
} from "@/lib/learning-progress";
import { buildKitSteps, buildPathSteps } from "@/lib/learning-steps";
import { EXPERIENCE_LABELS } from "@/lib/types";

interface LearningPlanViewProps {
  plan: LearningPlan;
}

export function LearningPlanView({ plan }: LearningPlanViewProps) {
  const kitKey = plan.starterKit ? kitProgressKey(plan.starterKit.id) : null;
  const pathKey = pathProgressKey(plan.path.id);

  const kitProgress = useProgress(kitKey ?? "learning-kit:unused");
  const pathProgress = useProgress(pathKey);

  const [copied, setCopied] = useState(false);

  useEffect(() => {
    writeActivePlan({
      goalId: plan.goal.id,
      experience: plan.experience,
    });
  }, [plan.goal.id, plan.experience]);

  const starterSteps = plan.starterKit ? buildKitSteps(plan.starterKit) : [];
  const pathSteps = buildPathSteps(plan.pathResources);

  const kitDone = kitKey
    ? countCompleted(
        kitProgress.completed,
        starterSteps.map((step) => step.id),
      )
    : 0;
  const pathDone = countCompleted(
    pathProgress.completed,
    pathSteps.map((step) => step.id),
  );
  const totalSteps = starterSteps.length + pathSteps.length;
  const doneCount = kitDone + pathDone;

  async function copyPlanLink() {
    const url = `${window.location.origin}/start/${plan.goal.id}?experience=${plan.experience}`;
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-10">
      <div className="rounded-2xl border border-rust/20 bg-rust/5 p-6 dark:border-rust/30 dark:bg-rust/10">
        <p className="mb-1 text-sm font-medium text-rust dark:text-rust-light">
          Your personalized plan
        </p>
        <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
          {plan.goal.title}
        </h1>
        <p className="mb-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
          {plan.goal.description}
        </p>
        <div className="flex flex-wrap gap-2 text-sm">
          <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300">
            {EXPERIENCE_LABELS[plan.experience]}
          </span>
          <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300">
            {plan.pathResources.length} path resources
          </span>
          {plan.starterKit && (
            <span className="rounded-full bg-white/80 px-2.5 py-0.5 text-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300">
              {plan.starterKit.steps.length} setup steps
            </span>
          )}
        </div>
        {totalSteps > 0 && (
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            Progress: {doneCount} of {totalSteps} steps completed
          </p>
        )}
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={copyPlanLink}
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:border-rust/50 dark:border-zinc-700 dark:text-zinc-300"
          >
            {copied ? "Link copied!" : "Copy plan link"}
          </button>
          <Link
            href="/my-learning"
            className="rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-700 hover:border-rust/50 dark:border-zinc-700 dark:text-zinc-300"
          >
            My learning →
          </Link>
        </div>
      </div>

      {plan.starterKit && kitKey && (
        <section>
          <p className="mb-1 text-sm font-medium uppercase tracking-wide text-rust dark:text-rust-light">
            Start here
          </p>
          <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {plan.starterKit.title}
          </h2>
          <p className="mb-6 max-w-2xl text-zinc-600 dark:text-zinc-400">
            {plan.starterKit.description}
          </p>
          <ProgressStepList
            steps={starterSteps}
            completed={kitProgress.completed}
            onToggle={kitProgress.toggleStep}
          />
        </section>
      )}

      <section>
        <p className="mb-1 text-sm font-medium uppercase tracking-wide text-rust dark:text-rust-light">
          Learning path
        </p>
        <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
          {plan.path.title}
        </h2>
        <p className="mb-6 max-w-2xl text-zinc-600 dark:text-zinc-400">
          {plan.path.description}
        </p>
        <ProgressStepList
          steps={pathSteps}
          completed={pathProgress.completed}
          onToggle={pathProgress.toggleStep}
        />
        <Link
          href={`/paths/${plan.path.id}`}
          className="mt-4 inline-block text-sm text-rust hover:text-rust-light"
        >
          View full path →
        </Link>
      </section>

      <div className="flex flex-wrap gap-3 border-t border-zinc-200 pt-8 dark:border-zinc-800">
        <Link
          href="/start"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:border-rust/50 dark:border-zinc-700 dark:text-zinc-300"
        >
          ← Pick a different goal
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:border-rust/50 dark:border-zinc-700 dark:text-zinc-300"
        >
          Browse all resources
        </Link>
      </div>
    </div>
  );
}
