"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/types";

export function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group block overflow-hidden rounded-3xl border border-line bg-paper transition-colors duration-300 hover:border-ink/30 dark:border-line-dark dark:bg-ink-soft dark:hover:border-paper/30"
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-paper-soft dark:bg-ink">
          <Image
            src={project.image}
            alt={`${project.title} dashboard preview`}
            fill
            sizes="(min-width: 1024px) 400px, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-apple group-hover:scale-[1.04]"
          />
        </div>
        <div className="p-6">
          <p className="text-xs font-medium uppercase tracking-wide text-accent">
            {project.category}
          </p>
          <div className="mt-2 flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold text-ink dark:text-paper">
              {project.title}
            </h3>
            <ArrowUpRight
              className="mt-1 h-4 w-4 shrink-0 text-ink/30 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink dark:text-paper/30 dark:group-hover:text-paper"
              aria-hidden="true"
            />
          </div>
          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink/60 dark:text-paper/60">
            {project.summary}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}
