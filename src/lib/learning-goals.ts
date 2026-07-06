import goals from "@/content/learning-goals.json";
import { getPathById, getPathResources } from "./paths";
import { getStarterKitById } from "./starter-kits";
import type { ExperienceLevel, LearningGoal, Resource, StarterKit } from "./types";

export function getAllLearningGoals(): LearningGoal[] {
  return goals as LearningGoal[];
}

export function getLearningGoalById(id: string): LearningGoal | undefined {
  return getAllLearningGoals().find((goal) => goal.id === id);
}

export function resolveStarterKitId(
  goal: LearningGoal,
  experience: ExperienceLevel,
): string | undefined {
  const kitId = goal.starterKits[experience];
  if (kitId === null) return undefined;
  if (kitId) return kitId;

  if (experience === "comfortable") {
    return goal.starterKits.some ? goal.starterKits.some : undefined;
  }

  if (experience === "some" && goal.starterKits.none) {
    return goal.starterKits.none;
  }

  return undefined;
}

export interface LearningPlan {
  goal: LearningGoal;
  experience: ExperienceLevel;
  path: NonNullable<ReturnType<typeof getPathById>>;
  pathResources: Resource[];
  starterKit?: StarterKit;
}

export function buildLearningPlan(
  goalId: string,
  experience: ExperienceLevel,
): LearningPlan | undefined {
  const goal = getLearningGoalById(goalId);
  if (!goal) return undefined;

  const path = getPathById(goal.pathId);
  if (!path) return undefined;

  const starterKitId = resolveStarterKitId(goal, experience);
  const starterKit = starterKitId ? getStarterKitById(starterKitId) : undefined;

  return {
    goal,
    experience,
    path,
    pathResources: getPathResources(path),
    starterKit,
  };
}
