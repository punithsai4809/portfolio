import dynamic from "next/dynamic";

// Dynamic imports for code splitting — each section loads independently
const HeroSection = dynamic(
  () => import("@/components/sections/HeroSection").then((mod) => ({ default: mod.HeroSection })),
  { ssr: true }
);
const AboutSection = dynamic(
  () => import("@/components/sections/AboutSection").then((mod) => ({ default: mod.AboutSection })),
  { ssr: true }
);
const ProjectsSection = dynamic(
  () => import("@/components/sections/ProjectsSection").then((mod) => ({ default: mod.ProjectsSection })),
  { ssr: true }
);
const SkillsSection = dynamic(
  () => import("@/components/sections/SkillsSection").then((mod) => ({ default: mod.SkillsSection })),
  { ssr: true }
);
const ThoughtsSection = dynamic(
  () => import("@/components/sections/ThoughtsSection").then((mod) => ({ default: mod.ThoughtsSection })),
  { ssr: true }
);
const MovieReviewsSection = dynamic(
  () => import("@/components/sections/MovieReviewsSection").then((mod) => ({ default: mod.MovieReviewsSection })),
  { ssr: true }
);
const ExperienceSection = dynamic(
  () => import("@/components/sections/ExperienceSection").then((mod) => ({ default: mod.ExperienceSection })),
  { ssr: true }
);
const EducationSection = dynamic(
  () => import("@/components/sections/EducationSection").then((mod) => ({ default: mod.EducationSection })),
  { ssr: true }
);
const MusicSection = dynamic(
  () => import("@/components/sections/MusicSection").then((mod) => ({ default: mod.MusicSection })),
  { ssr: true }
);
const ContactSection = dynamic(
  () => import("@/components/sections/ContactSection").then((mod) => ({ default: mod.ContactSection })),
  { ssr: true }
);

/**
 * Main Editorial Documentary Page.
 * 10 distinct sections composed as a single scrolling narrative.
 */
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ThoughtsSection />
      <MovieReviewsSection />
      <ExperienceSection />
      <EducationSection />
      <MusicSection />
      <ContactSection />
    </>
  );
}
