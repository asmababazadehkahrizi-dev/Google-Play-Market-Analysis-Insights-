import { GraduationCap } from "lucide-react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { education } from "@/data/education";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Education",
  description:
    "Educational background of Asma Babazadehkahrizi: Data Analytics Graduate Certificate from BrainStation and BEng Mechanical Engineering from London South Bank University.",
  path: "/education",
});

export default function EducationPage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Background"
          title="Education"
          description="A foundation in engineering rigor, sharpened by focused, applied training in data analytics."
        />

        <div className="mt-16 space-y-8">
          {education.map((item) => (
            <div
              key={item.institution}
              className="grid gap-6 rounded-3xl border border-line p-8 dark:border-line-dark sm:grid-cols-[auto_1fr] sm:p-10"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-paper-soft dark:bg-ink">
                <GraduationCap className="h-6 w-6 text-accent" aria-hidden="true" />
              </div>
              <div>
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h2 className="text-xl font-semibold text-ink dark:text-paper">
                    {item.institution}
                  </h2>
                  <span className="text-sm text-ink/40 dark:text-paper/40">
                    {item.period}
                  </span>
                </div>
                <p className="mt-1 text-[15px] font-medium text-ink/70 dark:text-paper/70">
                  {item.credential}, {item.field}
                </p>
                <p className="text-sm text-ink/40 dark:text-paper/40">
                  {item.location}
                </p>
                <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/70 dark:text-paper/70">
                  {item.description}
                </p>
                <ul className="mt-4 space-y-2">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex gap-2.5 text-sm leading-relaxed text-ink/60 dark:text-paper/60"
                    >
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-ink/40 dark:bg-paper/40" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
