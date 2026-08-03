// ============================================================
// Editorial Documentary — TypeScript Interfaces
// ============================================================

// --- Profile ---
export interface SocialLink {
  platform: string;
  url: string;
  label: string;
}

export interface Statistic {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface QuickFact {
  label: string;
  value: string;
}

export interface Profile {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  headline: string;
  tagline: string;
  location: {
    city: string;
    country: string;
    coordinates: { lat: string; lng: string };
  };
  email: string;
  bio: string[];
  mission: string;
  philosophy: string;
  availability: {
    status: "available" | "limited" | "unavailable";
    message: string;
  };
  currentRole: {
    title: string;
    company: string;
  };
  quickFacts: QuickFact[];
  statistics: Statistic[];
  socials: SocialLink[];
  portraitImage: string;
  passportImage: string;
  signatureImage: string;
  resumeUrl: string;
}

// --- Projects ---
export interface ProjectMetric {
  label: string;
  value: number;
  suffix?: string;
  prefix?: string;
}

export interface ProjectImage {
  src: string;
  alt: string;
  caption?: string;
}

export interface Project {
  number: string;
  title: string;
  slug: string;
  tagline: string;
  overview: string;
  problem: string;
  research: string;
  solution: string;
  architecture: string;
  challenges: string[];
  results: string;
  lessons: string[];
  futureImprovements: string[];
  techStack: string[];
  timeline: string;
  role: string;
  client?: string;
  liveUrl?: string;
  githubUrl?: string;
  images: {
    hero: string;
    screenshots: ProjectImage[];
  };
  metrics: ProjectMetric[];
  codeSnippet?: {
    language: string;
    code: string;
    caption: string;
  };
}

// --- Experience ---
export interface ExperienceEntry {
  company: string;
  role: string;
  period: string;
  startYear: string;
  endYear: string;
  location: string;
  description: string;
  responsibilities: string[];
  impact: string[];
  technologies: string[];
  logo?: string;
  annotation?: string;
}

// --- Skills ---
export interface SkillCategory {
  name: string;
  icon: string;
  description: string;
  skills: {
    name: string;
    level: "expert" | "advanced" | "intermediate" | "learning";
  }[];
}

// --- Education ---
export interface EducationEntry {
  institution: string;
  degree: string;
  field: string;
  year: string;
  startYear: string;
  endYear: string;
  achievements: string[];
  logo?: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  year: string;
  url?: string;
  logo?: string;
}

export interface Education {
  degrees: EducationEntry[];
  certificates: Certificate[];
}

// --- Journal ---
export type JournalCategory = "thought" | "movie-review" | "essay" | "note";

export interface JournalPost {
  title: string;
  slug: string;
  date: string;
  category: JournalCategory;
  tags: string[];
  excerpt: string;
  coverImage?: string;
  rating?: number; // 1-5, for movie reviews
  director?: string;
  year?: string;
  genre?: string;
  verdict?: string;
  readingTime?: string;
  content: string;
}

// --- Music / Playlists ---
export type MusicPlatform = "apple-music" | "spotify" | "soundcloud";

export interface Playlist {
  title: string;
  description: string;
  platform: MusicPlatform;
  embedUrl: string;
  coverImage?: string;
  trackCount: number;
  mood: string;
  updatedAt: string;
}

export interface NowPlaying {
  track: string;
  artist: string;
  album: string;
}

export interface MusicData {
  playlists: Playlist[];
  nowPlaying: NowPlaying;
}

// --- Navigation ---
export interface NavItem {
  label: string;
  sectionId: string;
  number: string;
}

// --- Animation ---
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: string;
  threshold?: number;
}
