"use client";

import { useSyncExternalStore } from "react";
import {
  isBookmarked,
  PROGRESS_CHANGE_EVENT,
  toggleBookmark,
} from "@/lib/learning-progress";

function subscribe(callback: () => void) {
  window.addEventListener(PROGRESS_CHANGE_EVENT, callback);
  return () => window.removeEventListener(PROGRESS_CHANGE_EVENT, callback);
}

export function useBookmark(resourceId: string) {
  const bookmarked = useSyncExternalStore(
    subscribe,
    () => isBookmarked(resourceId),
    () => false,
  );

  function toggle() {
    toggleBookmark(resourceId);
  }

  return { bookmarked, toggle };
}
