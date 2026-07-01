export const siteConfig = {
  name: "Borrowed & Owned",
  description: "Curated Rust learning resources — books, videos, courses, and repos.",
  githubRepo:
    process.env.NEXT_PUBLIC_GITHUB_REPO ??
    "https://github.com/panditdhamdhere/borrowed-and-owned",
  githubContributeUrl:
    process.env.NEXT_PUBLIC_GITHUB_CONTRIBUTE_URL ??
    "https://github.com/panditdhamdhere/borrowed-and-owned/blob/main/CONTRIBUTING.md",
};
