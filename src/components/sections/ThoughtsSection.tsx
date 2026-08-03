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
import { HandwrittenNote } from "@/components/editorial/HandwrittenNote";

/**
 * Thoughts Section — Dedicated Personal Thoughts & Engineering Essays Section.
 * Newspaper op-ed column layout.
 */
export function ThoughtsSection() {
  const [posts, setPosts] = useState<JournalPost[]>([]);

  useEffect(() => {
    setPosts(getJournalPosts());
  }, []);

  const thoughts = (posts.length > 0 ? posts : getJournalPosts()).filter(
    (p) => p.category === "thought" || p.category === "essay" || p.category === "note"
  );
  const featured = thoughts[0];
  const recent = thoughts.slice(1, 4);

  return (
    <section
      id="thoughts"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      aria-label="Personal Thoughts & Essays"
    >
      <RegistrationMark position="top-right" />

      {/* Background number */}
      <SectionNumber number="05" variant="background" className="top-8 right-8 md:right-16" />

      {/* Section header */}
      <div className="mb-16 md:mb-24">
        <SectionNumber number="05" />
        <h2 className="editorial-display text-h1 md:text-display mt-4 tracking-[-0.04em]">
          <TextReveal variant="word">DISPATCHES & ESSAYS</TextReveal>
        </h2>
        <DrawLine className="mt-6 max-w-[140px]" color="var(--color-accent-red)" thickness={2} />
        <p className="editorial-body text-stone max-w-xl mt-6">
          Personal thoughts, software philosophy, and engineering reflections.
        </p>
      </div>

      {/* Newspaper column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Featured essay — main column (60%) */}
        {featured && (
          <article className="lg:col-span-7">
            <StaggerChildren>
              {/* Category & date */}
              <div className="flex items-center gap-3 mb-4">
                <span className="editorial-mono text-micro text-accent-red tracking-widest font-bold">
                  {featured.category.toUpperCase()}
                </span>
                <span className="w-1 h-1 rounded-full bg-muted" />
                <span className="editorial-mono text-micro text-muted tracking-widest">
                  {formatDate(featured.date)}
                </span>
                {featured.readingTime && (
                  <>
                    <span className="w-1 h-1 rounded-full bg-muted" />
                    <span className="editorial-mono text-micro text-muted tracking-widest">
                      {featured.readingTime}
                    </span>
                  </>
                )}
              </div>

              {/* Title */}
              <h3 className="editorial-heading text-h3 md:text-h2 leading-tight mb-4">
                <Link href={`/journal/${featured.slug}`} className="hover:text-accent-red transition-colors duration-300">
                  {featured.title}
                </Link>
              </h3>

              {/* Excerpt */}
              <p className="editorial-body text-charcoal leading-relaxed mb-6 font-serif italic">
                {featured.excerpt}
              </p>

              {/* First paragraph preview */}
              <p className="text-body text-stone leading-relaxed mb-6">
                {featured.content.split("\n\n")[0]?.slice(0, 320)}...
              </p>

              <Link
                href={`/journal/${featured.slug}`}
                className="inline-flex items-center gap-2 text-sm font-sans font-medium tracking-wide border-b border-ink pb-1 hover:border-accent-red hover:text-accent-red transition-colors duration-300"
              >
                Read Full Essay
                <span className="text-xs">→</span>
              </Link>
            </StaggerChildren>
          </article>
        )}

        {/* Recent thoughts — sidebar column (40%) */}
        <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-12">
          <span className="editorial-mono text-micro text-muted tracking-widest block mb-8">
            RECENT THOUGHTS & NOTES
          </span>

          <StaggerChildren staggerDelay={0.15} className="space-y-8">
            {recent.map((post) => (
              <article key={post.slug} className="border-b border-line pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className="editorial-mono text-micro text-accent-blue tracking-widest font-bold">
                    {post.category.toUpperCase()}
                  </span>
                  <span className="editorial-mono text-micro text-muted tracking-widest">
                    {formatDate(post.date)}
                  </span>
                </div>

                <h4 className="editorial-heading text-h4 leading-tight mb-2">
                  <Link href={`/journal/${post.slug}`} className="hover:text-accent-red transition-colors duration-300">
                    {post.title}
                  </Link>
                </h4>

                <p className="text-small text-stone leading-relaxed">
                  {post.excerpt}
                </p>
              </article>
            ))}
          </StaggerChildren>

          {/* View all CTA */}
          <Link
            href="/journal"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium tracking-wide border-b border-ink pb-1 hover:border-accent-red hover:text-accent-red transition-colors duration-300 mt-8"
          >
            Explore All Writing
            <span className="text-xs">→</span>
          </Link>
        </div>
      </div>

      {/* Handwritten annotation */}
      <div className="absolute top-32 right-16 hidden xl:block">
        <HandwrittenNote rotation={-3} color="red">
          unfiltered thoughts →
        </HandwrittenNote>
      </div>
    </section>
  );
}
