export const RESOURCE_CATEGORIES = [
  "book",
  "video",
  "course",
  "repo",
  "blog",
  "podcast",
  "cheatsheet",
  "tool",
  "community",
  "newsletter",
  "conference",
] as const;

export const RESOURCE_LEVELS = ["beginner", "intermediate", "advanced"] as const;

export const SORT_OPTIONS = ["recent", "alpha", "level"] as const;

export type ResourceCategory = (typeof RESOURCE_CATEGORIES)[number];
export type ResourceLevel = (typeof RESOURCE_LEVELS)[number];
export type SortOption = (typeof SORT_OPTIONS)[number];

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
  addedAt?: string;
}

export interface LearningPath {
  id: string;
  title: string;
  description: string;
  level: ResourceLevel;
  resourceIds: string[];
}

export interface StarterKitStep {
  title: string;
  description: string;
  resourceId?: string;
  url?: string;
}

export interface StarterKit {
  id: string;
  title: string;
  description: string;
  steps: StarterKitStep[];
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
  community: "Community",
  newsletter: "Newsletters",
  conference: "Conferences",
};

export const LEVEL_ORDER: Record<ResourceLevel, number> = {
  beginner: 0,
  intermediate: 1,
  advanced: 2,
};

export const SORT_LABELS: Record<SortOption, string> = {
  recent: "Recently added",
  alpha: "A → Z",
  level: "Beginner first",
};
