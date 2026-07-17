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
                  alt={`${site.name} monogram`}
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
                  I&apos;m {site.firstName}, a Commercial Data Analyst based in{" "}
                  {site.location}. I build dashboards and use SQL and Power
                  Query to extract, consolidate, and analyse data for revenue,
                  pricing, and performance reporting — most recently as a Data
                  Analyst at Entralon Real Estate, and before that in pricing,
                  cost, and profitability analysis at RAAK Hydraulic.
                </p>
                <p>
                  My path started in Mechanical Engineering at London South
                  Bank University, where I learned to break complex, ambiguous
                  problems down into measurable, testable pieces. That
                  analytical discipline is what drew me to data — the same
                  rigor, applied to commercial questions instead of physical
                  systems. I later completed a Data Analytics Graduate
                  Certificate at BrainStation, and today work primarily in
                  Power BI, Power Query, SQL, and Python.
                </p>
                <p>
                  I&apos;m comfortable managing inbound analytics requests
                  independently and prioritising competing demands in
                  fast-paced, client-facing environments — and I care about
                  reporting that moves teams from manual processes toward
                  clearer, dashboard-led insight, not dashboards that just
                  look good.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/projects" size="md">
                  View my work
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
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
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {skillCategories.map((group) => (
              <div key={group.category}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-ink/40 dark:text-paper/40">
                  {group.category}
                </h3>
                <ul className="mt-4 space-y-3">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="text-[15px] font-medium text-ink dark:text-paper"
                    >
                      {skill}
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
