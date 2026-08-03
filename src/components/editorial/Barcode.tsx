"use client";

import { cn } from "@/lib/utils";

interface BarcodeProps {
  code?: string;
  className?: string;
}

/**
 * Decorative barcode sticker element.
 * Adds a magazine/print production detail.
 */
export function Barcode({ code = "ISBN 978-0-00-000000-0", className }: BarcodeProps) {
  return (
    <div
      className={cn(
        "inline-flex flex-col items-center gap-0.5 opacity-20",
        className
      )}
      aria-hidden="true"
    >
      {/* Barcode bars */}
      <div className="flex gap-px h-6">
        {[2, 1, 3, 1, 2, 1, 1, 3, 2, 1, 1, 2, 3, 1, 2, 1, 1, 3, 1, 2, 1, 3, 2, 1].map(
          (width, i) => (
            <div
              key={i}
              className="bg-ink"
              style={{ width: `${width}px` }}
            />
          )
        )}
      </div>
      <span className="font-mono text-[8px] tracking-[0.15em] text-muted">
        {code}
      </span>
    </div>
  );
}
