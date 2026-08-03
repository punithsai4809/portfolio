"use client";

import { useState, useEffect } from "react";
import { getPlaylists } from "@/lib/content";
import { formatAppleMusicEmbedUrl } from "@/lib/utils";
import { TextReveal } from "@/components/animations/TextReveal";
import { DrawLine } from "@/components/animations/DrawLine";
import { StaggerChildren } from "@/components/animations/StaggerChildren";
import { SectionNumber } from "@/components/editorial/SectionNumber";
import { RegistrationMark } from "@/components/editorial/RegistrationMark";
import { HandwrittenNote } from "@/components/editorial/HandwrittenNote";
import type { MusicData } from "@/types";
import { Music, Disc3 } from "lucide-react";

/**
 * Music Section — "The Listening Room" editorial layout.
 * Vinyl liner notes aesthetic with Apple Music embeds.
 */
export function MusicSection() {
  const [music, setMusic] = useState<MusicData>(getPlaylists());

  useEffect(() => {
    setMusic(getPlaylists());
  }, []);

  const { playlists, nowPlaying } = music;

  return (
    <section
      id="music"
      className="relative py-24 md:py-32 px-6 md:px-12 lg:px-20 overflow-hidden bg-warm"
      aria-label="Music"
    >
      <RegistrationMark position="top-right" />
      <RegistrationMark position="bottom-left" />

      <SectionNumber number="09" variant="background" className="top-8 right-8 md:right-16" />

      {/* Section header */}
      <div className="mb-16 md:mb-24">
        <SectionNumber number="09" />
        <h2 className="editorial-display text-h1 md:text-display mt-4 tracking-[-0.04em]">
          <TextReveal variant="word">THE LISTENING ROOM</TextReveal>
        </h2>
        <DrawLine className="mt-6 max-w-[140px]" color="var(--color-accent-red)" thickness={2} />
      </div>

      {/* Now Playing hero */}
      <div className="relative mb-16 md:mb-24 max-w-3xl">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex gap-[2px] items-end h-4">
            {[0.6, 1, 0.4, 0.8, 0.5].map((h, i) => (
              <div
                key={i}
                className="w-[3px] bg-accent-red rounded-full animate-eq-bar"
                style={{
                  height: `${h * 16}px`,
                  animationDelay: `${i * 0.15}s`,
                }}
              />
            ))}
          </div>
          <span className="editorial-mono text-micro text-accent-red tracking-widest font-bold">
            NOW PLAYING
          </span>
        </div>

        <h3 className="editorial-heading text-h2 md:text-h1 leading-tight">
          {nowPlaying.track}
        </h3>
        <p className="font-sans text-lead text-stone mt-1">
          {nowPlaying.artist} — <span className="italic">{nowPlaying.album}</span>
        </p>
      </div>

      {/* Playlists grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 md:gap-12">
        {playlists.map((playlist, i) => (
          <StaggerChildren key={playlist.title} delay={i * 0.15}>
            <div
              className="group relative bg-paper border border-line p-6 hover:border-ink/30 transition-all duration-300 hover:-translate-y-1"
              style={{ transform: `rotate(${(i - 1) * 0.5}deg)` }}
            >
              {/* Playlist header */}
              <div className="flex items-center gap-2 mb-3">
                <Music size={14} className="text-muted" />
                <span className="editorial-mono text-micro text-muted tracking-widest">
                  {playlist.mood.toUpperCase()} / {playlist.trackCount} TRACKS
                </span>
              </div>

              <h4 className="editorial-heading text-h4 leading-tight mb-2">
                {playlist.title}
              </h4>

              <p className="text-small text-stone leading-relaxed mb-6 italic font-serif">
                {playlist.description}
              </p>

              {/* Apple Music embed */}
              <div className="relative w-full h-[175px] mb-4 overflow-hidden rounded-sm bg-cream">
                <iframe
                  allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
                  height="175"
                  style={{ width: "100%", overflow: "hidden", borderRadius: "4px" }}
                  sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
                  src={formatAppleMusicEmbedUrl(playlist.embedUrl)}
                  title={`Apple Music: ${playlist.title}`}
                  loading="lazy"
                />
              </div>

              {/* Platform & update info */}
              <div className="flex items-center justify-between">
                <span className="editorial-mono text-micro text-muted tracking-widest">
                  APPLE MUSIC
                </span>
                <span className="editorial-mono text-micro text-muted tracking-widest">
                  Updated {new Date(playlist.updatedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                </span>
              </div>
            </div>
          </StaggerChildren>
        ))}
      </div>

      {/* Decorative vinyl record */}
      <div className="absolute -bottom-20 -right-20 opacity-[0.03] pointer-events-none hidden xl:block" aria-hidden="true">
        <Disc3 size={300} strokeWidth={0.5} />
      </div>

      {/* Handwritten annotation */}
      <div className="absolute top-40 right-12 hidden xl:block">
        <HandwrittenNote rotation={2} color="ink">
          press play ↓
        </HandwrittenNote>
      </div>
    </section>
  );
}
