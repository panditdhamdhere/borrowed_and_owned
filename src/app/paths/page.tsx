import { LearningPathCard } from "@/components/LearningPathCard";
import { PageShell } from "@/components/PageShell";
import { getAllPaths, getPathResources } from "@/lib/paths";

export default function PathsPage() {
  const paths = getAllPaths();

  return (
    <PageShell>
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        Learning paths
      </h1>
      <p className="mb-8 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Curated roadmaps so you know what to read, watch, and build next — whether
        you&apos;re brand new or going deep on systems programming.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {paths.map((path) => (
          <LearningPathCard
            key={path.id}
            path={path}
            resourceCount={getPathResources(path).length}
          />
        ))}
      </div>
    </PageShell>
  );
}
