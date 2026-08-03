"use client";

import { cn } from "@/lib/utils";

interface MarginNoteProps {
  children: React.ReactNode;
  side?: "left" | "right";
  className?: string;
}

/**
 * Side annotation in mono font.
 * Appears in the margin of editorial sections.
 */
export function MarginNote({ children, side = "right", className }: MarginNoteProps) {
  return (
    <aside
      className={cn(
        "hidden xl:block absolute editorial-mono text-micro text-muted leading-relaxed max-w-[140px]",
        side === "right" ? "right-6" : "left-6",
        className
      )}
      aria-label="Margin note"
    >
      {children}
    </aside>
  );
}
