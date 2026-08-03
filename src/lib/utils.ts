import { type ClassValue, clsx } from "clsx";

/**
 * Conditionally join class names.
 * Uses clsx for conditional class merging.
 */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

/**
 * Format a date string into editorial format.
 * e.g. "2026-07-15" → "July 15, 2026"
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * Format date into short editorial format.
 * e.g. "2026-07-15" → "Jul 2026"
 */
export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
  });
}

/**
 * Calculate reading time from text content.
 * Average reading speed: 200 words per minute.
 */
export function calculateReadingTime(text: string): string {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

/**
 * Generate a slug from a string.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

/**
 * Clamp a value between min and max.
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Linear interpolation.
 */
export function lerp(start: number, end: number, factor: number): number {
  return start + (end - start) * factor;
}

/**
 * Map a value from one range to another.
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

/**
 * Normalizes Apple Music URLs into valid embed URLs.
 * Handles:
 * 1. Standard web link: https://music.apple.com/... -> https://embed.music.apple.com/...
 * 2. Full iframe snippet: <iframe src="..."> -> extracts src
 * 3. Already valid embed link: https://embed.music.apple.com/... -> leaves unchanged
 */
export function formatAppleMusicEmbedUrl(url: string): string {
  if (!url) return "";
  let cleanUrl = url.trim();

  // Extract src if full iframe tag was pasted
  const iframeMatch = cleanUrl.match(/src=["']([^"']+)["']/);
  if (iframeMatch) {
    cleanUrl = iframeMatch[1];
  }

  // Convert music.apple.com/ to embed.music.apple.com/
  if (cleanUrl.startsWith("https://music.apple.com/")) {
    cleanUrl = cleanUrl.replace("https://music.apple.com/", "https://embed.music.apple.com/");
  }

  return cleanUrl;
}
