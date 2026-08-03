"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

interface ParallaxImageProps {
  children: React.ReactNode;
  className?: string;
  speed?: number; // -50 to 50, default 20
  overflow?: boolean;
}

/**
 * Depth parallax effect via Framer Motion scroll progress.
 * Wraps content and translates Y based on scroll position.
 */
export function ParallaxImage({
  children,
  className,
  speed = 20,
  overflow = true,
}: ParallaxImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed}%`, `${speed}%`]);

  return (
    <div
      ref={ref}
      className={cn(
        overflow ? "overflow-hidden" : "",
        className
      )}
    >
      <motion.div style={{ y }} className="will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
