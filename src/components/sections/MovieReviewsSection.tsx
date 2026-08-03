"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getJournalPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import type { JournalPost } from "@/types";
import { TextReveal } from "@/components/animations/TextReveal";
import { DrawLine } from "@/components/animations/DrawLine";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { SectionNumber } from "@/components/editorial/SectionNumber";
import { RegistrationMark } from "@/components/editorial/RegistrationMark";
import { StarRating } from "@/components/editorial/StarRating";
import { HandwrittenNote } from "@/components/editorial/HandwrittenNote";
import { Film } from "lucide-react";

/**
 * Movie Reviews Section — Dedicated Film Critique & Cinema Reviews Section.
 * Film column layout with star ratings, director credits, image previews, and verdict callout boxes.
 */
export function MovieReviewsSection() {
  const [posts, setPosts] = useState<JournalPost[]>([]);

  useEffect(() => {
    setPosts(getJournalPosts());
  }, []);

  const reviews = (posts.length > 0 ? posts : getJournalPosts()).filter(
    (p) => p.category === "movie-review"
  );

  return (
    <section
      id="movie-reviews"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden bg-warm"
      aria-label="Movie Reviews"
    >
      <RegistrationMark position="top-left" />
      <RegistrationMark position="bottom-right" />

      {/* Background number */}
      <SectionNumber number="06" variant="background" className="top-8 left-8 md:left-16" />

      {/* Section header */}
      <div className="mb-16 md:mb-24">
        <SectionNumber number="06" />
        <h2 className="editorial-display text-h1 md:text-display mt-4 tracking-[-0.04em]">
          <TextReveal variant="word">CINEMA & FILM REVIEWS</TextReveal>
        </h2>
        <DrawLine className="mt-6 max-w-[160px]" color="var(--color-accent-yellow)" thickness={2} />
        <p className="editorial-body text-stone max-w-xl mt-6">
          Critical reviews and commentary on films, series, and visual storytelling.
        </p>
      </div>

      {/* Film reviews grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
        {reviews.map((review, i) => (
          <StaggerChildren key={review.slug} delay={i * 0.15}>
            <article className="group relative bg-paper border border-line p-8 hover:border-ink/40 transition-all duration-300 flex flex-col justify-between h-full">
              <div>
                {/* Image poster preview from URL if available */}
                {review.coverImage && (
                  <div className="relative aspect-[16/9] bg-warm mb-6 overflow-hidden border border-line">
                    <img
                      src={review.coverImage}
                      alt={review.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        // Fallback if image URL is invalid or blocked
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                  </div>
                )}

                {/* Header info */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Film size={14} className="text-accent-yellow" />
                    <span className="editorial-mono text-micro text-accent-yellow tracking-widest font-bold">
                      {review.genre?.toUpperCase() || "FILM REVIEW"}
                    </span>
                  </div>
                  <span className="editorial-mono text-micro text-muted tracking-widest">
                    {review.year || formatDate(review.date)}
                  </span>
                </div>

                {/* Title */}
                <h3 className="editorial-heading text-h3 leading-tight mb-2">
                  <Link href={`/journal/${review.slug}`} className="hover:text-accent-red transition-colors duration-300">
                    {review.title}
                  </Link>
                </h3>

                {/* Director credit */}
                {review.director && (
                  <p className="editorial-mono text-micro text-stone tracking-wider mb-4">
                    DIR: {review.director.toUpperCase()}
                  </p>
                )}

                {/* Star rating */}
                {review.rating && (
                  <StarRating rating={review.rating} className="mb-4" />
                )}

                <DrawLine color="var(--color-line)" thickness={1} className="my-4" />

                {/* Excerpt */}
                <p className="text-body text-charcoal leading-relaxed mb-6 font-serif italic">
                  &ldquo;{review.excerpt}&rdquo;
                </p>

                {/* Verdict callout box */}
                {review.verdict && (
                  <div className="bg-warm border-l-2 border-accent-yellow p-3 mb-6">
                    <span className="editorial-mono text-micro text-accent-yellow tracking-widest block font-bold mb-1">
                      VERDICT
                    </span>
                    <p className="text-small text-charcoal font-sans">{review.verdict}</p>
                  </div>
                )}
              </div>

              {/* Read review link */}
              <div className="pt-4 border-t border-line">
                <Link
                  href={`/journal/${review.slug}`}
                  className="inline-flex items-center gap-2 text-sm font-sans font-medium tracking-wide text-ink hover:text-accent-red transition-colors duration-300"
                >
                  Read Full Critique
                  <span className="text-xs">→</span>
                </Link>
              </div>
            </article>
          </StaggerChildren>
        ))}
      </div>

      {/* Handwritten annotation */}
      <div className="absolute top-28 right-12 hidden xl:block">
        <HandwrittenNote rotation={3} color="ink">
          popcorn required 🍿 →
        </HandwrittenNote>
      </div>
    </section>
  );
}
