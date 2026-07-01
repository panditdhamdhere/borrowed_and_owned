"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";

interface GitHubStarButtonProps {
  initialStars?: number;
}

export function GitHubStarButton({ initialStars }: GitHubStarButtonProps) {
  const [stars, setStars] = useState<number | undefined>(initialStars);

  useEffect(() => {
    async function loadStars() {
      try {
        const response = await fetch("/api/github/stars");
        if (!response.ok) return;
        const data = (await response.json()) as { stars: number | null };
        if (data.stars !== null) setStars(data.stars);
      } catch {
        // keep last known count
      }
    }

    void loadStars();
    const interval = setInterval(loadStars, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <a
      href={siteConfig.githubStarUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="hidden items-center gap-1.5 rounded-md border border-zinc-300 px-3 py-1.5 text-zinc-700 transition-colors hover:border-rust/50 hover:text-rust dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-rust-light md:inline-flex"
      aria-label={
        stars !== undefined
          ? `${stars.toLocaleString()} GitHub stars — star this repo`
          : "Star this repo on GitHub"
      }
    >
      <span aria-hidden="true">★</span>
      <span className="tabular-nums">
        {stars !== undefined ? stars.toLocaleString() : "…"}
      </span>
    </a>
  );
}
