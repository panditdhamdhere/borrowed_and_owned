import { notFound, redirect } from "next/navigation";
import { LearningPlanView } from "@/components/LearningPlanView";
import { PageShell } from "@/components/PageShell";
import { buildLearningPlan, getAllLearningGoals } from "@/lib/learning-goals";
import { EXPERIENCE_LEVELS, type ExperienceLevel } from "@/lib/types";

interface StartGoalPageProps {
  params: Promise<{ goal: string }>;
  searchParams: Promise<{ experience?: string }>;
}

export function generateStaticParams() {
  return getAllLearningGoals().map((goal) => ({ goal: goal.id }));
}

function parseExperience(value?: string): ExperienceLevel {
  if (value && EXPERIENCE_LEVELS.includes(value as ExperienceLevel)) {
    return value as ExperienceLevel;
  }
  return "none";
}

export async function generateMetadata({ params, searchParams }: StartGoalPageProps) {
  const { goal: goalId } = await params;
  const { experience: experienceParam } = await searchParams;
  const plan = buildLearningPlan(goalId, parseExperience(experienceParam));

  if (!plan) return { title: "Plan not found" };

  return {
    title: `${plan.goal.title} — Your Learning Plan`,
    description: plan.goal.description,
  };
}

export default async function StartGoalPage({
  params,
  searchParams,
}: StartGoalPageProps) {
  const { goal: goalId } = await params;
  const { experience: experienceParam } = await searchParams;
  const experience = parseExperience(experienceParam);

  const plan = buildLearningPlan(goalId, experience);

  if (!plan) {
    notFound();
  }

  if (!experienceParam) {
    redirect(`/start/${goalId}?experience=none`);
  }

  return (
    <PageShell>
      <LearningPlanView
        key={`${plan.goal.id}-${plan.experience}`}
        plan={plan}
      />
    </PageShell>
  );
}
