"use client";

import Link from "next/link";
import { ProgressCheckbox } from "@/components/ProgressCheckbox";
import type { ProgressStep } from "@/lib/learning-progress";

interface ProgressStepListProps {
  steps: ProgressStep[];
  completed: Record<string, boolean>;
  onToggle: (stepId: string) => void;
  showNumbers?: boolean;
}

export function ProgressStepList({
  steps,
  completed,
  onToggle,
  showNumbers = true,
}: ProgressStepListProps) {
  return (
    <ol className="space-y-3">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className="flex items-start gap-4 rounded-xl border border-zinc-200 bg-white px-4 py-4 dark:border-zinc-800 dark:bg-zinc-900/50"
        >
          <ProgressCheckbox
            checked={Boolean(completed[step.id])}
            label={`Mark step ${index + 1} complete`}
            onToggle={() => onToggle(step.id)}
          />
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
          {showNumbers && (
            <span className="hidden shrink-0 text-sm text-zinc-400 sm:inline">
              {index + 1}
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}
