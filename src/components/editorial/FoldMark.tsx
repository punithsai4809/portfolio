"use client";

import { cn } from "@/lib/utils";

interface FoldMarkProps {
  position?: "top" | "center" | "bottom";
  className?: string;
}

/**
 * Subtle fold line across sections — print production detail.
 */
export function FoldMark({ position = "center", className }: FoldMarkProps) {
  const positionClasses = {
    top: "top-0",
    center: "top-1/2 -translate-y-1/2",
    bottom: "bottom-0",
  };

  return (
    <div
      className={cn("fold-mark", positionClasses[position], className)}
      aria-hidden="true"
    />
  );
}
