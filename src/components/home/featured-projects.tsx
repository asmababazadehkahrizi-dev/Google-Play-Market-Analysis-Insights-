import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ProjectCard } from "@/components/projects/project-card";
import { getFeaturedProjects } from "@/data/projects";

export function FeaturedProjects() {
  const projects = getFeaturedProjects().slice(0, 3);

  return (
    <section className="border-t border-line py-24 dark:border-line-dark sm:py-32">
      <Container>
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <SectionHeading
            eyebrow="Selected Work"
            title="Featured projects"
            description="A sample of dashboards and analytics pipelines built to answer real business questions."
          />
          <Link
            href="/projects"
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent dark:text-paper"
          >
            View all projects
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <ProjectCard key={project.slug} project={project} index={index} />
          ))}
        </div>
      </Container>
    </section>
  );
}
