"use client";

import Link from "next/link";
import { getJournalPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { TextReveal } from "@/components/animations/TextReveal";
import { DrawLine } from "@/components/animations/DrawLine";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { SectionNumber } from "@/components/editorial/SectionNumber";
import { RegistrationMark } from "@/components/editorial/RegistrationMark";
import { HandwrittenNote } from "@/components/editorial/HandwrittenNote";
import { StarRating } from "@/components/editorial/StarRating";

const categoryLabels: Record<string, string> = {
  "movie-review": "REVIEW",
  thought: "THOUGHT",
  essay: "ESSAY",
  note: "NOTE",
};

const categoryColors: Record<string, string> = {
  "movie-review": "text-accent-yellow",
  thought: "text-accent-blue",
  essay: "text-accent-red",
  note: "text-stone",
};

/**
 * Journal Section — "Dispatches" editorial column.
 * Newspaper op-ed layout with featured post + sidebar.
 */
export function JournalSection() {
  const posts = getJournalPosts();
  const featured = posts[0];
  const recent = posts.slice(1, 4);

  return (
    <section
      id="journal"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      aria-label="Journal"
    >
      <RegistrationMark position="top-right" />

      {/* Background number */}
      <SectionNumber number="05" variant="background" className="top-8 right-8 md:right-16" />

      {/* Section header */}
      <div className="mb-16 md:mb-24">
        <SectionNumber number="05" />
        <h2 className="editorial-display text-h1 md:text-display mt-4 tracking-[-0.04em]">
          <TextReveal variant="word">DISPATCHES</TextReveal>
        </h2>
        <DrawLine className="mt-6 max-w-[140px]" color="var(--color-accent-red)" thickness={2} />
        <p className="editorial-body text-stone max-w-xl mt-6">
          Thoughts, reviews, and essays. Unfiltered takes on technology, cinema, and everything in between.
        </p>
      </div>

      {/* Newspaper column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Featured post — main column (60%) */}
        {featured && (
          <article className="lg:col-span-7">
            <StaggerChildren>
              {/* Category & date */}
              <div className="flex items-center gap-3 mb-4">
                <span className={`editorial-mono text-micro tracking-widest font-bold ${categoryColors[featured.category]}`}>
                  {categoryLabels[featured.category]}
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

              {/* Star rating for reviews */}
              {featured.category === "movie-review" && featured.rating && (
                <StarRating rating={featured.rating} className="mb-4" />
              )}

              {/* Excerpt */}
              <p className="editorial-body text-charcoal leading-relaxed mb-6">
                {featured.excerpt}
              </p>

              {/* First paragraph preview */}
              <p className="text-body text-stone leading-relaxed mb-6">
                {featured.content.split("\n\n")[0]?.slice(0, 300)}...
              </p>

              <Link
                href={`/journal/${featured.slug}`}
                className="inline-flex items-center gap-2 text-sm font-sans font-medium tracking-wide border-b border-ink pb-1 hover:border-accent-red hover:text-accent-red transition-colors duration-300"
              >
                Continue Reading
                <span className="text-xs">→</span>
              </Link>
            </StaggerChildren>
          </article>
        )}

        {/* Recent posts — sidebar column (40%) */}
        <div className="lg:col-span-5 lg:border-l lg:border-line lg:pl-12">
          <span className="editorial-mono text-micro text-muted tracking-widest block mb-8">
            RECENT ENTRIES
          </span>

          <StaggerChildren staggerDelay={0.15} className="space-y-8">
            {recent.map((post) => (
              <article key={post.slug} className="border-b border-line pb-6">
                <div className="flex items-center gap-3 mb-2">
                  <span className={`editorial-mono text-micro tracking-widest font-bold ${categoryColors[post.category]}`}>
                    {categoryLabels[post.category]}
                  </span>
                  <span className="editorial-mono text-micro text-muted tracking-widest">
                    {formatDate(post.date)}
                  </span>
                </div>

                <h4 className="editorial-heading text-h5 leading-tight mb-2">
                  <Link href={`/journal/${post.slug}`} className="hover:text-accent-red transition-colors duration-300">
                    {post.title}
                  </Link>
                </h4>

                {post.category === "movie-review" && post.rating && (
                  <StarRating rating={post.rating} className="mb-2" />
                )}

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
            Read All Entries
            <span className="text-xs">→</span>
          </Link>
        </div>
      </div>

      {/* Handwritten annotation */}
      <div className="absolute top-32 right-16 hidden xl:block">
        <HandwrittenNote rotation={-3} color="red">
          my unfiltered takes →
        </HandwrittenNote>
      </div>
    </section>
  );
}
