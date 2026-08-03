"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface StaggerChildrenProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delay?: number;
  once?: boolean;
  direction?: "up" | "left" | "right" | "fade";
}

/**
 * Staggers child element entry animations.
 * Each child animates in sequence with configurable direction.
 */
export function StaggerChildren({
  children,
  className,
  staggerDelay = 0.08,
  delay = 0,
  once = true,
  direction = "up",
}: StaggerChildrenProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  const variants = {
    up: { y: 30, opacity: 0 },
    left: { x: 30, opacity: 0 },
    right: { x: -30, opacity: 0 },
    fade: { opacity: 0 },
  };

  const initial = variants[direction];

  return (
    <div ref={ref} className={cn(className)}>
      {Array.isArray(children)
        ? children.map((child, i) => (
            <motion.div
              key={i}
              initial={initial}
              animate={isInView ? { x: 0, y: 0, opacity: 1 } : initial}
              transition={{
                duration: 0.6,
                delay: delay + i * staggerDelay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {child}
            </motion.div>
          ))
        : (
            <motion.div
              initial={initial}
              animate={isInView ? { x: 0, y: 0, opacity: 1 } : initial}
              transition={{
                duration: 0.6,
                delay,
                ease: [0.16, 1, 0.3, 1],
              }}
            >
              {children}
            </motion.div>
          )}
    </div>
  );
}
