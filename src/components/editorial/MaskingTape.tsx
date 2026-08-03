"use client";

import { cn } from "@/lib/utils";

interface MaskingTapeProps {
  position?: "top" | "top-left" | "top-right";
  className?: string;
}

/**
 * Masking tape effect on photo edges — editorial collage detail.
 */
export function MaskingTape({ position = "top", className }: MaskingTapeProps) {
  const positionStyles = {
    top: { top: "-8px", left: "50%", transform: "translateX(-50%) rotate(-1deg)" },
    "top-left": { top: "-6px", left: "12px", transform: "rotate(-4deg)" },
    "top-right": { top: "-6px", right: "12px", transform: "rotate(3deg)" },
  };

  return (
    <div
      className={cn(
        "absolute w-20 h-6 bg-accent-yellow/25 rounded-[1px] z-10 pointer-events-none",
        className
      )}
      style={positionStyles[position]}
      aria-hidden="true"
    />
  );
}
