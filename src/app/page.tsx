import { Header } from "@/components/Header";
import { ResourceFilters } from "@/components/ResourceFilters";
import { getAllResources, getCategoriesWithCounts } from "@/lib/resources";

export default function Home() {
  const resources = getAllResources();
  const categories = getCategoriesWithCounts();

  return (
    <div className="min-h-full bg-zinc-950">
      <Header />

      <main className="mx-auto max-w-6xl px-6 py-12">
        <section className="mb-12">
          <p className="mb-3 font-mono text-sm text-rust-light">// open source · community curated</p>
          <h1 className="mb-4 max-w-2xl text-4xl font-bold tracking-tight text-zinc-50 sm:text-5xl">
            Everything you need to learn Rust
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-zinc-400">
            Books, videos, courses, open source repos, and more — all in one
            place. Fork the repo and submit a PR to add your favorite resource.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            {categories.map(({ label, count }) => (
              <span
                key={label}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-1.5 text-sm text-zinc-400"
              >
                <span className="font-semibold text-zinc-200">{count}</span>{" "}
                {label.toLowerCase()}
              </span>
            ))}
          </div>
        </section>

        <ResourceFilters resources={resources} />
      </main>

      <footer className="border-t border-zinc-800/80 py-8 text-center text-sm text-zinc-600">
        Built with Next.js · Contributions welcome on GitHub
      </footer>
    </div>
  );
}
