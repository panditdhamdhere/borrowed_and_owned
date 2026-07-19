import type { MetadataRoute } from "next";
import { getAllLearningGoals } from "@/lib/learning-goals";
import { getAllPaths } from "@/lib/paths";
import {
  getAllResources,
  getAllTags,
  getCategoriesWithCounts,
} from "@/lib/resources";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.siteUrl;
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: "weekly", priority: 1 },
    {
      url: `${baseUrl}/my-learning`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/start`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/paths`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/starter-kits`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/changelog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/tags`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const categoryRoutes = getCategoriesWithCounts().map(({ category }) => ({
    url: `${baseUrl}/category/${category}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const resourceRoutes = getAllResources().map((resource) => ({
    url: `${baseUrl}/resource/${resource.id}`,
    lastModified: resource.addedAt ? new Date(resource.addedAt) : now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  const tagRoutes = getAllTags().map(({ tag }) => ({
    url: `${baseUrl}/tags/${tag}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.5,
  }));

  const pathRoutes = getAllPaths().map((path) => ({
    url: `${baseUrl}/paths/${path.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const startGoalRoutes = getAllLearningGoals().map((goal) => ({
    url: `${baseUrl}/start/${goal.id}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...resourceRoutes,
    ...tagRoutes,
    ...pathRoutes,
    ...startGoalRoutes,
  ];
}
