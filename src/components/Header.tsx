import Link from "next/link";
import { fetchGitHubStars } from "@/lib/github-stars";
import { siteConfig } from "@/lib/site";
import { GitHubStarButton } from "./GitHubStarButton";
import { RustCrab } from "./RustCrab";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
  { href: "/start", label: "Find your path" },
  { href: "/my-learning", label: "My learning" },
  { href: "/paths", label: "Paths" },
  { href: "/starter-kits", label: "Starter Kits" },
  { href: "/changelog", label: "Changelog" },
  { href: "/tags", label: "Tags" },
];

export async function Header() {
  const stars = await fetchGitHubStars(siteConfig.githubRepo, 300);

  return (
    <header className="border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800/80 dark:bg-zinc-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link href="/" className="group flex items-center gap-3">
          <RustCrab
            size={36}
            className="transition-transform group-hover:scale-110 group-hover:rotate-3"
          />
          <div>
            <p className="text-lg font-semibold tracking-tight text-zinc-900 group-hover:text-rust transition-colors dark:text-zinc-50 dark:group-hover:text-rust-light">
              Borrowed &amp; Owned
            </p>
            <p className="text-xs text-zinc-500">Curated Rust learning resources</p>
          </div>
        </Link>
        <nav className="flex items-center gap-2 text-sm sm:gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden rounded-md px-2 py-1.5 text-zinc-600 transition-colors hover:text-rust sm:inline dark:text-zinc-400 dark:hover:text-rust-light"
            >
              {link.label}
            </Link>
          ))}
          <GitHubStarButton initialStars={stars} />
          <a
            href={siteConfig.githubSubmitUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-rust px-3 py-1.5 font-medium text-white transition-colors hover:bg-rust-light"
          >
            Submit
          </a>
          <a
            href={siteConfig.githubContributeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md px-3 py-1.5 text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100 md:inline"
          >
            Contribute
          </a>
          <a
            href={siteConfig.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-md border border-zinc-300 px-3 py-1.5 text-zinc-700 transition-colors hover:border-rust/50 hover:text-rust dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-rust-light sm:inline"
          >
            GitHub
          </a>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
