"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface DrawLineProps {
  className?: string;
  direction?: "horizontal" | "vertical";
  color?: string;
  thickness?: number;
  delay?: number;
  duration?: number;
}

/**
 * SVG line draw animation triggered on scroll.
 * Used for dividers, timeline connectors, and decorative elements.
 */
export function DrawLine({
  className,
  direction = "horizontal",
  color = "currentColor",
  thickness = 1,
  delay = 0,
  duration = 1.2,
}: DrawLineProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  if (direction === "vertical") {
    return (
      <div ref={ref} className={cn("w-px h-full", className)}>
        <motion.div
          className="w-full origin-top"
          style={{ backgroundColor: color }}
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
        />
      </div>
    );
  }

  return (
    <div ref={ref} className={cn("w-full", className)} style={{ height: `${thickness}px` }}>
      <motion.div
        className="h-full origin-left"
        style={{ backgroundColor: color }}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}
      />
    </div>
  );
}
