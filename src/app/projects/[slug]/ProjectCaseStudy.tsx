"use client";

import Link from "next/link";
import type { Project } from "@/types";
import { TextReveal } from "@/components/animations/TextReveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { CountUp } from "@/components/animations/CountUp";
import { DrawLine } from "@/components/animations/DrawLine";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { SectionNumber } from "@/components/editorial/SectionNumber";
import { RegistrationMark } from "@/components/editorial/RegistrationMark";
import { HandwrittenNote } from "@/components/editorial/HandwrittenNote";
import { IssueLabel } from "@/components/editorial/IssueLabel";
import { AbstractProjectArt } from "@/components/editorial/abstract/AbstractProjectArt";
import { ArrowLeft } from "lucide-react";

/**
 * Full editorial case study layout for a single project.
 * Long-form narrative: problem → research → solution → results → lessons.
 */
export function ProjectCaseStudy({ project }: { project: Project }) {
  return (
    <article className="min-h-screen">
      {/* Hero */}
      <header className="relative min-h-[70vh] flex flex-col justify-end px-6 md:px-12 lg:px-20 py-12 overflow-hidden">
        <RegistrationMark position="top-left" />
        <RegistrationMark position="top-right" />

        {/* Background number */}
        <span
          className="absolute top-8 right-8 md:right-16 font-display text-mega font-black text-ink/[0.03] leading-none select-none pointer-events-none"
          aria-hidden="true"
        >
          {project.number}
        </span>

        {/* Back link */}
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 editorial-mono text-tiny text-muted tracking-widest hover:text-ink transition-colors mb-12"
        >
          <ArrowLeft size={12} />
          BACK TO ALL PROJECTS
        </Link>

        <IssueLabel volume={1} issue={parseInt(project.number)} className="mb-6" />

        <h1 className="editorial-display text-h1 md:text-display tracking-[-0.04em] max-w-4xl">
          <TextReveal variant="word">{project.title}</TextReveal>
        </h1>

        <p className="editorial-heading text-h5 md:text-h4 text-stone italic mt-4 max-w-2xl">
          {project.tagline}
        </p>

        <DrawLine className="mt-8 max-w-[200px]" color="var(--color-accent-red)" thickness={2} delay={0.5} />

        {/* Metadata row */}
        <div className="flex flex-wrap gap-8 mt-8">
          {[
            { label: "ROLE", value: project.role },
            { label: "TIMELINE", value: project.timeline },
            ...(project.client ? [{ label: "CLIENT", value: project.client }] : []),
          ].map(({ label, value }) => (
            <div key={label}>
              <span className="editorial-mono text-micro text-muted tracking-widest block">{label}</span>
              <span className="font-sans text-body text-ink font-medium">{value}</span>
            </div>
          ))}
        </div>
      </header>

      {/* Content sections */}

      {/* Content sections */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 lg:px-20 py-16 space-y-20">
        {/* Overview */}
        <section>
          <SectionNumber number="01" />
          <h2 className="editorial-heading text-h3 mt-3 mb-4">Overview</h2>
          <p className="editorial-body text-charcoal">{project.overview}</p>
        </section>

        {/* Problem */}
        <section>
          <SectionNumber number="02" />
          <h2 className="editorial-heading text-h3 mt-3 mb-4">The Problem</h2>
          <div className="border-l-2 border-accent-red pl-6">
            <p className="editorial-body text-charcoal">{project.problem}</p>
          </div>
        </section>

        {/* Research */}
        <section>
          <SectionNumber number="03" />
          <h2 className="editorial-heading text-h3 mt-3 mb-4">Research</h2>
          <p className="editorial-body text-charcoal">{project.research}</p>
        </section>

        {/* Solution */}
        <section>
          <SectionNumber number="04" />
          <h2 className="editorial-heading text-h3 mt-3 mb-4">The Solution</h2>
          <p className="editorial-body text-charcoal">{project.solution}</p>
        </section>

        {/* Architecture */}
        <section>
          <SectionNumber number="05" />
          <h2 className="editorial-heading text-h3 mt-3 mb-4">Architecture</h2>
          <div className="bg-warm p-8 border border-line">
            <p className="editorial-body text-charcoal">{project.architecture}</p>
          </div>
        </section>

        {/* Tech stack */}
        <section>
          <span className="editorial-mono text-micro text-muted tracking-widest block mb-4">TECHNOLOGY STACK</span>
          <StaggerChildren staggerDelay={0.05} className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="bg-ink text-paper px-3 py-1.5 text-xs font-mono tracking-wide"
              >
                {tech}
              </span>
            ))}
          </StaggerChildren>
        </section>

        {/* Challenges */}
        <section>
          <SectionNumber number="06" />
          <h2 className="editorial-heading text-h3 mt-3 mb-4">Challenges</h2>
          <ul className="space-y-3">
            {project.challenges.map((challenge, i) => (
              <li key={i} className="flex items-start gap-3 editorial-body text-charcoal">
                <span className="font-display text-h5 font-black text-ink/10 leading-none mt-0.5">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {challenge}
              </li>
            ))}
          </ul>
        </section>

        {/* Results */}
        <section className="bg-warm -mx-6 md:-mx-12 lg:-mx-20 px-6 md:px-12 lg:px-20 py-12">
          <SectionNumber number="07" />
          <h2 className="editorial-heading text-h3 mt-3 mb-6">Results</h2>
          <p className="editorial-body text-charcoal mb-8">{project.results}</p>

          <StaggerChildren staggerDelay={0.15} className="grid grid-cols-2 md:grid-cols-3 gap-8">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <div className="font-display text-h2 md:text-h1 font-black tracking-tight leading-none">
                  <CountUp end={metric.value} suffix={metric.suffix || ""} />
                </div>
                <span className="editorial-mono text-micro text-muted tracking-widest block mt-2">
                  {metric.label}
                </span>
              </div>
            ))}
          </StaggerChildren>
        </section>

        {/* Lessons */}
        <section>
          <SectionNumber number="08" />
          <h2 className="editorial-heading text-h3 mt-3 mb-6">Lessons Learned</h2>
          <div className="space-y-4">
            {project.lessons.map((lesson, i) => (
              <div key={i} className="pl-6 border-l-2 border-accent-yellow">
                <p className="editorial-pullquote text-h5 text-charcoal">&ldquo;{lesson}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>

        {/* Links */}
        <div className="flex flex-wrap gap-4 pt-8 border-t border-line">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 text-sm font-sans font-medium tracking-wide hover:bg-charcoal transition-colors"
            >
              View Live Project →
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-ink px-6 py-3 text-sm font-sans font-medium tracking-wide hover:bg-ink hover:text-paper transition-colors"
            >
              View Source Code →
            </a>
          )}
        </div>
      </div>

      {/* Back to projects */}
      <div className="px-6 md:px-12 lg:px-20 py-12 border-t border-line">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 editorial-mono text-tiny text-muted tracking-widest hover:text-ink transition-colors"
        >
          <ArrowLeft size={12} />
          BACK TO ALL PROJECTS
        </Link>
      </div>
    </article>
  );
}
