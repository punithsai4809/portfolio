"use client";

import { getEducation } from "@/lib/content";
import { TextReveal } from "@/components/animations/TextReveal";
import { DrawLine } from "@/components/animations/DrawLine";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { SectionNumber } from "@/components/editorial/SectionNumber";
import { RegistrationMark } from "@/components/editorial/RegistrationMark";

/**
 * Education Section — Magazine editorial layout.
 * Large year, degree in display serif, certificates as stamps.
 */
export function EducationSection() {
  const education = getEducation();

  return (
    <section
      id="education"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      aria-label="Education"
    >
      <RegistrationMark position="top-left" />

      <SectionNumber number="08" variant="background" className="top-12 right-8 md:right-16" />

      {/* Section header */}
      <div className="mb-16 md:mb-24">
        <SectionNumber number="08" />
        <h2 className="editorial-display text-h1 md:text-display mt-4 tracking-[-0.04em]">
          <TextReveal variant="word">EDUCATION</TextReveal>
        </h2>
        <DrawLine className="mt-6 max-w-[100px]" color="var(--color-accent-red)" thickness={2} />
      </div>

      {/* Degrees */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-20">
        {education.degrees.map((degree, i) => (
          <StaggerChildren key={i} className="lg:col-span-8">
            <div className="relative">
              {/* Large year */}
              <span
                className="font-display text-mega font-black text-ink/[0.05] leading-none absolute -top-12 -left-4 select-none pointer-events-none"
                aria-hidden="true"
              >
                {degree.endYear}
              </span>

              <div className="relative z-10">
                <span className="editorial-mono text-micro text-accent-red tracking-widest">
                  {degree.startYear} — {degree.endYear}
                </span>

                <h3 className="editorial-heading text-h3 md:text-h2 mt-2 leading-tight">
                  {degree.degree}
                </h3>

                <p className="font-serif text-lead text-stone italic mt-1">
                  {degree.field}
                </p>

                <p className="font-sans text-body text-charcoal mt-2">
                  {degree.institution}
                </p>

                <DrawLine color="var(--color-line)" thickness={1} className="my-6 max-w-[200px]" />

                {/* Achievements */}
                <ul className="space-y-2">
                  {degree.achievements.map((achievement, j) => (
                    <li key={j} className="flex items-start gap-2 text-body text-charcoal">
                      <span className="text-accent-yellow mt-1.5 text-[10px]">★</span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </StaggerChildren>
        ))}
      </div>

      {/* Certificates */}
      {education.certificates.length > 0 && (
        <div>
          <span className="editorial-mono text-micro text-muted tracking-widest block mb-8">
            CERTIFICATIONS & CREDENTIALS
          </span>

          <StaggerChildren staggerDelay={0.12} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {education.certificates.map((cert) => (
              <div
                key={cert.name}
                className="group relative border border-line p-6 hover:border-ink/30 transition-all duration-300 hover:-translate-y-1"
              >
                {/* Year stamp */}
                <span className="absolute top-3 right-3 font-display text-h5 font-black text-ink/10">
                  {cert.year}
                </span>

                <span className="editorial-mono text-micro text-accent-blue tracking-widest block mb-2">
                  {cert.issuer}
                </span>

                <h4 className="font-sans text-body font-medium text-ink leading-snug">
                  {cert.name}
                </h4>

                {cert.url && (
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-mono text-micro text-muted tracking-widest mt-3 inline-block hover:text-accent-red transition-colors"
                  >
                    VERIFY →
                  </a>
                )}
              </div>
            ))}
          </StaggerChildren>
        </div>
      )}
    </section>
  );
}
