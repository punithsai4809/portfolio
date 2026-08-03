"use client";

import { cn } from "@/lib/utils";

interface IssueLabelProps {
  volume?: number;
  issue?: number;
  date?: string;
  className?: string;
}

/**
 * Magazine-style issue label: "Vol. 1 / Issue 03 / August 2026"
 */
export function IssueLabel({ volume = 1, issue = 1, date, className }: IssueLabelProps) {
  const displayDate = date || new Date().toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div
      className={cn(
        "editorial-mono text-micro text-muted tracking-[0.15em]",
        className
      )}
      aria-hidden="true"
    >
      Vol. {volume} / Issue {String(issue).padStart(2, "0")} / {displayDate}
    </div>
  );
}
