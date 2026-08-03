"use client";

import { useState } from "react";
import Link from "next/link";
import { getJournalPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { TextReveal } from "@/components/animations/TextReveal";
import { DrawLine } from "@/components/animations/DrawLine";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { SectionNumber } from "@/components/editorial/SectionNumber";
import { RegistrationMark } from "@/components/editorial/RegistrationMark";
import { StarRating } from "@/components/editorial/StarRating";
import { ArrowLeft } from "lucide-react";

const CATEGORIES = [
  { key: "all", label: "ALL" },
  { key: "thought", label: "THOUGHTS" },
  { key: "movie-review", label: "REVIEWS" },
  { key: "essay", label: "ESSAYS" },
  { key: "note", label: "NOTES" },
];

const categoryColors: Record<string, string> = {
  "movie-review": "text-accent-yellow",
  thought: "text-accent-blue",
  essay: "text-accent-red",
  note: "text-stone",
};

/**
 * Journal archive page with category filtering.
 */
export function JournalIndex() {
  const allPosts = getJournalPosts();
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredPosts = activeCategory === "all"
    ? allPosts
    : allPosts.filter((p) => p.category === activeCategory);

  return (
    <div className="min-h-screen px-6 md:px-12 lg:px-20 py-12">
      <RegistrationMark position="top-left" />
      <RegistrationMark position="top-right" />

      {/* Back link */}
      <Link
        href="/"
        className="inline-flex items-center gap-2 editorial-mono text-tiny text-muted tracking-widest hover:text-ink transition-colors mb-12"
      >
        <ArrowLeft size={12} />
        BACK TO MAIN
      </Link>

      {/* Header */}
      <div className="mb-16">
        <SectionNumber number="05" />
        <h1 className="editorial-display text-h1 md:text-display mt-4 tracking-[-0.04em]">
          <TextReveal variant="word">DISPATCHES</TextReveal>
        </h1>
        <DrawLine className="mt-6 max-w-[140px]" color="var(--color-accent-red)" thickness={2} />
        <p className="editorial-body text-stone max-w-xl mt-6">
          All entries, unfiltered.
        </p>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-4 mb-12 border-b border-line pb-4">
        {CATEGORIES.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setActiveCategory(cat.key)}
            className={`editorial-mono text-micro tracking-widest pb-1 transition-colors ${
              activeCategory === cat.key
                ? "text-ink border-b-2 border-accent-red"
                : "text-muted hover:text-ink"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Posts list */}
      <StaggerChildren staggerDelay={0.1} className="space-y-8 max-w-3xl">
        {filteredPosts.map((post) => (
          <article key={post.slug} className="border-b border-line pb-8">
            <div className="flex items-center gap-3 mb-2">
              <span className={`editorial-mono text-micro tracking-widest font-bold ${categoryColors[post.category]}`}>
                {post.category.toUpperCase().replace("-", " ")}
              </span>
              <span className="editorial-mono text-micro text-muted tracking-widest">
                {formatDate(post.date)}
              </span>
              {post.readingTime && (
                <>
                  <span className="w-1 h-1 rounded-full bg-muted" />
                  <span className="editorial-mono text-micro text-muted tracking-widest">
                    {post.readingTime}
                  </span>
                </>
              )}
            </div>

            <h2 className="editorial-heading text-h4 md:text-h3 leading-tight mb-2">
              <Link href={`/journal/${post.slug}`} className="hover:text-accent-red transition-colors duration-300">
                {post.title}
              </Link>
            </h2>

            {post.category === "movie-review" && post.rating && (
              <StarRating rating={post.rating} className="mb-2" />
            )}

            <p className="text-body text-stone leading-relaxed">{post.excerpt}</p>
          </article>
        ))}
      </StaggerChildren>

      {filteredPosts.length === 0 && (
        <p className="editorial-body text-muted italic">No entries in this category yet.</p>
      )}
    </div>
  );
}
