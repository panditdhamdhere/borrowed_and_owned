import type { Metadata } from "next";
import { PageShell } from "@/components/PageShell";
import { FindYourPathWizard } from "@/components/FindYourPathWizard";

export const metadata: Metadata = {
  title: "Find Your Path — Borrowed & Owned",
  description:
    "Answer two quick questions and get a personalized Rust learning plan with starter kit and curated resources.",
};

export default function StartPage() {
  return (
    <PageShell>
      <div className="mx-auto max-w-3xl">
        <p className="mb-3 font-mono text-sm text-rust dark:text-rust-light">
          {"// find your path"}
        </p>
        <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Where should you start?
        </h1>
        <p className="mb-8 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Answer two quick questions and get a tailored plan — starter kit,
          learning path, and curated resources in order.
        </p>
        <FindYourPathWizard />
      </div>
    </PageShell>
  );
}
