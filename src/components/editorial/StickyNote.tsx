"use client";

import { cn } from "@/lib/utils";

interface StickyNoteProps {
  children: React.ReactNode;
  rotation?: number;
  color?: "yellow" | "pink" | "blue" | "green";
  className?: string;
}

/**
 * Rotated sticky note annotation element.
 */
export function StickyNote({
  children,
  rotation = -2,
  color = "yellow",
  className,
}: StickyNoteProps) {
  const colorClasses = {
    yellow: "bg-[#FFF9C4]",
    pink: "bg-[#FCE4EC]",
    blue: "bg-[#E3F2FD]",
    green: "bg-[#E8F5E9]",
  };

  return (
    <div
      className={cn(
        "px-4 py-3 shadow-sm editorial-handwritten text-base leading-snug max-w-[200px]",
        colorClasses[color],
        className
      )}
      style={{
        transform: `rotate(${rotation}deg)`,
        boxShadow: "2px 3px 8px rgba(0,0,0,0.08)",
      }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
