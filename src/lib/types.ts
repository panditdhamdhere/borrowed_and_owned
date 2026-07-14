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

export const SORT_OPTIONS = ["recent", "alpha", "level", "stars"] as const;

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

export const EXPERIENCE_LEVELS = ["none", "some", "comfortable"] as const;

export type ExperienceLevel = (typeof EXPERIENCE_LEVELS)[number];

export interface LearningGoal {
  id: string;
  title: string;
  description: string;
  pathId: string;
  starterKits: Partial<Record<ExperienceLevel, string | null>>;
}

export const EXPERIENCE_LABELS: Record<ExperienceLevel, string> = {
  none: "Brand new to Rust",
  some: "Some exposure",
  comfortable: "Already comfortable",
};

export const EXPERIENCE_DESCRIPTIONS: Record<ExperienceLevel, string> = {
  none: "Haven't written Rust yet — we'll start from setup.",
  some: "Read a bit or know another language — skip the basics where you can.",
  comfortable: "Written Rust before — jump straight into the curated path.",
};

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
  stars: "Most GitHub stars",
};
