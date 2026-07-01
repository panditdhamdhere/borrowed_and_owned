import { siteConfig, getResourceEditUrl, getResourceSearchUrl } from "./site";
import { CATEGORY_LABELS, type Resource } from "./types";

export function buildResourceMetadata(resource: Resource) {
  const url = `${siteConfig.siteUrl}/resource/${resource.id}`;

  return {
    title: `${resource.title} — Borrowed & Owned`,
    description: resource.description,
    alternates: { canonical: url },
    openGraph: {
      title: resource.title,
      description: resource.description,
      url,
      siteName: siteConfig.name,
      type: "article" as const,
    },
    twitter: {
      card: "summary_large_image" as const,
      title: resource.title,
      description: resource.description,
    },
  };
}

export function buildResourceJsonLd(resource: Resource) {
  return {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: resource.title,
    description: resource.description,
    url: resource.url,
    learningResourceType: CATEGORY_LABELS[resource.category],
    isAccessibleForFree: resource.free ?? false,
    ...(resource.author ? { author: { "@type": "Person", name: resource.author } } : {}),
    ...(resource.addedAt ? { datePublished: resource.addedAt } : {}),
  };
}

export { getResourceEditUrl, getResourceSearchUrl };
