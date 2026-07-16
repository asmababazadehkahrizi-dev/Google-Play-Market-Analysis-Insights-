import { ArrowRight, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { site } from "@/data/site";

export function CtaSection() {
  return (
    <section className="border-t border-line py-24 dark:border-line-dark sm:py-32">
      <Container>
        <div className="rounded-[2.5rem] border border-line bg-paper-soft px-8 py-16 text-center dark:border-line-dark dark:bg-ink-soft sm:px-16 sm:py-20">
          <h2 className="text-balance text-3xl font-semibold tracking-tight text-ink dark:text-paper sm:text-4xl lg:text-5xl">
            Let&apos;s turn your data into
            <br className="hidden sm:block" /> your next decision.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-ink/60 dark:text-paper/60">
            Open to Data Analyst opportunities and freelance dashboard projects
            in {site.location.split(",")[0]} and remote.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button href="/contact" size="lg">
              Contact Me
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Button>
            <Button href={`mailto:${site.email}`} variant="secondary" size="lg">
              {site.email}
              <Mail className="h-4 w-4" aria-hidden="true" />
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
