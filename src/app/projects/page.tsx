import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { projects } from "@/data/projects";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Data analytics and business intelligence projects by Asma Babazadehkahrizi — Power BI dashboards, SQL analysis, and Python automation.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Portfolio"
          title="Projects"
          description="Dashboards, pipelines, and analyses built to solve real business problems — from HR attrition to sales performance."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
