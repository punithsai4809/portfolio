"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { getProfile } from "@/lib/content";
import { TextReveal } from "@/components/animations/TextReveal";
import { CountUp } from "@/components/animations/CountUp";
import { ScrollIndicator } from "@/components/animations/ScrollIndicator";
import { RegistrationMark } from "@/components/editorial/RegistrationMark";
import { IssueLabel } from "@/components/editorial/IssueLabel";
import { HandwrittenNote } from "@/components/editorial/HandwrittenNote";
import { AnnotationArrow } from "@/components/editorial/AnnotationArrow";
import { Coordinates } from "@/components/editorial/Coordinates";
import { SectionNumber } from "@/components/editorial/SectionNumber";

/**
 * Hero Section — Full viewport editorial opening.
 * Offset asymmetric composition with massive typography.
 */
export function HeroSection() {
  const profile = getProfile();
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.5], [0, -100]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  const statusColor = {
    available: "bg-accent-green",
    limited: "bg-accent-yellow",
    unavailable: "bg-accent-red",
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-between overflow-hidden"
      aria-label="Introduction"
    >
      {/* Registration marks */}
      <RegistrationMark position="top-left" />
      <RegistrationMark position="top-right" />
      <RegistrationMark position="bottom-left" />
      <RegistrationMark position="bottom-right" />

      {/* Top bar — Issue label & availability */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 flex items-center justify-between px-6 md:px-12 lg:px-20 pt-6 md:pt-8"
      >
        <IssueLabel volume={1} issue={1} />

        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${statusColor[profile.availability.status]} animate-pulse-soft`} />
          <span className="editorial-mono text-micro text-muted tracking-widest">
            {profile.availability.message}
          </span>
        </div>
      </motion.div>

      {/* Main hero content */}
      <motion.div
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 py-12"
      >
        {/* Section identifier */}
        <div className="mb-6 md:mb-10">
          <SectionNumber number="01" />
        </div>

        {/* Main layout — asymmetric grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-end">
          {/* Text column — left heavy (7 cols) */}
          <div className="lg:col-span-7 space-y-6 md:space-y-8">
            {/* Current role label */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-px bg-ink" />
              <span className="editorial-mono text-tiny text-stone tracking-[0.15em]">
                {profile.currentRole.title} — {profile.currentRole.company}
              </span>
            </div>

            {/* Massive headline */}
            <h1 className="editorial-display text-display md:text-mega leading-[0.85] tracking-[-0.04em]">
              <TextReveal variant="word" staggerDelay={0.06}>
                {profile.headline}
              </TextReveal>
            </h1>

            {/* Tagline */}
            <motion.p
              className="text-lead text-stone max-w-xl leading-relaxed font-sans"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              {profile.tagline}
            </motion.p>

            {/* CTA row */}
            <motion.div
              className="flex flex-wrap items-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 bg-ink text-paper px-6 py-3 text-sm font-sans font-medium tracking-wide hover:bg-charcoal transition-colors duration-300"
              >
                Get in Touch
                <span className="text-xs">→</span>
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 border border-ink/20 px-6 py-3 text-sm font-sans font-medium tracking-wide hover:border-ink/60 transition-colors duration-300"
              >
                View Selected Work
              </a>
            </motion.div>
          </div>

          {/* Image column — right (5 cols) */}
          <div className="lg:col-span-5 relative">
            <motion.div
              style={{ scale: imageScale }}
              className="relative aspect-[3/4] max-h-[60vh] lg:max-h-[70vh] overflow-hidden bg-cream border border-line shadow-lg"
            >
              <img
                src={profile.portraitImage}
                alt={profile.name}
                className="w-full h-full object-cover object-center transform scale-105 hover:scale-110 transition-transform duration-700"
              />

              {/* Masking tape decoration */}
              <div
                className="absolute -top-2 left-1/2 -translate-x-1/2 w-20 h-6 bg-accent-yellow/30 rounded-[1px] z-10 pointer-events-none"
                style={{ transform: "translateX(-50%) rotate(-1.5deg)" }}
                aria-hidden="true"
              />
            </motion.div>

            {/* Handwritten note */}
            <motion.div
              className="absolute -bottom-4 -left-8 z-20 hidden md:block"
              initial={{ opacity: 0, rotate: -10 }}
              animate={{ opacity: 1, rotate: -4 }}
              transition={{ delay: 1.4, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <HandwrittenNote rotation={-4} color="red">
                ← that&apos;s me
              </HandwrittenNote>
            </motion.div>

            {/* Coordinates */}
            <div className="absolute -bottom-8 right-0 hidden md:block">
              <Coordinates
                lat={profile.location.coordinates.lat}
                lng={profile.location.coordinates.lng}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Bottom statistics bar */}
      <motion.div
        style={{ opacity: heroOpacity }}
        className="relative z-10 border-t border-line px-6 md:px-12 lg:px-20 py-6"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {profile.statistics.map((stat, i) => (
            <div key={stat.label} className="space-y-1">
              <div className="font-display text-h3 md:text-h2 font-black tracking-tight leading-none">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix || ""}
                  prefix={stat.prefix || ""}
                  duration={2 + i * 0.3}
                />
              </div>
              <span className="editorial-mono text-micro text-muted tracking-widest block">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20"
        style={{ opacity: heroOpacity }}
      >
        <ScrollIndicator />
      </motion.div>

      {/* Annotation arrow — hidden on mobile */}
      <motion.div
        className="absolute top-1/2 right-8 hidden xl:block"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <AnnotationArrow direction="down" label="scroll" />
      </motion.div>
    </section>
  );
}
