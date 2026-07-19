"use client";

import Link from "next/link";
import { useMemo, useSyncExternalStore } from "react";
import { ResourceCard } from "@/components/ResourceCard";
import { buildLearningPlan } from "@/lib/learning-goals";
import {
  countCompleted,
  kitProgressKey,
  pathProgressKey,
  readActivePlan,
  readBookmarks,
  readProgress,
  PROGRESS_CHANGE_EVENT,
} from "@/lib/learning-progress";
import { buildKitSteps, buildPathSteps } from "@/lib/learning-steps";
import { getAllPaths, getPathResources } from "@/lib/paths";
import { getResourceById } from "@/lib/resources";
import { EXPERIENCE_LABELS, type LearningPath, type Resource } from "@/lib/types";

function subscribe(callback: () => void) {
  window.addEventListener(PROGRESS_CHANGE_EVENT, callback);
  return () => window.removeEventListener(PROGRESS_CHANGE_EVENT, callback);
}

function getPathSummaries(): { path: LearningPath; done: number; total: number }[] {
  return getAllPaths()
    .map((path) => {
      const resources = getPathResources(path);
      const steps = buildPathSteps(resources);
      const progress = readProgress(pathProgressKey(path.id));
      return {
        path,
        done: countCompleted(
          progress,
          steps.map((step) => step.id),
        ),
        total: steps.length,
      };
    })
    .filter((item) => item.done > 0);
}

function getDashboardSnapshot() {
  return {
    activePlan: readActivePlan(),
    bookmarks: readBookmarks(),
    pathSummaries: getPathSummaries(),
  };
}

export function LearningDashboard() {
  const snapshot = useSyncExternalStore(
    subscribe,
    getDashboardSnapshot,
    () => ({ activePlan: null, bookmarks: [], pathSummaries: [] }),
  );

  const plan = useMemo(() => {
    if (!snapshot.activePlan) return null;
    return buildLearningPlan(
      snapshot.activePlan.goalId,
      snapshot.activePlan.experience,
    );
  }, [snapshot.activePlan]);

  const bookmarkedResources = useMemo(
    () =>
      snapshot.bookmarks
        .map((id) => getResourceById(id))
        .filter((resource): resource is Resource => resource !== undefined),
    [snapshot.bookmarks],
  );

  const upNext = useMemo(() => {
    if (!plan || !snapshot.activePlan) return null;

    if (plan.starterKit) {
      const kitSteps = buildKitSteps(plan.starterKit);
      const kitProgress = readProgress(kitProgressKey(plan.starterKit.id));
      const nextKit = kitSteps.find((step) => !kitProgress[step.id]);
      if (nextKit?.href) {
        return {
          title: nextKit.title,
          href: nextKit.href,
          external: Boolean(nextKit.external),
          context: plan.starterKit.title,
        };
      }
    }

    const pathStepList = buildPathSteps(plan.pathResources);
    const pathProgress = readProgress(pathProgressKey(plan.path.id));
    const nextPath = pathStepList.find((step) => !pathProgress[step.id]);
    if (nextPath?.href) {
      return {
        title: nextPath.title,
        href: nextPath.href,
        external: false,
        context: plan.path.title,
      };
    }

    return null;
  }, [plan, snapshot.activePlan]);

  const hasActivity =
    Boolean(plan) ||
    snapshot.pathSummaries.length > 0 ||
    bookmarkedResources.length > 0;

  return (
    <div className="space-y-10">
      {!hasActivity && (
        <div className="rounded-2xl border border-dashed border-zinc-300 px-6 py-12 text-center dark:border-zinc-800">
          <p className="mb-2 text-lg font-medium text-zinc-900 dark:text-zinc-100">
            Your learning dashboard is empty
          </p>
          <p className="mb-6 text-zinc-600 dark:text-zinc-400">
            Pick a goal, track path progress, or bookmark resources to see them
            here.
          </p>
          <Link
            href="/start"
            className="inline-flex rounded-lg bg-rust px-5 py-2.5 text-sm font-medium text-white hover:bg-rust-light transition-colors"
          >
            Find your path
          </Link>
        </div>
      )}

      {plan && snapshot.activePlan && (
        <section className="rounded-2xl border border-rust/20 bg-rust/5 p-6 dark:border-rust/30 dark:bg-rust/10">
          <p className="mb-1 text-sm font-medium text-rust dark:text-rust-light">
            Active plan
          </p>
          <h2 className="mb-2 text-2xl font-bold text-zinc-900 dark:text-zinc-50">
            {plan.goal.title}
          </h2>
          <p className="mb-4 text-zinc-600 dark:text-zinc-400">
            {EXPERIENCE_LABELS[snapshot.activePlan.experience]}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/start/${snapshot.activePlan.goalId}?experience=${snapshot.activePlan.experience}`}
              className="rounded-lg bg-rust px-4 py-2 text-sm font-medium text-white hover:bg-rust-light transition-colors"
            >
              Open plan
            </Link>
            <Link
              href="/start"
              className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:border-rust/50 dark:border-zinc-700 dark:text-zinc-300"
            >
              Change goal
            </Link>
          </div>
        </section>
      )}

      {upNext && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Up next
          </h2>
          <div className="rounded-xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="mb-1 text-sm text-zinc-500">{upNext.context}</p>
            {upNext.external ? (
              <a
                href={upNext.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-lg font-semibold text-rust hover:text-rust-light"
              >
                {upNext.title} ↗
              </a>
            ) : (
              <Link
                href={upNext.href}
                className="text-lg font-semibold text-rust hover:text-rust-light"
              >
                {upNext.title}
              </Link>
            )}
          </div>
        </section>
      )}

      {snapshot.pathSummaries.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Path progress
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {snapshot.pathSummaries.map(({ path, done, total }) => (
              <Link
                key={path.id}
                href={`/paths/${path.id}`}
                className="rounded-xl border border-zinc-200 bg-white p-4 transition-colors hover:border-rust/40 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <p className="font-medium text-zinc-900 dark:text-zinc-100">
                  {path.title}
                </p>
                <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                  {done} of {total} resources completed
                </p>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-zinc-100 dark:bg-zinc-800">
                  <div
                    className="h-full rounded-full bg-rust transition-all"
                    style={{ width: `${total ? (done / total) * 100 : 0}%` }}
                  />
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {bookmarkedResources.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
            Saved resources
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {bookmarkedResources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
          Explore
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link
            href="/paths"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:border-rust/50 dark:border-zinc-700 dark:text-zinc-300"
          >
            Learning paths
          </Link>
          <Link
            href="/starter-kits"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:border-rust/50 dark:border-zinc-700 dark:text-zinc-300"
          >
            Starter kits
          </Link>
          <Link
            href="/"
            className="rounded-lg border border-zinc-300 px-4 py-2 text-sm text-zinc-700 hover:border-rust/50 dark:border-zinc-700 dark:text-zinc-300"
          >
            Browse catalog
          </Link>
        </div>
      </section>
    </div>
  );
}
