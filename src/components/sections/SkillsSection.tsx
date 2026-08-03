"use client";

import { getSkills } from "@/lib/content";
import { TextReveal } from "@/components/animations/TextReveal";
import { DrawLine } from "@/components/animations/DrawLine";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { SectionNumber } from "@/components/editorial/SectionNumber";
import { RegistrationMark } from "@/components/editorial/RegistrationMark";
import { HandwrittenNote } from "@/components/editorial/HandwrittenNote";
import {
  Code2, Monitor, Server, Database, Cloud, Brain, Wrench,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Code2, Monitor, Server, Database, Cloud, Brain, Wrench,
};

const levelLabels: Record<string, string> = {
  expert: "Expert",
  advanced: "Advanced",
  intermediate: "Intermediate",
  learning: "Learning",
};

const levelColors: Record<string, string> = {
  expert: "bg-ink text-paper",
  advanced: "bg-charcoal text-paper",
  intermediate: "bg-stone text-paper",
  learning: "border border-stone text-stone",
};

/**
 * Skills Section — Technology ecosystem infographic.
 * No progress bars. Labeled clusters like a scientific taxonomy.
 */
export function SkillsSection() {
  const skills = getSkills();

  return (
    <section
      id="skills"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden bg-warm"
      aria-label="Technology Ecosystem"
    >
      <RegistrationMark position="top-left" />
      <RegistrationMark position="bottom-right" />

      {/* Background number */}
      <SectionNumber number="04" variant="background" className="top-8 left-8" />

      {/* Section header */}
      <div className="mb-16 md:mb-24">
        <SectionNumber number="04" />
        <h2 className="editorial-display text-h1 md:text-display mt-4 tracking-[-0.04em]">
          <TextReveal variant="word">TECHNOLOGY ECOSYSTEM</TextReveal>
        </h2>
        <DrawLine className="mt-6 max-w-[160px]" color="var(--color-accent-red)" thickness={2} />
        <p className="editorial-body text-stone max-w-xl mt-6">
          Not a list of logos. A map of how I think about technology — what I reach for, and why.
        </p>
      </div>

      {/* Infographic grid — organic layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-16">
        {skills.map((category, i) => {
          const IconComponent = iconMap[category.icon] || Code2;
          return (
            <StaggerChildren key={category.name} delay={i * 0.1} className="relative">
              <div className="group">
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 border border-ink/20 flex items-center justify-center group-hover:bg-ink group-hover:text-paper transition-colors duration-300">
                    <IconComponent size={18} />
                  </div>
                  <div>
                    <h3 className="font-display text-h5 font-bold tracking-tight">{category.name}</h3>
                    <p className="editorial-mono text-micro text-muted tracking-widest">{category.skills.length} TECHNOLOGIES</p>
                  </div>
                </div>

                <p className="text-small text-stone mb-5 italic font-serif">{category.description}</p>

                <DrawLine color="var(--color-line)" thickness={1} className="mb-5" delay={0.3 + i * 0.1} />

                {/* Skills cluster */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <span
                      key={skill.name}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono tracking-wide ${levelColors[skill.level]} transition-transform duration-200 hover:scale-105`}
                      title={levelLabels[skill.level]}
                    >
                      {skill.name}
                      {skill.level === "expert" && <span className="text-accent-yellow text-[10px]">★</span>}
                    </span>
                  ))}
                </div>
              </div>
            </StaggerChildren>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-16 md:mt-24 flex flex-wrap items-center gap-6">
        <span className="editorial-mono text-micro text-muted tracking-widest">LEGEND:</span>
        {Object.entries(levelLabels).map(([key, label]) => (
          <div key={key} className="flex items-center gap-2">
            <span className={`inline-block w-3 h-3 ${levelColors[key]}`} />
            <span className="editorial-mono text-micro text-muted tracking-widest">{label}</span>
          </div>
        ))}
      </div>

      {/* Handwritten annotation */}
      <div className="absolute bottom-16 right-12 hidden xl:block">
        <HandwrittenNote rotation={3} color="blue">
          always learning something new ↗
        </HandwrittenNote>
      </div>
    </section>
  );
}
