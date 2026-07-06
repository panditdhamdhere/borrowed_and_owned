"use client";

import Link from "next/link";
import { useState } from "react";
import type { LearningPlan } from "@/lib/learning-goals";
import { EXPERIENCE_LABELS } from "@/lib/types";

interface LearningPlanViewProps {
  plan: LearningPlan;
}

function readProgress(storageKey: string): Record<string, boolean> {
  if (typeof window === "undefined") return {};

  try {
    const saved = localStorage.getItem(storageKey);
    return saved ? (JSON.parse(saved) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

export function LearningPlanView({ plan }: LearningPlanViewProps) {
  const storageKey = `learning-plan:${plan.goal.id}:${plan.experience}`;
  const [completed, setCompleted] = useState<Record<string, boolean>>(() =>
    readProgress(storageKey),
  );

  function toggleStep(stepId: string) {
    setCompleted((current) => {
      const next = { ...current, [stepId]: !current[stepId] };
      localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  }

  const starterSteps =
    plan.starterKit?.steps.map((step, index) => ({
      id: `kit-${index}`,
      title: step.title,
      description: step.description,
      href: step.resourceId
        ? `/resource/${step.resourceId}`
        : step.url?.startsWith("/")
          ? step.url
          : step.url,
      external: Boolean(step.url && !step.url.startsWith("/")),
    })) ?? [];

  const pathSteps = plan.pathResources.map((resource) => ({
    id: `path-${resource.id}`,
    title: resource.title,
    description: resource.description,
    href: `/resource/${resource.id}`,
    external: false,
  }));

  const totalSteps = starterSteps.length + pathSteps.length;
  const doneCount = [...starterSteps, ...pathSteps].filter(
    (step) => completed[step.id],
  ).length;

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
      </div>

      {plan.starterKit && (
        <PlanSection
          title="Start here"
          subtitle={plan.starterKit.title}
          description={plan.starterKit.description}
          steps={starterSteps}
          completed={completed}
          onToggle={toggleStep}
        />
      )}

      <PlanSection
        title="Learning path"
        subtitle={plan.path.title}
        description={plan.path.description}
        steps={pathSteps}
        completed={completed}
        onToggle={toggleStep}
        footer={
          <Link
            href={`/paths/${plan.path.id}`}
            className="text-sm text-rust hover:text-rust-light"
          >
            View full path →
          </Link>
        }
      />

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

function PlanSection({
  title,
  subtitle,
  description,
  steps,
  completed,
  onToggle,
  footer,
}: {
  title: string;
  subtitle: string;
  description: string;
  steps: {
    id: string;
    title: string;
    description: string;
    href?: string;
    external?: boolean;
  }[];
  completed: Record<string, boolean>;
  onToggle: (id: string) => void;
  footer?: React.ReactNode;
}) {
  return (
    <section>
      <p className="mb-1 text-sm font-medium uppercase tracking-wide text-rust dark:text-rust-light">
        {title}
      </p>
      <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
        {subtitle}
      </h2>
      <p className="mb-6 max-w-2xl text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <ol className="space-y-3">
        {steps.map((step, index) => (
          <li
            key={step.id}
            className="flex items-start gap-4 rounded-xl border border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900/50"
          >
            <button
              type="button"
              onClick={() => onToggle(step.id)}
              aria-label={`Mark step ${index + 1} complete`}
              className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border transition-colors ${
                completed[step.id]
                  ? "border-rust bg-rust text-white"
                  : "border-zinc-300 hover:border-rust/50 dark:border-zinc-700"
              }`}
            >
              {completed[step.id] && (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </button>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                {step.href ? (
                  step.external ? (
                    <a
                      href={step.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-rust dark:hover:text-rust-light"
                    >
                      {step.title} ↗
                    </a>
                  ) : (
                    <Link
                      href={step.href}
                      className="hover:text-rust dark:hover:text-rust-light"
                    >
                      {step.title}
                    </Link>
                  )
                ) : (
                  step.title
                )}
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>
            </div>
            <span className="hidden shrink-0 text-sm text-zinc-400 sm:inline">
              {index + 1}
            </span>
          </li>
        ))}
      </ol>
      {footer && <div className="mt-4">{footer}</div>}
    </section>
  );
}
