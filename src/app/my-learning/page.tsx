import type { Metadata } from "next";
import { LearningDashboard } from "@/components/LearningDashboard";
import { PageShell } from "@/components/PageShell";

export const metadata: Metadata = {
  title: "My Learning — Borrowed & Owned",
  description:
    "Track your Rust learning plan, path progress, and saved resources in one place.",
};

export default function MyLearningPage() {
  return (
    <PageShell>
      <p className="mb-3 font-mono text-sm text-rust dark:text-rust-light">
        {"// my learning"}
      </p>
      <h1 className="mb-2 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        My learning
      </h1>
      <p className="mb-8 max-w-3xl text-zinc-600 dark:text-zinc-400">
        Your active plan, up next step, path progress, and saved resources —
        stored locally in your browser.
      </p>
      <LearningDashboard />
    </PageShell>
  );
}
