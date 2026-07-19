"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getAllLearningGoals } from "@/lib/learning-goals";
import { writeActivePlan } from "@/lib/learning-progress";
import {
  EXPERIENCE_DESCRIPTIONS,
  EXPERIENCE_LABELS,
  EXPERIENCE_LEVELS,
  type ExperienceLevel,
} from "@/lib/types";

const goals = getAllLearningGoals();

export function FindYourPathWizard() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [goalId, setGoalId] = useState<string | null>(null);
  const [experience, setExperience] = useState<ExperienceLevel>("none");

  const selectedGoal = goals.find((goal) => goal.id === goalId);

  function handleContinue() {
    if (!goalId) return;
    writeActivePlan({ goalId, experience });
    router.push(`/start/${goalId}?experience=${experience}`);
  }

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 dark:border-zinc-800 dark:bg-zinc-900/50">
      <div className="mb-8 flex items-center gap-3">
        <StepIndicator active={step === 1} done={step > 1} number={1} label="Goal" />
        <div className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
        <StepIndicator active={step === 2} done={false} number={2} label="Experience" />
      </div>

      {step === 1 ? (
        <div>
          <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            What do you want to achieve?
          </h2>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            Pick the goal that best matches where you&apos;re headed.
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            {goals.map((goal) => (
              <button
                key={goal.id}
                type="button"
                onClick={() => setGoalId(goal.id)}
                className={`rounded-xl border p-4 text-left transition-colors ${
                  goalId === goal.id
                    ? "border-rust bg-rust/5 dark:bg-rust/10"
                    : "border-zinc-200 hover:border-rust/40 dark:border-zinc-800 dark:hover:border-rust/40"
                }`}
              >
                <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                  {goal.title}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {goal.description}
                </p>
              </button>
            ))}
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="button"
              disabled={!goalId}
              onClick={() => setStep(2)}
              className="rounded-lg bg-rust px-5 py-2.5 font-medium text-white transition-colors hover:bg-rust-light disabled:cursor-not-allowed disabled:opacity-50"
            >
              Continue
            </button>
          </div>
        </div>
      ) : (
        <div>
          <button
            type="button"
            onClick={() => setStep(1)}
            className="mb-4 text-sm text-rust hover:text-rust-light"
          >
            ← Change goal
          </button>
          <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            How much Rust do you know?
          </h2>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            We&apos;ll tailor your starter kit for{" "}
            <span className="font-medium text-zinc-900 dark:text-zinc-200">
              {selectedGoal?.title.toLowerCase()}
            </span>
            .
          </p>
          <div className="space-y-3">
            {EXPERIENCE_LEVELS.map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setExperience(level)}
                className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition-colors ${
                  experience === level
                    ? "border-rust bg-rust/5 dark:bg-rust/10"
                    : "border-zinc-200 hover:border-rust/40 dark:border-zinc-800 dark:hover:border-rust/40"
                }`}
              >
                <span
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                    experience === level
                      ? "border-rust bg-rust text-white"
                      : "border-zinc-300 dark:border-zinc-700"
                  }`}
                >
                  {experience === level && (
                    <span className="h-2 w-2 rounded-full bg-white" />
                  )}
                </span>
                <span>
                  <p className="font-semibold text-zinc-900 dark:text-zinc-100">
                    {EXPERIENCE_LABELS[level]}
                  </p>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {EXPERIENCE_DESCRIPTIONS[level]}
                  </p>
                </span>
              </button>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
            <Link
              href="/"
              className="text-sm text-zinc-500 hover:text-rust dark:text-zinc-400"
            >
              Browse all resources instead
            </Link>
            <button
              type="button"
              onClick={handleContinue}
              className="rounded-lg bg-rust px-5 py-2.5 font-medium text-white transition-colors hover:bg-rust-light"
            >
              Show my plan →
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepIndicator({
  active,
  done,
  number,
  label,
}: {
  active: boolean;
  done: boolean;
  number: number;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold ${
          active || done
            ? "bg-rust text-white"
            : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
        }`}
      >
        {number}
      </span>
      <span
        className={`hidden text-sm sm:inline ${
          active
            ? "font-medium text-zinc-900 dark:text-zinc-100"
            : "text-zinc-500"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
