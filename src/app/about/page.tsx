import Image from "next/image";
import Link from "next/link";
import { ArrowRight, GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/experience/timeline";
import { Button } from "@/components/ui/button";
import { site } from "@/data/site";
import { experience } from "@/data/experience";
import { education } from "@/data/education";
import { skillCategories } from "@/data/skills";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "About",
  description:
    "Learn about Asma Babazadehkahrizi's journey from Mechanical Engineering to Data Analytics, her skills, and how she works with data.",
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <section className="border-b border-line py-20 dark:border-line-dark sm:py-28">
        <Container>
          <div className="grid items-center gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div className="relative mx-auto w-full max-w-xs lg:mx-0">
              <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-paper-soft dark:border-line-dark dark:bg-ink-soft">
                <Image
                  src="/images/profile-placeholder.svg"
                  alt={`Portrait of ${site.name}`}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
              </div>
            </div>

            <div>
              <p className="text-sm font-medium uppercase tracking-widest text-accent">
                About Me
              </p>
              <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink dark:text-paper sm:text-5xl">
                From engineering precision to data-driven impact.
              </h1>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/65 dark:text-paper/65">
                <p>
                  I&apos;m {site.firstName}, a Data Analyst based in {site.location}
                  . I build dashboards, pipelines, and analyses that help teams
                  understand what&apos;s actually happening in their business —
                  and what to do about it.
                </p>
                <p>
                  My path started in Mechanical Engineering, where I learned to
                  break complex, ambiguous problems down into measurable,
                  testable pieces. That analytical discipline is what drew me
                  to data: the same rigor, applied to business questions
                  instead of physical systems. Today I work primarily in
                  Power BI, SQL, and Python, with a focus on HR, recruitment,
                  sales, and customer analytics.
                </p>
                <p>
                  I care about dashboards that get used, not just admired —
                  which means starting every project with the business
                  question, not the chart type.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/projects" size="md">
                  View my work
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Button>
                <Button href={site.resumeUrl} variant="secondary" size="md" external>
                  Download CV
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-20 dark:border-line-dark sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Career Journey"
            title="Experience"
            description="From mechanical engineering to hands-on data analytics."
          />
          <div className="mt-14">
            <Timeline items={experience} />
          </div>
          <div className="mt-10">
            <Link
              href="/experience"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent dark:text-paper"
            >
              View full experience
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-line py-20 dark:border-line-dark sm:py-28">
        <Container>
          <SectionHeading eyebrow="Background" title="Education" />
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {education.map((item) => (
              <div
                key={item.institution}
                className="rounded-3xl border border-line p-8 dark:border-line-dark"
              >
                <GraduationCap
                  className="h-6 w-6 text-accent"
                  aria-hidden="true"
                />
                <h3 className="mt-4 text-lg font-semibold text-ink dark:text-paper">
                  {item.institution}
                </h3>
                <p className="text-sm text-ink/60 dark:text-paper/60">
                  {item.credential}, {item.field}
                </p>
                <p className="mt-1 text-sm text-ink/40 dark:text-paper/40">
                  {item.period} · {item.location}
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-ink/65 dark:text-paper/65">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/education"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent dark:text-paper"
            >
              View education details
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <SectionHeading
            eyebrow="Toolkit"
            title="Skills"
            description="The tools and techniques I use to turn raw data into decisions."
          />
          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {skillCategories.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/40 dark:text-paper/40">
                  {group.category}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.skills.map((skill) => (
                    <li
                      key={skill.name}
                      className="text-[15px] font-medium text-ink dark:text-paper"
                    >
                      {skill.name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/skills"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors hover:text-accent dark:text-paper"
            >
              View skill proficiency
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
