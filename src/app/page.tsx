import { Hero } from "@/components/home/hero";
import { SkillsStrip } from "@/components/home/skills-strip";
import { FeaturedProjects } from "@/components/home/featured-projects";
import { CtaSection } from "@/components/home/cta-section";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/data/site";

export const metadata = buildMetadata({
  title: `${site.name} — ${site.title} in London`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <SkillsStrip />
      <FeaturedProjects />
      <CtaSection />
    </>
  );
}
