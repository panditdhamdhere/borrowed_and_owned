import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="group flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-rust font-mono text-sm font-bold text-white">
            R
          </span>
          <div>
            <p className="text-lg font-semibold tracking-tight text-zinc-50 group-hover:text-rust-light transition-colors">
              Borrowed &amp; Owned
            </p>
            <p className="text-xs text-zinc-500">Curated Rust learning resources</p>
          </div>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md px-3 py-1.5 text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-zinc-100"
          >
            Contribute
          </a>
        </nav>
      </div>
    </header>
  );
}
