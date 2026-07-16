import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ProjectCard } from "@/components/projects/project-card";
import { projects, getProjectBySlug } from "@/data/projects";
import { buildMetadata } from "@/lib/metadata";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return buildMetadata({
      title: "Project not found",
      description: "This project could not be found.",
      path: `/projects/${params.slug}`,
    });
  }
  return buildMetadata({
    title: project.title,
    description: project.summary,
    path: `/projects/${project.slug}`,
    image: project.image,
  });
}

export default function ProjectDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const project = getProjectBySlug(params.slug);
  if (!project) notFound();

  const related = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3);

  return (
    <>
      <section className="border-b border-line py-16 dark:border-line-dark sm:py-24">
        <Container>
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-ink/60 transition-colors hover:text-ink dark:text-paper/60 dark:hover:text-paper"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to projects
          </Link>

          <div className="mt-8 flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-sm font-medium uppercase tracking-widest text-accent">
                  {project.category}
                </p>
                <Badge>{project.label}</Badge>
              </div>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink dark:text-paper sm:text-5xl">
                {project.title}
              </h1>
              <p className="mt-5 text-lg leading-relaxed text-ink/65 dark:text-paper/65">
                {project.summary}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button href={project.githubUrl} variant="secondary" external>
                <Github className="h-4 w-4" aria-hidden="true" />
                GitHub
              </Button>
              <Button href={project.demoUrl} external>
                View Analysis
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="relative aspect-[16/9] overflow-hidden rounded-3xl border border-line bg-paper-soft dark:border-line-dark dark:bg-ink-soft">
            <Image
              src={project.image}
              alt={`${project.title} main dashboard screenshot`}
              fill
              priority
              sizes="(min-width: 1024px) 1120px, 100vw"
              className="object-cover"
            />
          </div>

          {project.gallery.length > 1 ? (
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              {project.gallery.slice(1).map((image) => (
                <div
                  key={image}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-line bg-paper-soft dark:border-line-dark dark:bg-ink-soft"
                >
                  <Image
                    src={image}
                    alt={`${project.title} additional screenshot`}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          ) : null}
        </Container>
      </section>

      <section className="border-y border-line py-16 dark:border-line-dark sm:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/40 dark:text-paper/40">
                Business Problem
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/75 dark:text-paper/75">
                {project.businessProblem}
              </p>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/40 dark:text-paper/40">
                Solution
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-ink/75 dark:text-paper/75">
                {project.solution}
              </p>
            </div>
          </div>

          <div className="mt-14 grid gap-14 lg:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/40 dark:text-paper/40">
                Outcomes
              </h2>
              <ul className="mt-4 space-y-3">
                {project.outcomes.map((outcome) => (
                  <li
                    key={outcome}
                    className="flex gap-3 text-[15px] leading-relaxed text-ink/75 dark:text-paper/75"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {outcome}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold uppercase tracking-wide text-ink/40 dark:text-paper/40">
                Technologies
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {related.length > 0 ? (
        <section className="py-16 sm:py-24">
          <Container>
            <h2 className="text-2xl font-semibold tracking-tight text-ink dark:text-paper">
              More projects
            </h2>
            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p, index) => (
                <ProjectCard key={p.slug} project={p} index={index} />
              ))}
            </div>
          </Container>
        </section>
      ) : null}
    </>
  );
}
