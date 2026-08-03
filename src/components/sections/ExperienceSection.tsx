"use client";

import { getExperience } from "@/lib/content";
import { TextReveal } from "@/components/animations/TextReveal";
import { DrawLine } from "@/components/animations/DrawLine";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { SectionNumber } from "@/components/editorial/SectionNumber";
import { RegistrationMark } from "@/components/editorial/RegistrationMark";
import { HandwrittenNote } from "@/components/editorial/HandwrittenNote";

/**
 * Experience Section — Vertical editorial timeline.
 * Alternating left/right entries with massive year numerals.
 */
export function ExperienceSection() {
  const experience = getExperience();

  return (
    <section
      id="experience"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden bg-warm"
      aria-label="Experience"
    >
      <RegistrationMark position="top-left" />
      <RegistrationMark position="bottom-right" />

      <SectionNumber number="07" variant="background" className="top-12 left-8 md:left-16" />

      {/* Section header */}
      <div className="mb-16 md:mb-24">
        <SectionNumber number="07" />
        <h2 className="editorial-display text-h1 md:text-display mt-4 tracking-[-0.04em]">
          <TextReveal variant="word">THE JOURNEY</TextReveal>
        </h2>
        <DrawLine className="mt-6 max-w-[120px]" color="var(--color-accent-red)" thickness={2} />
      </div>

      {/* Timeline */}
      <div className="relative max-w-5xl mx-auto">
        {/* Central line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-line md:-translate-x-1/2" />

        <div className="space-y-20 md:space-y-28">
          {experience.map((entry, i) => {
            const isEven = i % 2 === 0;
            return (
              <StaggerChildren key={i} delay={i * 0.15}>
                <div className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16`}>
                  {/* Timeline dot */}
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-ink rounded-full -translate-x-1/2 z-10 top-2" />

                  {/* Year numeral */}
                  <div
                    className={`absolute left-12 md:left-1/2 -top-8 font-display text-mega font-black text-ink/[0.04] leading-none select-none pointer-events-none ${
                      isEven ? "md:-translate-x-[120%]" : "md:translate-x-[20%]"
                    }`}
                    aria-hidden="true"
                  >
                    {entry.startYear}
                  </div>

                  {/* Content — alternating sides */}
                  <div className={`pl-12 md:pl-0 ${isEven ? "md:pr-16 md:text-right" : "md:col-start-2 md:pl-16"}`}>
                    {/* Period label */}
                    <span className="editorial-mono text-micro text-accent-red tracking-widest font-bold">
                      {entry.period}
                    </span>

                    {/* Company & Role */}
                    <h3 className="editorial-heading text-h4 md:text-h3 leading-tight mt-2">
                      {entry.role}
                    </h3>
                    <p className="font-sans text-lead text-stone mt-1">{entry.company}</p>

                    <DrawLine
                      color="var(--color-line)"
                      thickness={1}
                      className="my-4 max-w-[100px]"
                      delay={0.3 + i * 0.1}
                    />

                    {/* Description */}
                    <p className="text-body text-charcoal leading-relaxed mb-4">
                      {entry.description}
                    </p>

                    {/* Key responsibilities */}
                    <ul className="space-y-1.5 mb-4">
                      {entry.responsibilities.slice(0, 3).map((resp, j) => (
                        <li key={j} className="text-small text-stone flex items-start gap-2">
                          <span className="text-accent-red mt-1.5 text-[8px]">●</span>
                          {resp}
                        </li>
                      ))}
                    </ul>

                    {/* Impact */}
                    {entry.impact.length > 0 && (
                      <div className="mt-4 pl-4 border-l-2 border-accent-yellow">
                        <span className="editorial-mono text-micro text-accent-yellow tracking-widest block mb-1">
                          IMPACT
                        </span>
                        <p className="text-small text-charcoal italic">{entry.impact[0]}</p>
                      </div>
                    )}

                    {/* Handwritten annotation */}
                    {entry.annotation && (
                      <div className="mt-4">
                        <HandwrittenNote rotation={isEven ? -2 : 2} color="ink">
                          {entry.annotation}
                        </HandwrittenNote>
                      </div>
                    )}

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-1.5 mt-4">
                      {entry.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="editorial-mono text-micro text-muted tracking-widest border border-line px-2 py-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </StaggerChildren>
            );
          })}
        </div>
      </div>
    </section>
  );
}
