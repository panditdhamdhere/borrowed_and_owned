export const siteConfig = {
  name: "Borrowed & Owned",
  description: "Curated Rust learning resources — books, videos, courses, and repos.",
  githubRepo:
    process.env.NEXT_PUBLIC_GITHUB_REPO ??
    "https://github.com/panditdhamdhere/borrowed_and_owned",
  githubContributeUrl:
    process.env.NEXT_PUBLIC_GITHUB_CONTRIBUTE_URL ??
    "https://github.com/panditdhamdhere/borrowed_and_owned/blob/main/CONTRIBUTING.md",
  githubSubmitUrl:
    process.env.NEXT_PUBLIC_GITHUB_SUBMIT_URL ??
    "https://github.com/panditdhamdhere/borrowed_and_owned/issues/new?template=resource.yml",
  githubEditResourcesUrl:
    "https://github.com/panditdhamdhere/borrowed_and_owned/edit/main/src/content/resources.json",
};
