"use client";

import { cn } from "@/lib/utils";

interface EditorialCaptionProps {
  children: React.ReactNode;
  number?: string;
  className?: string;
}

/**
 * Tiny editorial caption for images and figures.
 * Mimics magazine figure captions with optional figure number.
 */
export function EditorialCaption({ children, number, className }: EditorialCaptionProps) {
  return (
    <figcaption
      className={cn(
        "editorial-caption mt-2",
        className
      )}
    >
      {number && (
        <span className="text-accent-red mr-1">Fig. {number}</span>
      )}
      {children}
    </figcaption>
  );
}
