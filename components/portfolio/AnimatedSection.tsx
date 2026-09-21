"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";

export default function AnimatedSection({ children, ...props }: HTMLMotionProps<"section">) {
  const reduced = useReducedMotion();
  return (
    <motion.section
      initial={reduced ? false : { opacity: 0.35, y: 65 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      {...props}
    >
      {children}
    </motion.section>
  );
}
