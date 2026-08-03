"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { JournalPost } from "@/types";
import { getJournalPostBySlug, getJournalPosts } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { TextReveal } from "@/components/animations/TextReveal";
import { DrawLine } from "@/components/animations/DrawLine";
import { RegistrationMark } from "@/components/editorial/RegistrationMark";
import { StarRating } from "@/components/editorial/StarRating";
import { IssueLabel } from "@/components/editorial/IssueLabel";
import { ArrowLeft } from "lucide-react";

const categoryLabels: Record<string, string> = {
  "movie-review": "REVIEW",
  thought: "THOUGHT",
  essay: "ESSAY",
  note: "NOTE",
};

interface JournalPostPageProps {
  slug: string;
  initialPost?: JournalPost;
}

/**
 * Full journal post page — editorial long-form reading experience with client-side fallback lookup.
 */
export function JournalPostPage({ slug, initialPost }: JournalPostPageProps) {
  const [post, setPost] = useState<JournalPost | undefined>(initialPost);

  useEffect(() => {
    // If not found in initial props (e.g. newly created via Admin CMS in browser), fetch from client store
    if (!post) {
      const found = getJournalPostBySlug(slug);
      if (found) {
        setPost(found);
      }
    }
  }, [slug, post]);

  // Fallback state if entry is not found
  if (!post) {
    return (
      <div className="min-h-screen px-6 md:px-12 lg:px-20 py-24 flex flex-col items-center justify-center text-center">
        <RegistrationMark position="top-left" />
        <span className="editorial-mono text-micro text-accent-red tracking-widest block mb-4">
          ENTRY NOT FOUND
        </span>
        <h1 className="editorial-heading text-h2 md:text-h1 mb-6">404 — Article Not Found</h1>
        <p className="editorial-body text-stone max-w-md mb-8">
          The requested dispatch or review could not be found. It may have been moved or updated.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 font-sans text-sm font-medium tracking-wide hover:bg-charcoal transition-colors"
        >
          <ArrowLeft size={14} />
          Return to Portfolio
        </Link>
      </div>
    );
  }

  const paragraphs = post.content.split("\n\n");

  return (
    <article className="min-h-screen">
      {/* Header */}
      <header className="relative px-6 md:px-12 lg:px-20 pt-12 pb-16 overflow-hidden">
        <RegistrationMark position="top-left" />
        <RegistrationMark position="top-right" />

        {/* Back link */}
        <Link
          href={post.category === "movie-review" ? "/#movie-reviews" : "/#thoughts"}
          className="inline-flex items-center gap-2 editorial-mono text-tiny text-muted tracking-widest hover:text-ink transition-colors mb-12"
        >
          <ArrowLeft size={12} />
          BACK TO {post.category === "movie-review" ? "FILM REVIEWS" : "DISPATCHES"}
        </Link>

        <IssueLabel className="mb-6" />

        {/* Category & date */}
        <div className="flex items-center gap-3 mb-4">
          <span className="editorial-mono text-micro text-accent-red tracking-widest font-bold">
            {categoryLabels[post.category] || post.category.toUpperCase()}
          </span>
          <span className="w-1 h-1 rounded-full bg-muted" />
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

        {/* Title */}
        <h1 className="editorial-heading text-h2 md:text-h1 leading-tight max-w-4xl">
          <TextReveal variant="word">{post.title}</TextReveal>
        </h1>

        {/* Director credit */}
        {post.director && (
          <p className="editorial-mono text-micro text-stone tracking-wider mt-3">
            DIRECTED BY: {post.director.toUpperCase()} {post.year ? `(${post.year})` : ""}
          </p>
        )}

        {/* Star rating for reviews */}
        {post.category === "movie-review" && post.rating && (
          <StarRating rating={post.rating} className="mt-4" />
        )}

        <DrawLine className="mt-8 max-w-[160px]" color="var(--color-accent-red)" thickness={2} delay={0.5} />

        {/* Tags */}
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-6">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="editorial-mono text-micro text-muted tracking-widest border border-line px-2 py-1"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {/* Cover Image if available */}
      {post.coverImage && (
        <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 mb-12">
          <div className="relative aspect-[16/9] w-full bg-warm border border-line overflow-hidden shadow-md">
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLElement).style.display = "none";
              }}
            />
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 md:px-12 lg:px-20 py-12">
        {/* Verdict Box if available */}
        {post.verdict && (
          <div className="bg-warm border-l-4 border-accent-yellow p-6 mb-10 shadow-sm">
            <span className="editorial-mono text-micro text-accent-yellow tracking-widest block font-bold mb-1">
              CRITIC VERDICT
            </span>
            <p className="font-serif text-lead italic text-charcoal">{post.verdict}</p>
          </div>
        )}

        {/* Lead paragraph */}
        {paragraphs.length > 0 && (
          <p className="text-lead text-charcoal leading-relaxed mb-8 font-serif italic">
            {paragraphs[0]}
          </p>
        )}

        {/* Remaining paragraphs */}
        <div className="space-y-6">
          {paragraphs.slice(1).map((paragraph, i) => (
            <p key={i} className="editorial-body text-charcoal">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-6 md:px-12 lg:px-20 py-12 border-t border-line">
        <Link
          href={post.category === "movie-review" ? "/#movie-reviews" : "/#thoughts"}
          className="inline-flex items-center gap-2 editorial-mono text-tiny text-muted tracking-widest hover:text-ink transition-colors"
        >
          <ArrowLeft size={12} />
          BACK TO {post.category === "movie-review" ? "FILM REVIEWS" : "DISPATCHES"}
        </Link>
      </div>
    </article>
  );
}
