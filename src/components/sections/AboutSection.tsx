"use client";

import { getProfile } from "@/lib/content";
import { TextReveal } from "@/components/animations/TextReveal";
import { ImageReveal } from "@/components/animations/ImageReveal";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { DrawLine } from "@/components/animations/DrawLine";
import { SectionNumber } from "@/components/editorial/SectionNumber";
import { HandwrittenNote } from "@/components/editorial/HandwrittenNote";
import { RegistrationMark } from "@/components/editorial/RegistrationMark";
import { MarginNote } from "@/components/editorial/MarginNote";
import { Download } from "lucide-react";

/**
 * About Section — Editorial profile layout.
 * Magazine spread: narrow facts column + wide portrait/narrative column.
 */
export function AboutSection() {
  const profile = getProfile();

  return (
    <section
      id="about"
      className="relative min-h-screen py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      aria-label="About"
    >
      <RegistrationMark position="top-right" />

      {/* Background section number */}
      <SectionNumber number="02" variant="background" className="top-12 right-8 md:right-16" />

      {/* Section label */}
      <div className="mb-16 md:mb-24">
        <SectionNumber number="02" />
        <h2 className="editorial-heading text-h2 md:text-h1 mt-4">
          <TextReveal variant="word">The Profile</TextReveal>
        </h2>
        <DrawLine className="mt-6 max-w-[120px]" color="var(--color-accent-red)" thickness={2} />
      </div>

      {/* Magazine spread layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        {/* Left column — Quick facts (narrow) */}
        <div className="lg:col-span-3 space-y-8">
          <StaggerChildren staggerDelay={0.1}>
            {profile.quickFacts.map((fact) => (
              <div key={fact.label} className="border-b border-line pb-4">
                <span className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                  {fact.label}
                </span>
                <span className="font-sans text-body text-ink font-medium">
                  {fact.value}
                </span>
              </div>
            ))}
          </StaggerChildren>

          {/* Download Resume Link */}
          <div className="pt-2">
            <a
              href={profile.resumeUrl || "/resume.pdf"}
              download="Punith_Sai_Guttula_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-ink bg-ink text-paper px-4 py-2.5 text-xs font-mono tracking-wider hover:bg-charcoal transition-colors duration-300 w-full justify-center"
            >
              <Download size={14} />
              DOWNLOAD RESUME (PDF)
            </a>
          </div>

          {/* Passport photo */}
          <div className="relative w-28 h-36 bg-cream mt-8 hidden lg:block overflow-hidden border border-line shadow-sm">
            <img
              src={profile.passportImage}
              alt="ID Photo"
              className="w-full h-full object-cover object-top"
            />
            {/* Crop marks */}
            <div className="absolute -top-2 -left-2 w-3 h-px bg-ink/30" />
            <div className="absolute -top-2 -left-2 h-3 w-px bg-ink/30" />
            <div className="absolute -top-2 -right-2 w-3 h-px bg-ink/30" />
            <div className="absolute -top-2 -right-2 h-3 w-px bg-ink/30" />
            <div className="absolute -bottom-2 -left-2 w-3 h-px bg-ink/30" />
            <div className="absolute -bottom-2 -left-2 h-3 w-px bg-ink/30" />
            <div className="absolute -bottom-2 -right-2 w-3 h-px bg-ink/30" />
            <div className="absolute -bottom-2 -right-2 h-3 w-px bg-ink/30" />
          </div>
        </div>

        {/* Center column — Portrait + Bio (wide) */}
        <div className="lg:col-span-5">
          {/* Large portrait */}
          <ImageReveal direction="up" className="mb-10">
            <div className="relative aspect-[4/5] bg-warm overflow-hidden border border-line shadow-md">
              <img
                src={profile.portraitImage}
                alt={profile.name}
                className="w-full h-full object-cover object-center"
              />
            </div>
          </ImageReveal>

          {/* Bio paragraphs */}
          <div className="space-y-5">
            {profile.bio.map((paragraph, i) => (
              <p
                key={i}
                className="editorial-body text-charcoal"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Right column — Mission & Philosophy */}
        <div className="lg:col-span-4 space-y-12">
          {/* Mission as pull quote */}
          <div className="relative pl-6 border-l-2 border-accent-red">
            <span className="editorial-mono text-micro text-accent-red tracking-widest block mb-3">
              MISSION
            </span>
            <blockquote className="editorial-pullquote text-h5 text-charcoal">
              &ldquo;{profile.mission}&rdquo;
            </blockquote>
          </div>

          {/* Philosophy as handwritten note */}
          <div className="relative mt-12">
            <HandwrittenNote rotation={-2} color="ink">
              &ldquo;{profile.philosophy}&rdquo;
            </HandwrittenNote>
          </div>

          {/* Mini timeline */}
          <div className="relative pl-6 border-l border-line mt-12 space-y-6">
            <span className="editorial-mono text-micro text-muted tracking-widest block mb-4">
              TIMELINE
            </span>
            {[
              { year: "2019", label: "Intermediate M.P.C at Sasi Junior College" },
              { year: "2021", label: "Joined Sri Vasavi Engineering College (B.Tech CSE)" },
              { year: "2024", label: "Built POS, AI Chatbot & ML Capstone Projects" },
              { year: "2025", label: "SAP Security Intern at Altzen Technologies" },
              { year: "2025", label: "Graduated with B.Tech in CS & Engineering" },
            ].map((item) => (
              <div key={item.year} className="relative">
                <div className="absolute -left-[25px] w-2 h-2 rounded-full bg-ink/30" />
                <span className="font-mono text-tiny text-accent-red font-bold">{item.year}</span>
                <p className="text-small text-stone">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Margin note */}
      <MarginNote side="left" className="top-1/2">
        This section tells you who I am beyond the code.
      </MarginNote>
    </section>
  );
}
