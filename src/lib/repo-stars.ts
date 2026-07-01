import type { Resource } from "./types";
import { fetchGitHubStars, parseGitHubRepoUrl } from "./github-stars";

export { fetchGitHubStars, parseGitHubRepoUrl } from "./github-stars";

export async function fetchRepoStarsMap(
  resources: Resource[],
): Promise<Record<string, number>> {
  const repos = resources.filter(
    (resource) =>
      resource.category === "repo" && parseGitHubRepoUrl(resource.url),
  );

  const entries = await Promise.all(
    repos.map(async (resource) => {
      const stars = await fetchGitHubStars(resource.url);
      return stars !== undefined ? ([resource.id, stars] as const) : null;
    }),
  );

  return Object.fromEntries(
    entries.filter((entry): entry is [string, number] => entry !== null),
  );
}
