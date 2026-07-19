import type { ExperienceLevel } from "./types";

export const BOOKMARKS_KEY = "learning-bookmarks";
export const ACTIVE_PLAN_KEY = "learning-active-plan";
export const PROGRESS_CHANGE_EVENT = "learning-progress-changed";

export interface ActivePlan {
  goalId: string;
  experience: ExperienceLevel;
}

export interface ProgressStep {
  id: string;
  title: string;
  description: string;
  href?: string;
  external?: boolean;
}

export function kitProgressKey(kitId: string): string {
  return `learning-kit:${kitId}`;
}

export function pathProgressKey(pathId: string): string {
  return `learning-path:${pathId}`;
}

export function kitStepId(index: number): string {
  return `step-${index}`;
}

export function pathStepId(resourceId: string): string {
  return `path-${resourceId}`;
}

export function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;

  try {
    const saved = localStorage.getItem(key);
    return saved ? (JSON.parse(saved) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeJson(key: string, value: unknown): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
  emitProgressChange();
}

export function readProgress(key: string): Record<string, boolean> {
  return readJson<Record<string, boolean>>(key, {});
}

export function toggleProgressStep(
  key: string,
  stepId: string,
): Record<string, boolean> {
  const current = readProgress(key);
  const next = { ...current, [stepId]: !current[stepId] };
  writeJson(key, next);
  return next;
}

export function countCompleted(
  progress: Record<string, boolean>,
  stepIds: string[],
): number {
  return stepIds.filter((id) => progress[id]).length;
}

export function readBookmarks(): string[] {
  return readJson<string[]>(BOOKMARKS_KEY, []);
}

export function isBookmarked(resourceId: string): boolean {
  return readBookmarks().includes(resourceId);
}

export function toggleBookmark(resourceId: string): string[] {
  const current = readBookmarks();
  const next = current.includes(resourceId)
    ? current.filter((id) => id !== resourceId)
    : [...current, resourceId];
  writeJson(BOOKMARKS_KEY, next);
  return next;
}

export function readActivePlan(): ActivePlan | null {
  return readJson<ActivePlan | null>(ACTIVE_PLAN_KEY, null);
}

export function writeActivePlan(plan: ActivePlan): void {
  writeJson(ACTIVE_PLAN_KEY, plan);
}

export function clearActivePlan(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ACTIVE_PLAN_KEY);
  emitProgressChange();
}

export function emitProgressChange(): void {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(PROGRESS_CHANGE_EVENT));
}
