import Link from "next/link";
import type { StarterKit } from "@/lib/types";

interface StarterKitCardProps {
  kit: StarterKit;
}

export function StarterKitCard({ kit }: StarterKitCardProps) {
  return (
    <article className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <h3 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-zinc-50">
        {kit.title}
      </h3>
      <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {kit.description}
      </p>
      <ol className="space-y-4">
        {kit.steps.map((step, index) => (
          <li key={step.title} className="flex gap-4">
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-rust/15 text-sm font-semibold text-rust dark:text-rust-light">
              {index + 1}
            </span>
            <div>
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                {step.resourceId ? (
                  <Link
                    href={`/resource/${step.resourceId}`}
                    className="hover:text-rust dark:hover:text-rust-light"
                  >
                    {step.title}
                  </Link>
                ) : step.url?.startsWith("/") ? (
                  <Link
                    href={step.url}
                    className="hover:text-rust dark:hover:text-rust-light"
                  >
                    {step.title}
                  </Link>
                ) : (
                  <a
                    href={step.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-rust dark:hover:text-rust-light"
                  >
                    {step.title}
                  </a>
                )}
              </p>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  );
}
