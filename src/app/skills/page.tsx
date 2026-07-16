import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Badge } from "@/components/ui/badge";
import { skillCategories } from "@/data/skills";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Skills",
  description:
    "Technical and commercial skills: Power BI, SQL, Power Query, Tableau, Advanced Excel, Python, pricing and profitability analysis, and reporting.",
  path: "/skills",
});

export default function SkillsPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Toolkit"
          title="Skills"
          description="The tools and commercial competencies I use day to day, grouped as they are on my CV."
        />

        <div className="mt-16 grid gap-14 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((group) => (
            <div key={group.category}>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/40 dark:text-paper/40">
                {group.category}
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <Badge key={skill}>{skill}</Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
