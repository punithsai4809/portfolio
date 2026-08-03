"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface ImageRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "left" | "right" | "up" | "down";
  delay?: number;
  duration?: number;
  once?: boolean;
}

/**
 * Clip-path wipe reveal for images on scroll.
 * Creates a cinematic unveiling effect.
 */
export function ImageReveal({
  children,
  className,
  direction = "left",
  delay = 0,
  duration = 1,
  once = true,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-15% 0px" });

  const clipPaths = {
    left: {
      hidden: "inset(0 100% 0 0)",
      visible: "inset(0 0% 0 0)",
    },
    right: {
      hidden: "inset(0 0 0 100%)",
      visible: "inset(0 0 0 0%)",
    },
    up: {
      hidden: "inset(100% 0 0 0)",
      visible: "inset(0% 0 0 0)",
    },
    down: {
      hidden: "inset(0 0 100% 0)",
      visible: "inset(0 0 0% 0)",
    },
  };

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.div
        initial={{ clipPath: clipPaths[direction].hidden, scale: 1.1 }}
        animate={
          isInView
            ? { clipPath: clipPaths[direction].visible, scale: 1 }
            : { clipPath: clipPaths[direction].hidden, scale: 1.1 }
        }
        transition={{
          clipPath: { duration, delay, ease: [0.77, 0, 0.175, 1] },
          scale: { duration: duration * 1.5, delay, ease: [0.16, 1, 0.3, 1] },
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
