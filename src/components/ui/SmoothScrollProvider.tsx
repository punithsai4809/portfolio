"use client";

import { ReactLenis } from "lenis/react";

/**
 * Smooth scroll provider wrapping the application.
 * Uses Lenis for buttery-smooth scrolling.
 */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,
        duration: 1.2,
        smoothWheel: true,
      }}
    >
      {children}
    </ReactLenis>
  );
}
