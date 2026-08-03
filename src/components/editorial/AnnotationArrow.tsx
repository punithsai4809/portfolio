"use client";

import { cn } from "@/lib/utils";

interface AnnotationArrowProps {
  direction?: "left" | "right" | "up" | "down";
  label?: string;
  className?: string;
}

/**
 * SVG arrows with a hand-drawn feel for editorial annotations.
 */
export function AnnotationArrow({
  direction = "right",
  label,
  className,
}: AnnotationArrowProps) {
  const rotations = {
    right: 0,
    down: 90,
    left: 180,
    up: 270,
  };

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 text-charcoal",
        className
      )}
      aria-hidden="true"
      style={{ transform: `rotate(${rotations[direction]}deg)` }}
    >
      {label && (
        <span className="editorial-handwritten text-sm">{label}</span>
      )}
      <svg
        width="32"
        height="12"
        viewBox="0 0 32 12"
        fill="none"
        className="opacity-60"
      >
        <path
          d="M0 6C0 6 8 5.5 16 6C24 6.5 28 6 28 6"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
        />
        <path
          d="M24 2L29 6L24 10"
          stroke="currentColor"
          strokeWidth="1.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
