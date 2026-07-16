import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Timeline } from "@/components/experience/timeline";
import { experience } from "@/data/experience";
import { buildMetadata } from "@/lib/metadata";

export const metadata = buildMetadata({
  title: "Experience",
  description:
    "Career timeline of Asma Babazadehkahrizi, from Mechanical Engineering to Data Analytics, Power BI, and SQL.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <section className="py-20 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="Career Timeline"
          title="Experience"
          description="Every role has sharpened the same underlying skill: turning ambiguous problems into clear, evidence-based answers."
        />
        <div className="mt-16 max-w-3xl">
          <Timeline items={experience} />
        </div>
      </Container>
    </section>
  );
}
