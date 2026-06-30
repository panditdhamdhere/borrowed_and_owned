export const RESOURCE_CATEGORIES = [
  "book",
  "video",
  "course",
  "repo",
  "blog",
  "podcast",
  "cheatsheet",
  "tool",
] as const;

export const RESOURCE_LEVELS = ["beginner", "intermediate", "advanced"] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];
export type ResourceLevel = (typeof RESOURCE_LEVELS)[number];

export interface Resource {
  id: string;
  title: string;
  description: string;
  url: string;
  category: ResourceCategory;
  level?: ResourceLevel;
  tags?: string[];
  free?: boolean;
  author?: string;
}

export const CATEGORY_LABELS: Record<ResourceCategory, string> = {
  book: "Books",
  video: "Videos",
  course: "Courses",
  repo: "Open Source",
  blog: "Blogs",
  podcast: "Podcasts",
  cheatsheet: "Cheatsheets",
  tool: "Tools",
};
