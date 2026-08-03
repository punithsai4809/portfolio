"use client";

import Link from "next/link";
import { getProjects } from "@/lib/content";
import { TextReveal } from "@/components/animations/TextReveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { CountUp } from "@/components/animations/CountUp";
import { DrawLine } from "@/components/animations/DrawLine";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { SectionNumber } from "@/components/editorial/SectionNumber";
import { RegistrationMark } from "@/components/editorial/RegistrationMark";
import { HandwrittenNote } from "@/components/editorial/HandwrittenNote";
import { AbstractProjectArt } from "@/components/editorial/abstract/AbstractProjectArt";
import type { Project } from "@/types";

/**
 * Projects Section — Full case study editorial cards.
 * Each project gets a unique layout composition and custom generative abstract artwork.
 */
export function ProjectsSection() {
  const projects = getProjects();

  return (
    <section
      id="projects"
      className="relative py-24 md:py-32 overflow-hidden"
      aria-label="Selected Work"
    >
      <RegistrationMark position="top-left" />

      {/* Section header */}
      <div className="px-6 md:px-12 lg:px-20 mb-20 md:mb-32">
        <SectionNumber number="03" />
        <h2 className="editorial-display text-h1 md:text-display mt-4 tracking-[-0.04em]">
          <TextReveal variant="word">SELECTED WORK</TextReveal>
        </h2>
        <DrawLine className="mt-6 max-w-[200px]" color="var(--color-accent-red)" thickness={2} delay={0.5} />
        <p className="editorial-body text-stone max-w-xl mt-6">
          Every project starts with a question. Here are the answers I&apos;ve built.
        </p>
      </div>

      {/* Project cards — each with unique layout */}
      <div className="space-y-32 md:space-y-48">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isEven = index % 2 === 0;

  return (
    <article className="relative px-6 md:px-12 lg:px-20 max-w-5xl mx-auto">
      {/* Giant background number */}
      <SectionNumber
        number={project.number}
        variant="background"
        className={`top-0 ${isEven ? "right-8 md:right-16" : "left-8 md:left-16"}`}
      />

      <div className="relative z-10 space-y-6 border-b border-line pb-16">
        {/* Project number, client & timeline */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-display text-h2 font-black text-ink/15">{project.number}</span>
            <span className="editorial-mono text-micro text-accent-red tracking-widest font-bold">
              {project.timeline}
            </span>
          </div>

          {project.client && (
            <span className="editorial-mono text-micro text-muted tracking-widest">
              CLIENT: {project.client.toUpperCase()}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="editorial-heading text-h2 md:text-h1 leading-tight">
          <TextReveal variant="word">{project.title}</TextReveal>
        </h3>

        {/* Tagline */}
        <p className="text-lead text-stone italic font-serif max-w-3xl">{project.tagline}</p>

        <DrawLine color="var(--color-line)" thickness={1} />

        {/* Problem → Solution narrative (2-column editorial layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <span className="editorial-mono text-micro text-accent-red tracking-widest block mb-2 font-bold">
              THE PROBLEM
            </span>
            <p className="text-body text-charcoal leading-relaxed">
              {project.problem}
            </p>
          </div>
          <div>
            <span className="editorial-mono text-micro text-accent-blue tracking-widest block mb-2 font-bold">
              THE SOLUTION
            </span>
            <p className="text-body text-charcoal leading-relaxed">
              {project.solution}
            </p>
          </div>
        </div>

        {/* Tech stack pills */}
        <div className="flex flex-wrap gap-2 pt-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="editorial-mono text-micro text-stone tracking-widest border border-line px-3 py-1.5"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Metrics */}
        <StaggerChildren staggerDelay={0.1} className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-4">
          {project.metrics.map((metric) => (
            <div key={metric.label}>
              <div className="font-display text-h3 md:text-h2 font-black tracking-tight leading-none">
                <CountUp end={metric.value} suffix={metric.suffix || ""} />
              </div>
              <span className="editorial-mono text-micro text-muted tracking-widest block mt-1">
                {metric.label}
              </span>
            </div>
          ))}
        </StaggerChildren>

        {/* CTA */}
        <div className="pt-4">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-2 text-sm font-sans font-medium tracking-wide border-b border-ink pb-1 hover:border-accent-red hover:text-accent-red transition-colors duration-300"
          >
            Read Full Case Study
            <span className="text-xs">→</span>
          </Link>
        </div>
      </div>

      {/* Handwritten annotation */}
      {index === 0 && (
        <div className="absolute -top-6 right-12 hidden xl:block">
          <HandwrittenNote rotation={-3} color="red">
            featured project →
          </HandwrittenNote>
        </div>
      )}
    </article>
  );
}
