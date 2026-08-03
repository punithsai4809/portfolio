import type { MetadataRoute } from "next";
import { getAllProjectSlugs, getAllJournalSlugs } from "@/lib/content";

const BASE_URL = "https://punith.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const projectUrls = getAllProjectSlugs().map((slug) => ({
    url: `${BASE_URL}/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const journalUrls = getAllJournalSlugs().map((slug) => ({
    url: `${BASE_URL}/journal/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/journal`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.7,
    },
    ...projectUrls,
    ...journalUrls,
  ];
}
