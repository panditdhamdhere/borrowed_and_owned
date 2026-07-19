"use client";

import { useSyncExternalStore } from "react";
import {
  PROGRESS_CHANGE_EVENT,
  readProgress,
  toggleProgressStep,
} from "@/lib/learning-progress";

function subscribe(callback: () => void) {
  window.addEventListener(PROGRESS_CHANGE_EVENT, callback);
  return () => window.removeEventListener(PROGRESS_CHANGE_EVENT, callback);
}

export function useProgress(storageKey: string) {
  const completed = useSyncExternalStore(
    subscribe,
    () => readProgress(storageKey),
    () => ({}),
  );

  function toggleStep(stepId: string) {
    toggleProgressStep(storageKey, stepId);
  }

  return { completed, toggleStep };
}
