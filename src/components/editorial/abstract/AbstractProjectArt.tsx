"use client";

import { AbstractArtPos } from "./AbstractArtPos";
import { AbstractArtChatbot } from "./AbstractArtChatbot";
import { AbstractArtInventory } from "./AbstractArtInventory";

interface AbstractProjectArtProps {
  slug: string;
  className?: string;
}

/**
 * Returns custom generative editorial abstract artwork for each project.
 */
export function AbstractProjectArt({ slug, className = "" }: AbstractProjectArtProps) {
  return (
    <div className={`w-full h-full border border-line overflow-hidden ${className}`}>
      {slug === "oceanwaves-pos" && <AbstractArtPos />}
      {slug === "car-recommendation-chatbot" && <AbstractArtChatbot />}
      {slug === "ai-inventory-system" && <AbstractArtInventory />}
      {slug !== "oceanwaves-pos" &&
        slug !== "car-recommendation-chatbot" &&
        slug !== "ai-inventory-system" && <AbstractArtPos />}
    </div>
  );
}
