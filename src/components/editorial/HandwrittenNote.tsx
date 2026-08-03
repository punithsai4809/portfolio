"use client";

import { cn } from "@/lib/utils";

interface HandwrittenNoteProps {
  children: React.ReactNode;
  rotation?: number;
  color?: "ink" | "red" | "blue";
  className?: string;
}

/**
 * Handwritten annotation using Caveat font.
 * Adds a personal, human touch to the editorial layout.
 */
export function HandwrittenNote({
  children,
  rotation = -3,
  color = "ink",
  className,
}: HandwrittenNoteProps) {
  const colorClasses = {
    ink: "text-charcoal",
    red: "text-accent-red",
    blue: "text-accent-blue",
  };

  return (
    <span
      className={cn(
        "editorial-handwritten text-lg inline-block",
        colorClasses[color],
        className
      )}
      style={{ transform: `rotate(${rotation}deg)` }}
      aria-hidden="true"
    >
      {children}
    </span>
  );
}
