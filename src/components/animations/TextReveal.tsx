"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { cn } from "@/lib/utils";

interface TextRevealProps {
  children: string;
  className?: string;
  variant?: "word" | "line" | "char";
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
}

/**
 * Word-by-word or line-by-line scroll reveal animation.
 * Text splits into units and animates in sequentially.
 */
export function TextReveal({
  children,
  className,
  variant = "word",
  delay = 0,
  staggerDelay = 0.04,
  once = true,
  as: Tag = "div",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-10% 0px" });

  const units = variant === "word"
    ? children.split(" ")
    : variant === "char"
      ? children.split("")
      : children.split("\n");

  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} className={cn("overflow-hidden", className)}>
      {units.map((unit, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "110%", opacity: 0 }}
            animate={isInView ? { y: "0%", opacity: 1 } : { y: "110%", opacity: 0 }}
            transition={{
              duration: 0.6,
              delay: delay + i * staggerDelay,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {unit}
            {variant === "word" && i < units.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
