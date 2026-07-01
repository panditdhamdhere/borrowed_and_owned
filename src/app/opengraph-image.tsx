import { createOgImage, ogSize } from "@/lib/og-image";
import { siteConfig } from "@/lib/site";

export const alt = siteConfig.name;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return createOgImage({
    title: "Everything you need to learn Rust",
    subtitle: siteConfig.description,
    badge: "Open source",
  });
}
