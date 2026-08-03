"use client";

import { getProfile } from "@/lib/content";
import { TextReveal } from "@/components/animations/TextReveal";
import { DrawLine } from "@/components/animations/DrawLine";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { SectionNumber } from "@/components/editorial/SectionNumber";
import { RegistrationMark } from "@/components/editorial/RegistrationMark";
import { Barcode } from "@/components/editorial/Barcode";
import { IssueLabel } from "@/components/editorial/IssueLabel";
import { Coordinates } from "@/components/editorial/Coordinates";
import { Mail, MapPin } from "lucide-react";

// Inline SVG components for social brand icons
function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function TwitterIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  );
}

function InstagramIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

const socialIcons: Record<string, React.ElementType> = {
  GitHub: GithubIcon,
  LinkedIn: LinkedinIcon,
  Twitter: TwitterIcon,
  Instagram: InstagramIcon,
};

/**
 * Contact Section — Editorial ending / colophon.
 * Massive typography, generous whitespace, editorial sign-off.
 */
export function ContactSection() {
  const profile = getProfile();

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-between py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden"
      aria-label="Contact"
    >
      <RegistrationMark position="top-left" />
      <RegistrationMark position="top-right" />
      <RegistrationMark position="bottom-left" />
      <RegistrationMark position="bottom-right" />

      <SectionNumber number="10" variant="background" className="top-20 left-8 md:left-16" />

      {/* Main content */}
      <div className="flex-1 flex flex-col justify-center max-w-4xl">
        <SectionNumber number="10" />

        <h2 className="editorial-display text-h1 md:text-display lg:text-mega mt-6 tracking-[-0.04em] leading-[0.85]">
          <TextReveal variant="word" staggerDelay={0.08}>
            {"LET'S WORK TOGETHER."}
          </TextReveal>
        </h2>

        <DrawLine className="mt-8 max-w-[200px]" color="var(--color-accent-red)" thickness={2} delay={0.6} />

        <p className="editorial-body text-stone max-w-xl mt-8 mb-12">
          Whether you have a project in mind, want to collaborate, or just want to say hello —
          I&apos;d love to hear from you.
        </p>

        {/* Email — large clickable */}
        <StaggerChildren delay={0.4}>
          <a
            href={`mailto:${profile.email}`}
            className="group inline-flex items-center gap-3 font-display text-h3 md:text-h2 font-bold tracking-tight hover:text-accent-red transition-colors duration-300"
          >
            <Mail size={24} className="text-muted group-hover:text-accent-red transition-colors" />
            {profile.email}
          </a>
        </StaggerChildren>

        {/* Social links */}
        <StaggerChildren delay={0.6} staggerDelay={0.1} className="flex flex-wrap items-center gap-6 mt-10">
          {profile.socials.map((social) => {
            const Icon = socialIcons[social.platform] || Mail;
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 text-stone hover:text-ink transition-colors duration-300"
              >
                <Icon size={16} />
                <span className="font-sans text-small font-medium border-b border-transparent group-hover:border-ink transition-colors duration-300">
                  {social.label}
                </span>
              </a>
            );
          })}
        </StaggerChildren>

        {/* Location */}
        <div className="flex items-center gap-2 mt-8 text-stone">
          <MapPin size={14} />
          <span className="font-sans text-small">
            {profile.location.city}, {profile.location.country}
          </span>
          <span className="mx-2 text-muted">·</span>
          <Coordinates
            lat={profile.location.coordinates.lat}
            lng={profile.location.coordinates.lng}
          />
        </div>

        {/* Availability */}
        <div className="flex items-center gap-2 mt-6">
          <span className="w-2 h-2 rounded-full bg-accent-green animate-pulse-soft" />
          <span className="editorial-mono text-tiny text-muted tracking-widest">
            {profile.availability.message}
          </span>
        </div>
      </div>

      {/* Footer / Colophon */}
      <div className="border-t border-line pt-8 mt-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <div className="space-y-2">
          <IssueLabel volume={1} issue={1} />
          <p className="editorial-mono text-micro text-muted tracking-widest">
            DESIGNED & BUILT BY {profile.name.toUpperCase()} — {new Date().getFullYear()}
          </p>
          <p className="editorial-mono text-micro text-muted tracking-widest">
            BUILT WITH NEXT.JS, REACT, TAILWIND CSS, AND FRAMER MOTION
          </p>
        </div>

        <div className="flex items-end gap-6">
          <Barcode code={`PORTFOLIO-${new Date().getFullYear()}`} />
          <span className="editorial-mono text-micro text-muted tracking-widest">
            END OF ISSUE
          </span>
        </div>
      </div>
    </section>
  );
}
