"use client";

import { cn } from "@/lib/utils";

interface StarRatingProps {
  rating: number; // 1-5
  maxStars?: number;
  className?: string;
}

/**
 * Editorial star rating glyphs for movie/show reviews.
 * Uses ★ (filled) and ☆ (empty) characters.
 */
export function StarRating({ rating, maxStars = 5, className }: StarRatingProps) {
  return (
    <div
      className={cn(
        "inline-flex gap-0.5 text-accent-yellow",
        className
      )}
      role="img"
      aria-label={`Rating: ${rating} out of ${maxStars} stars`}
    >
      {Array.from({ length: maxStars }, (_, i) => (
        <span
          key={i}
          className={cn(
            "text-lg",
            i < rating ? "opacity-100" : "opacity-25"
          )}
        >
          {i < rating ? "★" : "☆"}
        </span>
      ))}
    </div>
  );
}
