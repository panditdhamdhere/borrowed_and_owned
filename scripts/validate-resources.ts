import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { z } from "zod";

const resourceSchema = z.object({
  id: z
    .string()
    .min(1)
    .regex(/^[a-z0-9-]+$/, "id must be kebab-case"),
  title: z.string().min(1),
  description: z.string().min(10),
  url: z.string().url(),
  category: z.enum([
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
  ]),
  level: z.enum(["beginner", "intermediate", "advanced"]).optional(),
  tags: z.array(z.string().min(1)).optional(),
  free: z.boolean().optional(),
  author: z.string().min(1).optional(),
  addedAt: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "addedAt must be YYYY-MM-DD")
    .optional(),
});

const pathSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(10),
  level: z.enum(["beginner", "intermediate", "advanced"]),
  resourceIds: z.array(z.string().min(1)).min(1),
});

const starterKitStepSchema = z
  .object({
    title: z.string().min(1),
    description: z.string().min(10),
    resourceId: z.string().min(1).optional(),
    url: z.string().min(1).optional(),
  })
  .refine((step) => step.resourceId ?? step.url, {
    message: "step must have resourceId or url",
  });

const starterKitSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(10),
  steps: z.array(starterKitStepSchema).min(1),
});

const learningGoalSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(10),
  pathId: z.string().min(1),
  starterKits: z.object({
    none: z.string().nullable().optional(),
    some: z.string().nullable().optional(),
    comfortable: z.string().nullable().optional(),
  }),
});

function loadJson<T>(filePath: string): T {
  return JSON.parse(readFileSync(resolve(filePath), "utf8")) as T;
}

function validateResources() {
  const resources = loadJson<unknown[]>("src/content/resources.json");
  const paths = loadJson<{ resourceIds: string[] }[]>("src/content/paths.json");
  const starterKits = loadJson<{ id: string; steps: { resourceId?: string }[] }[]>(
    "src/content/starter-kits.json",
  );
  const learningGoals = loadJson<
    { id: string; pathId: string; starterKits: Record<string, string | null> }[]
  >("src/content/learning-goals.json");

  const ids = new Set<string>();
  const pathIds = new Set<string>();
  const starterKitIds = new Set<string>();
  let errors = 0;

  for (const [index, item] of resources.entries()) {
    const result = resourceSchema.safeParse(item);
    if (!result.success) {
      console.error(`Resource [${index}]:`, result.error.flatten().fieldErrors);
      errors++;
      continue;
    }

    if (ids.has(result.data.id)) {
      console.error(`Duplicate resource id: ${result.data.id}`);
      errors++;
    }
    ids.add(result.data.id);
  }

  for (const [index, item] of paths.entries()) {
    const result = pathSchema.safeParse(item);
    if (!result.success) {
      console.error(`Path [${index}]:`, result.error.flatten().fieldErrors);
      errors++;
      continue;
    }

    for (const resourceId of result.data.resourceIds) {
      if (!ids.has(resourceId)) {
        console.error(
          `Path "${(item as { id?: string }).id}" references missing resource: ${resourceId}`,
        );
        errors++;
      }
    }

    pathIds.add(result.data.id);
  }

  for (const [index, item] of starterKits.entries()) {
    const result = starterKitSchema.safeParse(item);
    if (!result.success) {
      console.error(`Starter kit [${index}]:`, result.error.flatten().fieldErrors);
      errors++;
      continue;
    }

    for (const step of result.data.steps) {
      if (step.resourceId && !ids.has(step.resourceId)) {
        console.error(
          `Starter kit "${result.data.id}" references missing resource: ${step.resourceId}`,
        );
        errors++;
      }
    }

    starterKitIds.add(result.data.id);
  }

  for (const [index, item] of learningGoals.entries()) {
    const result = learningGoalSchema.safeParse(item);
    if (!result.success) {
      console.error(`Learning goal [${index}]:`, result.error.flatten().fieldErrors);
      errors++;
      continue;
    }

    if (!pathIds.has(result.data.pathId)) {
      console.error(
        `Learning goal "${result.data.id}" references missing path: ${result.data.pathId}`,
      );
      errors++;
    }

    for (const [level, kitId] of Object.entries(result.data.starterKits)) {
      if (kitId && !starterKitIds.has(kitId)) {
        console.error(
          `Learning goal "${result.data.id}" references missing starter kit (${level}): ${kitId}`,
        );
        errors++;
      }
    }
  }

  if (errors > 0) {
    console.error(`\nValidation failed with ${errors} error(s).`);
    process.exit(1);
  }

  console.log(
    `Validated ${resources.length} resources, ${paths.length} paths, ${starterKits.length} starter kits, and ${learningGoals.length} learning goals.`,
  );
}

validateResources();
