import { ArrowLeft } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center py-20">
      <Container className="text-center">
        <p className="text-sm font-medium uppercase tracking-widest text-accent">
          404
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-ink dark:text-paper sm:text-5xl">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-ink/60 dark:text-paper/60">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <div className="mt-8 flex justify-center">
          <Button href="/" size="lg">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Button>
        </div>
      </Container>
    </section>
  );
}
