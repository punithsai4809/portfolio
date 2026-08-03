import type { Metadata } from "next";
import { getJournalPostBySlug, getAllJournalSlugs } from "@/lib/content";
import { JournalPostPage } from "./JournalPostPage";

export const dynamicParams = true;

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllJournalSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);
  if (!post) return { title: "Dispatches | Punith" };

  return {
    title: `${post.title} — Dispatches | Punith`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function JournalPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getJournalPostBySlug(slug);

  return <JournalPostPage slug={slug} initialPost={post} />;
}
