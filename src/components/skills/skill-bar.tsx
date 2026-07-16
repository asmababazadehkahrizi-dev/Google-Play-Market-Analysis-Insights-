"use client";

import { motion } from "framer-motion";

export function SkillBar({ name, level }: { name: string; level: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="text-[15px] font-medium text-ink dark:text-paper">
          {name}
        </span>
        <span className="text-xs text-ink/40 dark:text-paper/40">{level}%</span>
      </div>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-paper-soft dark:bg-ink">
        <motion.div
          className="h-full rounded-full bg-ink dark:bg-paper"
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    </div>
  );
}
