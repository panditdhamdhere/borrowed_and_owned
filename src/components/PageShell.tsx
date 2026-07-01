import { Header } from "./Header";
import { RustCrab } from "./RustCrab";
import { siteConfig } from "@/lib/site";

interface PageShellProps {
  children: React.ReactNode;
}

export function PageShell({ children }: PageShellProps) {
  return (
    <div className="min-h-full bg-zinc-50 text-zinc-900 dark:bg-zinc-950 dark:text-zinc-100">
      <Header />
      <main className="mx-auto max-w-6xl px-6 py-12">{children}</main>
      <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800/80">
        <div className="flex flex-col items-center gap-2 text-sm text-zinc-500 dark:text-zinc-600">
          <RustCrab size={32} className="opacity-60" />
          <p>
            Built with love ·{" "}
            <a
              href={siteConfig.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-rust transition-colors dark:text-zinc-500 dark:hover:text-rust-light"
            >
              View on GitHub
            </a>
            {" · "}
            <a
              href={siteConfig.githubContributeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-600 hover:text-rust transition-colors dark:text-zinc-500 dark:hover:text-rust-light"
            >
              Contribute
            </a>
          </p>
          <a
            href={siteConfig.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-xs text-zinc-400 hover:text-rust dark:hover:text-rust-light"
          >
            github.com/panditdhamdhere/borrowed_and_owned
          </a>
        </div>
      </footer>
    </div>
  );
}
