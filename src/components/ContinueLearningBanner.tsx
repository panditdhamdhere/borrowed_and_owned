"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import { buildLearningPlan } from "@/lib/learning-goals";
import {
  buildKitSteps,
  buildPathSteps,
} from "@/lib/learning-steps";
import {
  createCachedSnapshot,
  kitProgressKey,
  pathProgressKey,
  readActivePlan,
  readProgress,
  PROGRESS_CHANGE_EVENT,
} from "@/lib/learning-progress";

interface ContinueState {
  title: string;
  done: number;
  total: number;
  href: string;
}

function subscribe(callback: () => void) {
  window.addEventListener(PROGRESS_CHANGE_EVENT, callback);
  return () => window.removeEventListener(PROGRESS_CHANGE_EVENT, callback);
}

function computeContinueState(): ContinueState | null {
  const activePlan = readActivePlan();
  if (!activePlan) return null;

  const plan = buildLearningPlan(activePlan.goalId, activePlan.experience);
  if (!plan) return null;

  const kitStepList = plan.starterKit ? buildKitSteps(plan.starterKit) : [];
  const pathStepList = buildPathSteps(plan.pathResources);

  const kitProgress = plan.starterKit
    ? readProgress(kitProgressKey(plan.starterKit.id))
    : {};
  const pathProgress = readProgress(pathProgressKey(plan.path.id));

  const total = kitStepList.length + pathStepList.length;
  const done =
    kitStepList.filter((step) => kitProgress[step.id]).length +
    pathStepList.filter((step) => pathProgress[step.id]).length;

  if (total === 0 || done >= total) return null;

  return {
    title: plan.goal.title,
    done,
    total,
    href: `/start/${activePlan.goalId}?experience=${activePlan.experience}`,
  };
}

const getCachedContinueState = createCachedSnapshot(computeContinueState);

export function ContinueLearningBanner() {
  const state = useSyncExternalStore(
    subscribe,
    getCachedContinueState,
    () => null,
  );

  if (!state) return null;

  return (
    <div className="mb-8 rounded-xl border border-rust/25 bg-rust/5 px-5 py-4 dark:border-rust/30 dark:bg-rust/10">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-rust dark:text-rust-light">
            Continue learning
          </p>
          <p className="text-zinc-700 dark:text-zinc-300">
            {state.title} · {state.done} of {state.total} steps done
          </p>
        </div>
        <Link
          href={state.href}
          className="inline-flex shrink-0 items-center justify-center rounded-lg bg-rust px-4 py-2 text-sm font-medium text-white hover:bg-rust-light transition-colors"
        >
          Resume plan →
        </Link>
      </div>
    </div>
  );
}
