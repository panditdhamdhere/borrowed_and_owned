const GITHUB_REPO_PATTERN =
  /^https?:\/\/github\.com\/([^/]+)\/([^/]+?)(?:\/|$)/;

export function parseGitHubRepoUrl(
  url: string,
): { owner: string; repo: string } | null {
  const match = url.match(GITHUB_REPO_PATTERN);
  if (!match) return null;
  return { owner: match[1], repo: match[2].replace(/\.git$/, "") };
}

export async function fetchGitHubStars(
  url: string,
  revalidateSeconds = 86400,
): Promise<number | undefined> {
  const parsed = parseGitHubRepoUrl(url);
  if (!parsed) return undefined;

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${parsed.owner}/${parsed.repo}`,
      {
        headers,
        next: { revalidate: revalidateSeconds },
      },
    );

    if (!response.ok) return undefined;

    const data = (await response.json()) as { stargazers_count?: number };
    return data.stargazers_count;
  } catch {
    return undefined;
  }
}
