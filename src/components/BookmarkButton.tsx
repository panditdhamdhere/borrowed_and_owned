"use client";

import { useBookmark } from "@/hooks/useBookmark";

interface BookmarkButtonProps {
  resourceId: string;
  compact?: boolean;
}

export function BookmarkButton({ resourceId, compact = false }: BookmarkButtonProps) {
  const { bookmarked, toggle } = useBookmark(resourceId);

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark resource"}
      className={`inline-flex items-center gap-1.5 rounded-lg border transition-colors ${
        compact
          ? "border-transparent px-2 py-1 text-xs"
          : "border-zinc-300 px-3 py-2 text-sm dark:border-zinc-700"
      } ${
        bookmarked
          ? "border-rust/40 bg-rust/10 text-rust dark:text-rust-light"
          : "text-zinc-600 hover:border-rust/40 hover:text-rust dark:text-zinc-400 dark:hover:text-rust-light"
      }`}
    >
      <span aria-hidden="true">{bookmarked ? "★" : "☆"}</span>
      {!compact && (bookmarked ? "Saved" : "Save")}
    </button>
  );
}
