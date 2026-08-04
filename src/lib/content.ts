import type {
  Profile,
  Project,
  ExperienceEntry,
  SkillCategory,
  Education,
  JournalPost,
  MusicData,
  Playlist,
  NowPlaying,
} from "@/types";

import profileData from "@/content/profile.json";
import projectsData from "@/content/projects.json";
import experienceData from "@/content/experience.json";
import skillsData from "@/content/skills.json";
import educationData from "@/content/education.json";
import journalData from "@/content/journal.json";
import playlistsData from "@/content/playlists.json";

const JOURNAL_STORAGE_KEY = "punith_journal_posts";
const MUSIC_STORAGE_KEY = "punith_music_data";

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

/** Get all journal posts (merging default JSON + localStorage in browser) */
export function getJournalPosts(): JournalPost[] {
  let posts: JournalPost[] = journalData as JournalPost[];
  const sampleSlugs = [
    "art-of-invisible-software",
    "why-typescript",
    "building-production-django-systems",
    "interstellar-review",
    "mr-robot-review",
    "oppenheimer-review",
  ];

  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(JOURNAL_STORAGE_KEY);
      if (stored) {
        const parsed: JournalPost[] = JSON.parse(stored);
        // Filter out legacy sample posts from local storage
        posts = parsed.filter((p) => !sampleSlugs.includes(p.slug));
        // If after filtering empty, fall back to current journalData
        if (posts.length === 0) {
          posts = journalData as JournalPost[];
          localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(posts));
        }
      }
    } catch {
      // Fallback to default JSON
    }
  }

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

/** Save journal posts to localStorage and disk via API route */
export async function saveJournalPosts(posts: JournalPost[]): Promise<{ syncedToGithub: boolean; githubError?: string }> {
  if (typeof window !== "undefined") {
    localStorage.setItem(JOURNAL_STORAGE_KEY, JSON.stringify(posts));
    try {
      const res = await fetch("/api/admin/journal", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(posts),
      });
      const data = await res.json();
      return { syncedToGithub: !!data.syncedToGithub, githubError: data.githubError };
    } catch (err: any) {
      return { syncedToGithub: false, githubError: err?.message || String(err) };
    }
  }
  return { syncedToGithub: false, githubError: "Not in browser environment" };
}

/** Get music data (merging default JSON + localStorage in browser) */
export function getPlaylists(): MusicData {
  let music: MusicData = playlistsData as MusicData;

  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(MUSIC_STORAGE_KEY);
      if (stored) {
        music = JSON.parse(stored);
      }
    } catch {
      // Fallback to default JSON
    }
  }

  return music;
}

/** Save music data to localStorage and disk via API route */
export async function savePlaylists(data: MusicData): Promise<{ syncedToGithub: boolean; githubError?: string }> {
  if (typeof window !== "undefined") {
    localStorage.setItem(MUSIC_STORAGE_KEY, JSON.stringify(data));
    try {
      const res = await fetch("/api/admin/playlists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const resData = await res.json();
      return { syncedToGithub: !!resData.syncedToGithub, githubError: resData.githubError };
    } catch (err: any) {
      return { syncedToGithub: false, githubError: err?.message || String(err) };
    }
  }
  return { syncedToGithub: false, githubError: "Not in browser environment" };
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
