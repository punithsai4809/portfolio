"use client";

import { cn } from "@/lib/utils";

interface PrintingGuideProps {
  side?: "left" | "right";
  className?: string;
}

/**
 * Thin margin guide lines — editorial print production detail.
 */
export function PrintingGuide({ side = "left", className }: PrintingGuideProps) {
  return (
    <div
      className={cn(
        "margin-guide",
        side === "left" ? "left-[5%]" : "right-[5%]",
        className
      )}
      aria-hidden="true"
    />
  );
}
