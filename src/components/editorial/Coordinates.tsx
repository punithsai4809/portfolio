"use client";

import { cn } from "@/lib/utils";

interface CoordinatesProps {
  lat: string;
  lng: string;
  className?: string;
}

/**
 * Geographic coordinates display in mono font.
 */
export function Coordinates({ lat, lng, className }: CoordinatesProps) {
  return (
    <span
      className={cn(
        "editorial-mono text-micro text-muted tracking-widest",
        className
      )}
      aria-label={`Location: ${lat}, ${lng}`}
    >
      {lat}°N, {lng}°E
    </span>
  );
}
