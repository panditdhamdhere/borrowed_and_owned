import { fetchGitHubStars } from "@/lib/github-stars";
import { siteConfig } from "@/lib/site";

export const revalidate = 300;

export async function GET() {
  const stars = await fetchGitHubStars(siteConfig.githubRepo, 300);

  return Response.json(
    { stars: stars ?? null },
    {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=60",
      },
    },
  );
}
