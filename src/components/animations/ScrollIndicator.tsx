"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ScrollIndicatorProps {
  className?: string;
  label?: string;
}

/**
 * Animated scroll-down indicator for the hero section.
 * Minimal mouse/chevron animation encouraging user to scroll.
 */
export function ScrollIndicator({ className, label = "Scroll to explore" }: ScrollIndicatorProps) {
  return (
    <div className={cn("flex flex-col items-center gap-3", className)}>
      {/* Mouse outline */}
      <div className="w-5 h-8 border border-charcoal/40 rounded-full flex justify-center pt-1.5">
        <motion.div
          className="w-1 h-2 bg-charcoal/60 rounded-full"
          animate={{ y: [0, 8, 0] }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>
      <span className="editorial-mono text-micro text-muted tracking-widest">
        {label}
      </span>
    </div>
  );
}
