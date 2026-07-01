import paths from "@/content/paths.json";
import { getResourceById } from "./resources";
import type { LearningPath, Resource } from "./types";

export function getAllPaths(): LearningPath[] {
  return paths as LearningPath[];
}

export function getPathById(id: string): LearningPath | undefined {
  return getAllPaths().find((path) => path.id === id);
}

export function getPathResources(path: LearningPath): Resource[] {
  return path.resourceIds
    .map((id) => getResourceById(id))
    .filter((resource): resource is Resource => resource !== undefined);
}
