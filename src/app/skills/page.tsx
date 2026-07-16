import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { SkillBar } from "@/components/skills/skill-bar";
import { skillCategories } from "@/data/skills";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Skills",
  description:
    "Technical skills: Power BI, SQL, Python, Tableau, Excel, Power Query, DAX, ETL, data visualization, and more.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Toolkit"
          title="Skills & proficiency"
          description="An honest snapshot of the tools I use daily and where I'm still building depth."
        />

        <div className="mt-16 grid gap-14 lg:grid-cols-3">
          {skillCategories.map((group) => (
            <div key={group.category}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/40 dark:text-paper/40">
                {group.category}
              </h2>
              <div className="mt-6 space-y-6">
                {group.skills.map((skill) => (
                  <SkillBar key={skill.name} name={skill.name} level={skill.level} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
