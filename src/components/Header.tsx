import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { RustCrab } from "./RustCrab";

export function Header() {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="group flex items-center gap-3">
          <RustCrab
            size={36}
            className="transition-transform group-hover:scale-110 group-hover:rotate-3"
          />
          <div>
            <p className="text-lg font-semibold tracking-tight text-zinc-50 group-hover:text-rust-light transition-colors">
              Borrowed &amp; Owned
            </p>
            <p className="text-xs text-zinc-500">Curated Rust learning resources</p>
          </div>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <a
            href={siteConfig.githubContributeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          >
            Contribute
          </a>
          <a
            href={siteConfig.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md border border-zinc-700 px-3 py-1.5 text-zinc-300 transition-colors hover:border-rust/50 hover:text-rust-light"
          >
            GitHub
          </a>
        </nav>
      </div>
    </header>
  );
}
