import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/content";
import { ProjectCaseStudy } from "./ProjectCaseStudy";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} — Case Study | Punith`,
    description: project.tagline,
    openGraph: {
      title: `${project.title} — Case Study`,
      description: project.tagline,
      type: "article",
    },
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return <ProjectCaseStudy project={project} />;
}
