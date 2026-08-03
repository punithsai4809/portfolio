"use client";

import { cn } from "@/lib/utils";

interface RegistrationMarkProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  className?: string;
}

/**
 * CMYK-style print registration mark.
 * Placed in corners of sections to evoke print production.
 */
export function RegistrationMark({ position = "top-left", className }: RegistrationMarkProps) {
  const positionClasses = {
    "top-left": "top-4 left-4",
    "top-right": "top-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "bottom-right": "bottom-4 right-4",
  };

  return (
    <div
      className={cn(
        "absolute z-10 opacity-20 pointer-events-none",
        positionClasses[position],
        className
      )}
      aria-hidden="true"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        {/* Cross */}
        <line x1="8" y1="0" x2="8" y2="16" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="8" x2="16" y2="8" stroke="currentColor" strokeWidth="0.5" />
        {/* Circle */}
        <circle cx="8" cy="8" r="4" stroke="currentColor" strokeWidth="0.5" fill="none" />
      </svg>
    </div>
  );
}
