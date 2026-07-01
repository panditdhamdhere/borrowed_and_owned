const GITHUB_REPO =
  process.env.NEXT_PUBLIC_GITHUB_REPO ??
  "https://github.com/panditdhamdhere/borrowed_and_owned";

export const siteConfig = {
  name: "Borrowed & Owned",
  description: "Curated Rust learning resources — books, videos, courses, and repos.",
  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://borrowed-and-owned.vercel.app",
  githubRepo: GITHUB_REPO,
  githubContributeUrl:
    process.env.NEXT_PUBLIC_GITHUB_CONTRIBUTE_URL ??
    `${GITHUB_REPO}/blob/main/CONTRIBUTING.md`,
  githubSubmitUrl:
    process.env.NEXT_PUBLIC_GITHUB_SUBMIT_URL ??
    `${GITHUB_REPO}/issues/new?template=resource.yml`,
  githubEditResourcesUrl: `${GITHUB_REPO}/edit/main/src/content/resources.json`,
  githubIssuesUrl: `${GITHUB_REPO}/issues`,
  githubStarUrl: `${GITHUB_REPO}/stargazers`,
};

export function getResourceEditUrl(_resourceId: string): string {
  return `${GITHUB_REPO}/edit/main/src/content/resources.json`;
}

export function getResourceSearchUrl(resourceId: string): string {
  return `${GITHUB_REPO}/search?q=${encodeURIComponent(`"${resourceId}"`)}&type=code`;
}
