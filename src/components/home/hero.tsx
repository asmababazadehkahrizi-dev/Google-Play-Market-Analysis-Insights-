"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { AnimatedBackground } from "@/components/home/animated-background";
import { site } from "@/data/site";
import { skillList } from "@/data/skills";
import { projects } from "@/data/projects";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
  }),
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-16 sm:pb-32 sm:pt-24">
      <AnimatedBackground />
      <Container>
        <div className="grid items-center gap-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
          <div>
            <motion.div
              custom={0}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-sm text-ink/60 dark:border-line-dark dark:text-paper/60"
            >
              <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
              {site.location}
            </motion.div>

            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="text-balance text-5xl font-semibold leading-[1.05] tracking-tightest text-ink dark:text-paper sm:text-6xl lg:text-7xl"
            >
              {site.heroHeadline}
            </motion.h1>

            <motion.p
              custom={2}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-6 max-w-xl text-lg leading-relaxed text-ink/60 dark:text-paper/60 sm:text-xl"
            >
              {site.heroSubheadline}
            </motion.p>

            <motion.div
              custom={3}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <Button href="/projects" size="lg">
                View Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
              <Button href="/contact" variant="ghost" size="lg">
                Contact Me
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Button>
            </motion.div>

            <motion.dl
              custom={4}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              className="mt-16 grid max-w-lg grid-cols-3 gap-6 border-t border-line pt-8 dark:border-line-dark"
            >
              <div>
                <dt className="text-sm text-ink/50 dark:text-paper/50">Projects</dt>
                <dd className="mt-1 text-2xl font-semibold text-ink dark:text-paper">
                  {projects.length}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ink/50 dark:text-paper/50">Skills</dt>
                <dd className="mt-1 text-2xl font-semibold text-ink dark:text-paper">
                  {skillList.length}
                </dd>
              </div>
              <div>
                <dt className="text-sm text-ink/50 dark:text-paper/50">Background</dt>
                <dd className="mt-1 text-2xl font-semibold text-ink dark:text-paper">
                  Eng.
                </dd>
              </div>
            </motion.dl>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            className="relative mx-auto w-full max-w-sm lg:mx-0"
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-line bg-paper-soft shadow-[0_30px_80px_-30px_rgba(0,0,0,0.25)] dark:border-line-dark dark:bg-ink-soft">
              <Image
                src="/images/profile-placeholder.svg"
                alt={`${site.name} monogram`}
                fill
                priority
                sizes="(min-width: 1024px) 384px, 320px"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-line bg-paper px-5 py-4 shadow-xl dark:border-line-dark dark:bg-ink sm:block">
              <p className="text-xs font-medium uppercase tracking-wide text-ink/40 dark:text-paper/40">
                Currently
              </p>
              <p className="mt-1 text-sm font-semibold text-ink dark:text-paper">
                Open to Data Analyst roles
              </p>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
