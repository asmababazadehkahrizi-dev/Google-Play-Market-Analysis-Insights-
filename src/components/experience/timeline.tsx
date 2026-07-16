"use client";

import { motion } from "framer-motion";
import { ExperienceItem } from "@/types";

export function Timeline({ items }: { items: ExperienceItem[] }) {
  return (
    <ol className="relative border-l border-line dark:border-line-dark">
      {items.map((item, index) => (
        <motion.li
          key={`${item.company}-${item.period}`}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
          className="relative pb-14 pl-10 last:pb-0"
        >
          <span
            className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-paper dark:border-ink ${
              item.current ? "bg-accent" : "bg-ink/30 dark:bg-paper/30"
            }`}
            aria-hidden="true"
          />
          <p className="text-sm font-medium uppercase tracking-wide text-ink/40 dark:text-paper/40">
            {item.period}
            {item.current ? (
              <span className="ml-2 rounded-full bg-accent-soft px-2 py-0.5 text-[11px] font-semibold text-accent dark:bg-accent/15">
                Current
              </span>
            ) : null}
          </p>
          <h3 className="mt-1.5 text-xl font-semibold text-ink dark:text-paper">
            {item.role}
          </h3>
          <p className="text-sm text-ink/60 dark:text-paper/60">
            {item.company} · {item.location}
          </p>
          <p className="mt-3 max-w-2xl text-[15px] leading-relaxed text-ink/70 dark:text-paper/70">
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
        </motion.li>
      ))}
    </ol>
  );
}
