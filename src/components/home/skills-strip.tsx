import { Container } from "@/components/ui/container";
import { skillList } from "@/data/skills";

export function SkillsStrip() {
  return (
    <section className="border-t border-line py-16 dark:border-line-dark">
      <Container>
        <p className="text-center text-sm font-medium uppercase tracking-widest text-ink/40 dark:text-paper/40">
          Tools &amp; Technologies
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {skillList.map((skill) => (
            <span
              key={skill}
              className="text-base font-medium text-ink/50 transition-colors hover:text-ink dark:text-paper/50 dark:hover:text-paper sm:text-lg"
            >
              {skill}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
