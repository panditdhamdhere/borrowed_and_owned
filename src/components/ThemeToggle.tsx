"use client";

import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="rounded-md border border-zinc-300 px-3 py-1.5 text-zinc-700 transition-colors hover:border-rust/50 hover:text-rust dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-rust-light"
      aria-label="Toggle theme"
    >
      <span className="inline dark:hidden">🌙</span>
      <span className="hidden dark:inline">☀️</span>
    </button>
  );
}
