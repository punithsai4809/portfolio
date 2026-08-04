import type {
  Profile,
  Project,
  ExperienceEntry,
  SkillCategory,
  Education,
  JournalPost,
  MusicData,
} from "@/types";

import profileData from "@/content/profile.json";
import projectsData from "@/content/projects.json";
import experienceData from "@/content/experience.json";
import skillsData from "@/content/skills.json";
import educationData from "@/content/education.json";
import journalData from "@/content/journal.json";
import playlistsData from "@/content/playlists.json";

export function getProfile(): Profile {
  return profileData as Profile;
}

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectBySlug(slug: string): Project | undefined {
  return (projectsData as Project[]).find((p) => p.slug === slug);
}

export function getExperience(): ExperienceEntry[] {
  return experienceData as ExperienceEntry[];
}

export function getSkills(): SkillCategory[] {
  return skillsData as SkillCategory[];
}

export function getEducation(): Education {
  return educationData as Education;
}

/** Get all journal posts */
export function getJournalPosts(): JournalPost[] {
  const posts: JournalPost[] = journalData as JournalPost[];
  return [...posts].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export function getJournalPostBySlug(slug: string): JournalPost | undefined {
  return getJournalPosts().find((p) => p.slug === slug);
}

export function getJournalPostsByCategory(category: string): JournalPost[] {
  return getJournalPosts().filter((p) => p.category === category);
}

/** Get music data */
export function getPlaylists(): MusicData {
  return playlistsData as MusicData;
}

export function getJournalCategories(): string[] {
  const categories = new Set(getJournalPosts().map((p) => p.category));
  return Array.from(categories);
}

export function getAllProjectSlugs(): string[] {
  return (projectsData as Project[]).map((p) => p.slug);
}

export function getAllJournalSlugs(): string[] {
  return getJournalPosts().map((p) => p.slug);
}
