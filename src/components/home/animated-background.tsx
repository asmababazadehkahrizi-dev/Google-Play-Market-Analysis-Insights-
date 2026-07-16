"use client";

import { motion } from "framer-motion";

export function AnimatedBackground() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <div className="absolute inset-0 gradient-mesh" />
      <motion.div
        className="absolute -left-32 -top-32 h-[420px] w-[420px] rounded-full bg-accent/10 blur-3xl dark:bg-accent/20"
        animate={{ y: [0, 24, 0], x: [0, 16, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-24 -right-24 h-[380px] w-[380px] rounded-full bg-ink/[0.04] blur-3xl dark:bg-paper/[0.06]"
        animate={{ y: [0, -20, 0], x: [0, -14, 0] }}
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
      />
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.35] dark:opacity-[0.15]"
        width="100%"
        height="100%"
      >
        <defs>
          <pattern
            id="grid-pattern"
            width="56"
            height="56"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 56 0 L 0 0 0 56"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              className="text-ink/10 dark:text-paper/10"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pattern)" />
      </svg>
    </div>
  );
}
