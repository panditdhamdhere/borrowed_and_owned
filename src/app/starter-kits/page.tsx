import { PageShell } from "@/components/PageShell";
import { StarterKitCard } from "@/components/StarterKitCard";
import { getAllStarterKits } from "@/lib/starter-kits";

export default function StarterKitsPage() {
  const kits = getAllStarterKits();

  return (
    <PageShell>
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
        Starter kits
      </h1>
      <p className="mb-8 max-w-2xl text-zinc-600 dark:text-zinc-400">
        Step-by-step guides for setup, your first projects, interview prep, and
        contributing to open source.
      </p>
      <div className="grid gap-6 lg:grid-cols-2">
        {kits.map((kit) => (
          <StarterKitCard key={kit.id} kit={kit} />
        ))}
      </div>
    </PageShell>
  );
}
