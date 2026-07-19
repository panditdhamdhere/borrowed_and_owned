import type { StarterKit, Resource } from "./types";
import type { ProgressStep } from "./learning-progress";
import { kitStepId, pathStepId } from "./learning-progress";

export function buildKitSteps(kit: StarterKit): ProgressStep[] {
  return kit.steps.map((step, index) => ({
    id: kitStepId(index),
    title: step.title,
    description: step.description,
    href: step.resourceId
      ? `/resource/${step.resourceId}`
      : step.url?.startsWith("/")
        ? step.url
        : step.url,
    external: Boolean(step.url && !step.url.startsWith("/")),
  }));
}

export function buildPathSteps(resources: Resource[]): ProgressStep[] {
  return resources.map((resource) => ({
    id: pathStepId(resource.id),
    title: resource.title,
    description: resource.description,
    href: `/resource/${resource.id}`,
    external: false,
  }));
}
