import { notFound } from "next/navigation";
import { createOgImage, ogSize } from "@/lib/og-image";
import { getAllResources, getResourceById } from "@/lib/resources";
import { CATEGORY_LABELS } from "@/lib/types";

export const alt = "Resource — Borrowed & Owned";
export const size = ogSize;
export const contentType = "image/png";

interface ImageProps {
  params: Promise<{ id: string }>;
}

export function generateStaticParams() {
  return getAllResources().map((resource) => ({ id: resource.id }));
}

export default async function Image({ params }: ImageProps) {
  const { id } = await params;
  const resource = getResourceById(id);

  if (!resource) {
    notFound();
  }

  return createOgImage({
    title: resource.title,
    subtitle: resource.description,
    badge: CATEGORY_LABELS[resource.category],
  });
}
