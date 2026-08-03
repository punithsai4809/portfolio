"use client";

import { cn } from "@/lib/utils";

interface SectionNumberProps {
  number: string;
  className?: string;
  variant?: "large" | "inline" | "background";
}

/**
 * Large editorial section numbers (§01, §02…).
 * Three variants: large sidebar, inline label, or giant background watermark.
 */
export function SectionNumber({ number, variant = "large", className }: SectionNumberProps) {
  if (variant === "background") {
    return (
      <span
        className={cn(
          "absolute font-display text-mega leading-none font-black text-ink/[0.03] select-none pointer-events-none",
          className
        )}
        aria-hidden="true"
      >
        {number}
      </span>
    );
  }

  if (variant === "inline") {
    return (
      <span
        className={cn(
          "editorial-mono text-muted tracking-widest",
          className
        )}
      >
        §{number}
      </span>
    );
  }

  return (
    <div
      className={cn(
        "editorial-mono text-tiny text-muted tracking-[0.2em]",
        className
      )}
    >
      <span className="text-accent-red">§</span>{number}
    </div>
  );
}
