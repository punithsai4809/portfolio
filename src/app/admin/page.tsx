"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  getJournalPosts,
  saveJournalPosts,
  getPlaylists,
  savePlaylists,
} from "@/lib/content";
import { formatAppleMusicEmbedUrl } from "@/lib/utils";
import type { JournalPost, Playlist, MusicData, JournalCategory } from "@/types";
import { Lock, Unlock, ShieldAlert, ArrowLeft, Film, Music, Plus, Trash2, Edit3, Image as ImageIcon, CheckCircle, ExternalLink } from "lucide-react";

export default function AdminCMSPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);
  const [activeTab, setActiveTab] = useState<"reviews" | "music">("reviews");

  // Check session storage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("punith_cms_auth");
      if (stored === "true") {
        setIsAuthenticated(true);
      }
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Default passcode is punith2026
    if (passcode.trim() === "punith2026") {
      setIsAuthenticated(true);
      setAuthError(false);
      sessionStorage.setItem("punith_cms_auth", "true");
    } else {
      setAuthError(true);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("punith_cms_auth");
    setPasscode("");
  };

  // Journal / Reviews state
  const [posts, setPosts] = useState<JournalPost[]>([]);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);

  // Review Form state
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<JournalCategory>("movie-review");
  const [rating, setRating] = useState<number>(5);
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [genre, setGenre] = useState("");
  const [verdict, setVerdict] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [readingTime, setReadingTime] = useState("4 min read");

  // Music state
  const [musicData, setMusicData] = useState<MusicData>({
    playlists: [],
    nowPlaying: { track: "", artist: "", album: "" },
  });

  // Playlist Form state
  const [plTitle, setPlTitle] = useState("");
  const [plDescription, setPlDescription] = useState("");
  const [plMood, setPlMood] = useState("Focus");
  const [plTrackCount, setPlTrackCount] = useState(30);
  const [plEmbedUrl, setPlEmbedUrl] = useState("");

  // Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      setPosts(getJournalPosts());
      setMusicData(getPlaylists());
    }
  }, [isAuthenticated]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Reset Review Form
  const resetReviewForm = () => {
    setEditingSlug(null);
    setTitle("");
    setCategory("movie-review");
    setRating(5);
    setDirector("");
    setYear("");
    setGenre("");
    setVerdict("");
    setCoverImage("");
    setExcerpt("");
    setContent("");
    setTags("");
    setReadingTime("4 min read");
  };

  // Populate Review Form for editing
  const handleEditPost = (post: JournalPost) => {
    setEditingSlug(post.slug);
    setTitle(post.title);
    setCategory(post.category);
    setRating(post.rating || 5);
    setDirector(post.director || "");
    setYear(post.year || "");
    setGenre(post.genre || "");
    setVerdict(post.verdict || "");
    setCoverImage(post.coverImage || "");
    setExcerpt(post.excerpt);
    setContent(post.content);
    setTags(post.tags.join(", "));
    setReadingTime(post.readingTime || "4 min read");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Save / Update Review or Thought
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const slug = editingSlug || title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newPost: JournalPost = {
      title,
      slug,
      date: new Date().toISOString().split("T")[0],
      category,
      rating: category === "movie-review" ? Number(rating) : undefined,
      director: category === "movie-review" ? director : undefined,
      year: category === "movie-review" ? year : undefined,
      genre: category === "movie-review" ? genre : undefined,
      verdict: category === "movie-review" ? verdict : undefined,
      coverImage: coverImage.trim() || undefined,
      excerpt,
      content,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
      readingTime,
    };

    let updated: JournalPost[];
    if (editingSlug) {
      updated = posts.map((p) => (p.slug === editingSlug ? newPost : p));
    } else {
      updated = [newPost, ...posts];
    }

    setPosts(updated);
    const { syncedToGithub } = await saveJournalPosts(updated);
    if (syncedToGithub) {
      showToast("Saved & Synced to GitHub! Live worldwide in ~20s.");
    } else {
      showToast("Saved locally. (Check Vercel GITHUB_TOKEN to sync live)");
    }
    resetReviewForm();
  };

  // Delete Review
  const handleDeletePost = async (slug: string) => {
    const updated = posts.filter((p) => p.slug !== slug);
    setPosts(updated);
    const { syncedToGithub } = await saveJournalPosts(updated);
    if (syncedToGithub) {
      showToast("Entry deleted & Synced to GitHub!");
    } else {
      showToast("Entry deleted locally.");
    }
  };

  // Save Now Playing Track
  const handleSaveNowPlaying = async (e: React.FormEvent) => {
    e.preventDefault();
    const { syncedToGithub } = await savePlaylists(musicData);
    if (syncedToGithub) {
      showToast("Now Playing track updated & Synced to GitHub!");
    } else {
      showToast("Now Playing track updated locally.");
    }
  };

  // Add Playlist
  const handleAddPlaylist = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!plTitle.trim() || !plEmbedUrl.trim()) return;

    const normalizedUrl = formatAppleMusicEmbedUrl(plEmbedUrl);

    const newPlaylist: Playlist = {
      title: plTitle,
      description: plDescription,
      platform: "apple-music",
      embedUrl: normalizedUrl,
      trackCount: Number(plTrackCount),
      mood: plMood,
      updatedAt: new Date().toISOString().split("T")[0],
    };

    const updatedData: MusicData = {
      ...musicData,
      playlists: [newPlaylist, ...musicData.playlists],
    };

    setMusicData(updatedData);
    const { syncedToGithub } = await savePlaylists(updatedData);
    if (syncedToGithub) {
      showToast("Playlist added & Synced to GitHub! Live in ~20s.");
    } else {
      showToast("Playlist added locally.");
    }

    setPlTitle("");
    setPlDescription("");
    setPlEmbedUrl("");
  };

  // Delete Playlist
  const handleDeletePlaylist = async (index: number) => {
    const updatedData: MusicData = {
      ...musicData,
      playlists: musicData.playlists.filter((_, i) => i !== index),
    };
    setMusicData(updatedData);
    const { syncedToGithub } = await savePlaylists(updatedData);
    if (syncedToGithub) {
      showToast("Playlist removed & Synced to GitHub!");
    } else {
      showToast("Playlist removed locally.");
    }
  };

  // Render Passcode Lock Screen if unauthenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#121212] text-paper flex flex-col justify-center items-center px-6 relative">
        <div className="max-w-md w-full bg-charcoal border border-line/30 p-8 md:p-10 shadow-2xl relative">
          {/* Header */}
          <div className="flex flex-col items-center text-center mb-8">
            <div className="w-12 h-12 rounded-full bg-accent-red/20 text-accent-red flex items-center justify-center mb-4 border border-accent-red/40">
              <Lock size={20} />
            </div>
            <span className="editorial-mono text-micro text-accent-red tracking-widest block font-bold mb-1">
              RESTRICTED EDITORIAL ACCESS
            </span>
            <h1 className="editorial-display text-h3 tracking-tight text-paper">
              CMS PASSCODE LOCK
            </h1>
            <p className="editorial-mono text-micro text-muted tracking-wider mt-2">
              ENTER AUTHORIZED PASSCODE TO ACCESS CONTENT MANAGEMENT
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="editorial-mono text-micro text-stone tracking-widest block mb-2">
                ADMIN PASSCODE
              </label>
              <input
                type="password"
                required
                autoFocus
                placeholder="••••••••"
                value={passcode}
                onChange={(e) => {
                  setPasscode(e.target.value);
                  setAuthError(false);
                }}
                className="w-full bg-ink border border-stone/40 p-3.5 text-paper font-mono text-sm focus:outline-none focus:border-accent-yellow"
              />
            </div>

            {authError && (
              <div className="flex items-center gap-2 text-accent-red text-xs font-mono bg-accent-red/10 p-3 border border-accent-red/30">
                <ShieldAlert size={14} />
                Access Denied: Invalid Passcode
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-accent-red text-paper py-3.5 px-6 font-mono text-xs tracking-widest uppercase hover:bg-accent-red/90 transition-colors flex items-center justify-center gap-2 font-bold"
            >
              <Unlock size={14} />
              AUTHENTICATE ACCESS
            </button>
          </form>

          {/* Back link */}
          <div className="mt-8 text-center pt-6 border-t border-line/20">
            <Link
              href="/"
              className="inline-flex items-center gap-2 editorial-mono text-micro text-stone hover:text-paper transition-colors"
            >
              <ArrowLeft size={12} />
              Return to Public Site
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-paper text-ink px-6 md:px-12 lg:px-20 py-12">
      {/* Toast alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-ink text-paper px-6 py-3 shadow-xl flex items-center gap-3 font-sans text-sm font-medium border border-accent-yellow">
          <CheckCircle size={16} className="text-accent-yellow" />
          {toastMessage}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-line pb-8 mb-10 gap-4">
        <div>
          <div className="flex items-center gap-4 mb-3">
            <Link
              href="/"
              className="inline-flex items-center gap-2 editorial-mono text-tiny text-muted tracking-widest hover:text-ink transition-colors"
            >
              <ArrowLeft size={12} />
              BACK TO PORTFOLIO
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 editorial-mono text-micro text-accent-red tracking-widest border border-accent-red/30 px-2.5 py-0.5 hover:bg-accent-red hover:text-paper transition-colors"
              title="Lock CMS Session"
            >
              <Lock size={12} />
              LOCK CMS
            </button>
          </div>

          <h1 className="editorial-display text-h2 md:text-h1 tracking-tight">EDITORIAL CMS</h1>
          <p className="editorial-mono text-micro text-muted tracking-widest mt-1">
            MANAGE MOVIE REVIEWS, ESSAYS & APPLE MUSIC PLAYLISTS
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab("reviews")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono tracking-widest border transition-all ${
              activeTab === "reviews"
                ? "bg-ink text-paper border-ink"
                : "bg-paper text-stone border-line hover:border-ink"
            }`}
          >
            <Film size={14} />
            REVIEWS & THOUGHTS ({posts.length})
          </button>
          <button
            onClick={() => setActiveTab("music")}
            className={`inline-flex items-center gap-2 px-5 py-2.5 text-xs font-mono tracking-widest border transition-all ${
              activeTab === "music"
                ? "bg-ink text-paper border-ink"
                : "bg-paper text-stone border-line hover:border-ink"
            }`}
          >
            <Music size={14} />
            MUSIC PLAYLISTS ({musicData.playlists.length})
          </button>
        </div>
      </div>

      {/* TAB 1: MOVIE REVIEWS & THOUGHTS */}
      {activeTab === "reviews" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left column: Add/Edit Form */}
          <div className="lg:col-span-6 bg-warm p-8 border border-line">
            <div className="flex items-center justify-between mb-6">
              <h2 className="editorial-heading text-h3">
                {editingSlug ? "Edit Review / Entry" : "Add New Review or Thought"}
              </h2>
              {editingSlug && (
                <button
                  type="button"
                  onClick={resetReviewForm}
                  className="editorial-mono text-micro text-accent-red underline"
                >
                  Cancel Editing
                </button>
              )}
            </div>

            <form onSubmit={handleSaveReview} className="space-y-5">
              {/* Category */}
              <div>
                <label className="editorial-mono text-micro text-muted tracking-widest block mb-2">
                  CATEGORY *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as JournalCategory)}
                  className="w-full bg-paper border border-line p-3 font-sans text-sm text-ink focus:outline-none focus:border-ink"
                >
                  <option value="movie-review">🎬 Movie Review (Film Critique)</option>
                  <option value="thought">💡 Personal Thought / Reflection</option>
                  <option value="essay">✍️ Software Philosophy / Essay</option>
                  <option value="note">📝 Short Note</option>
                </select>
              </div>

              {/* Title */}
              <div>
                <label className="editorial-mono text-micro text-muted tracking-widest block mb-2">
                  TITLE *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Interstellar — A Love Letter to Time"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-paper border border-line p-3 font-sans text-sm text-ink focus:outline-none focus:border-ink"
                />
              </div>

              {/* Movie Specific Fields */}
              {category === "movie-review" && (
                <div className="space-y-4 pt-2 border-t border-line/60">
                  <span className="editorial-mono text-micro text-accent-yellow tracking-widest block font-bold">
                    FILM SPECIFIC DETAILS
                  </span>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                        RATING (1 - 5 STARS)
                      </label>
                      <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                        className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                      >
                        <option value={5}>★★★★★ (5 Stars - Masterpiece)</option>
                        <option value={4}>★★★★☆ (4 Stars - Great)</option>
                        <option value={3}>★★★☆☆ (3 Stars - Good)</option>
                        <option value={2}>★★☆☆☆ (2 Stars - Average)</option>
                        <option value={1}>★☆☆☆☆ (1 Star - Poor)</option>
                      </select>
                    </div>

                    <div>
                      <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                        RELEASE YEAR
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 2014"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                        DIRECTOR
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Christopher Nolan"
                        value={director}
                        onChange={(e) => setDirector(e.target.value)}
                        className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                      />
                    </div>

                    <div>
                      <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                        GENRE
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Sci-Fi / Drama"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                      VERDICT SUMMARY
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. A masterpiece of scientific awe and emotional gravity."
                      value={verdict}
                      onChange={(e) => setVerdict(e.target.value)}
                      className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                    />
                  </div>
                </div>
              )}

              {/* COVER IMAGE URL WITH LIVE PREVIEW */}
              <div className="pt-2 border-t border-line/60">
                <label className="editorial-mono text-micro text-muted tracking-widest block mb-2 flex items-center justify-between">
                  <span>COVER / POSTER IMAGE URL</span>
                  <span className="text-accent-blue text-[10px]">REAL-TIME RETRIEVAL</span>
                </label>
                <input
                  type="url"
                  placeholder="Paste image URL (e.g. https://images.unsplash.com/...)"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="w-full bg-paper border border-line p-3 font-sans text-sm text-ink focus:outline-none focus:border-ink"
                />

                {/* LIVE IMAGE PREVIEW BOX */}
                {coverImage.trim() && (
                  <div className="mt-3 p-3 bg-paper border border-line">
                    <span className="editorial-mono text-micro text-muted block mb-2 flex items-center gap-1">
                      <ImageIcon size={12} /> LIVE IMAGE PREVIEW
                    </span>
                    <div className="relative aspect-[16/9] w-full bg-cream overflow-hidden border border-line flex items-center justify-center">
                      <img
                        src={coverImage}
                        alt="Preview"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLElement).style.display = "none";
                        }}
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Excerpt */}
              <div>
                <label className="editorial-mono text-micro text-muted tracking-widest block mb-2">
                  SHORT EXCERPT / PULL QUOTE
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Brief summary or quote..."
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  className="w-full bg-paper border border-line p-3 font-sans text-sm text-ink focus:outline-none focus:border-ink"
                />
              </div>

              {/* Content */}
              <div>
                <label className="editorial-mono text-micro text-muted tracking-widest block mb-2">
                  FULL REVIEW OR ESSAY CONTENT
                </label>
                <textarea
                  rows={6}
                  required
                  placeholder="Write your full review, critique, or essay text here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-paper border border-line p-3 font-sans text-sm text-ink focus:outline-none focus:border-ink"
                />
              </div>

              {/* Tags & Reading Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                    TAGS (COMMA SEPARATED)
                  </label>
                  <input
                    type="text"
                    placeholder="cinema, sci-fi, nolan"
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                  />
                </div>
                <div>
                  <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                    READING TIME
                  </label>
                  <input
                    type="text"
                    placeholder="4 min read"
                    value={readingTime}
                    onChange={(e) => setReadingTime(e.target.value)}
                    className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full bg-ink text-paper py-3.5 px-6 font-sans text-sm font-medium tracking-wide hover:bg-charcoal transition-colors flex items-center justify-center gap-2"
              >
                <Plus size={16} />
                {editingSlug ? "Save Changes" : "Publish Review / Thought"}
              </button>
            </form>
          </div>

          {/* Right column: Existing Reviews & Entries List */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="editorial-heading text-h3 mb-4">
              Published Entries ({posts.length})
            </h2>

            <div className="space-y-4 max-h-[85vh] overflow-y-auto pr-2">
              {posts.map((post) => (
                <div
                  key={post.slug}
                  className="bg-paper border border-line p-5 hover:border-ink/40 transition-colors flex justify-between items-start gap-4"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="editorial-mono text-micro text-accent-red font-bold uppercase">
                        {post.category}
                      </span>
                      <span className="text-muted text-xs">•</span>
                      <span className="editorial-mono text-micro text-muted">{post.date}</span>
                      {post.rating && (
                        <span className="text-accent-yellow text-xs">{"★".repeat(post.rating)}</span>
                      )}
                    </div>

                    <h3 className="font-serif text-lead font-bold leading-snug">{post.title}</h3>
                    {post.director && (
                      <p className="editorial-mono text-micro text-stone">DIR: {post.director}</p>
                    )}
                    <p className="text-small text-stone line-clamp-2">{post.excerpt}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditPost(post)}
                      className="p-2 border border-line hover:bg-warm text-ink transition-colors"
                      title="Edit Entry"
                    >
                      <Edit3 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeletePost(post.slug)}
                      className="p-2 border border-line hover:bg-accent-red hover:text-paper text-stone transition-colors"
                      title="Delete Entry"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: MUSIC PLAYLISTS & NOW PLAYING */}
      {activeTab === "music" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Now Playing & Add Playlist Form */}
          <div className="lg:col-span-6 space-y-8">
            {/* Now Playing Form */}
            <div className="bg-warm p-8 border border-line">
              <h2 className="editorial-heading text-h3 mb-4">Now Playing Track</h2>
              <form onSubmit={handleSaveNowPlaying} className="space-y-4">
                <div>
                  <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                    TRACK NAME
                  </label>
                  <input
                    type="text"
                    required
                    value={musicData.nowPlaying.track}
                    onChange={(e) =>
                      setMusicData({
                        ...musicData,
                        nowPlaying: { ...musicData.nowPlaying, track: e.target.value },
                      })
                    }
                    className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                      ARTIST
                    </label>
                    <input
                      type="text"
                      required
                      value={musicData.nowPlaying.artist}
                      onChange={(e) =>
                        setMusicData({
                          ...musicData,
                          nowPlaying: { ...musicData.nowPlaying, artist: e.target.value },
                        })
                      }
                      className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                    />
                  </div>

                  <div>
                    <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                      ALBUM
                    </label>
                    <input
                      type="text"
                      required
                      value={musicData.nowPlaying.album}
                      onChange={(e) =>
                        setMusicData({
                          ...musicData,
                          nowPlaying: { ...musicData.nowPlaying, album: e.target.value },
                        })
                      }
                      className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-ink text-paper px-6 py-2.5 font-sans text-xs font-medium tracking-wide hover:bg-charcoal transition-colors"
                >
                  Update Now Playing Track
                </button>
              </form>
            </div>

            {/* Add Playlist Form */}
            <div className="bg-warm p-8 border border-line">
              <h2 className="editorial-heading text-h3 mb-4">Add Apple Music Playlist</h2>
              <form onSubmit={handleAddPlaylist} className="space-y-4">
                <div>
                  <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                    PLAYLIST TITLE *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Late Night Coding"
                    value={plTitle}
                    onChange={(e) => setPlTitle(e.target.value)}
                    className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                  />
                </div>

                <div>
                  <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                    DESCRIPTION
                  </label>
                  <textarea
                    rows={2}
                    placeholder="The soundtrack to 2am coding sessions..."
                    value={plDescription}
                    onChange={(e) => setPlDescription(e.target.value)}
                    className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                      MOOD / VIBE
                    </label>
                    <input
                      type="text"
                      placeholder="Focus"
                      value={plMood}
                      onChange={(e) => setPlMood(e.target.value)}
                      className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                    />
                  </div>

                  <div>
                    <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                      TRACK COUNT
                    </label>
                    <input
                      type="number"
                      value={plTrackCount}
                      onChange={(e) => setPlTrackCount(Number(e.target.value))}
                      className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="editorial-mono text-micro text-muted tracking-widest block mb-1">
                    APPLE MUSIC EMBED URL *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="https://embed.music.apple.com/us/playlist/..."
                    value={plEmbedUrl}
                    onChange={(e) => setPlEmbedUrl(e.target.value)}
                    className="w-full bg-paper border border-line p-2.5 font-sans text-sm"
                  />
                  <span className="editorial-mono text-micro text-muted mt-1 block">
                    Copy from Apple Music → Share → Copy Embed Code → src URL
                  </span>
                </div>

                {/* Live Apple Music Embed Test */}
                {plEmbedUrl.trim() && (
                  <div className="mt-4 p-3 bg-paper border border-line">
                    <span className="editorial-mono text-micro text-muted block mb-2">
                      LIVE EMBED PREVIEW
                    </span>
                    <iframe
                      allow="autoplay *; encrypted-media *; fullscreen *"
                      height="175"
                      style={{ width: "100%", overflow: "hidden", borderRadius: "4px" }}
                      src={formatAppleMusicEmbedUrl(plEmbedUrl)}
                      title="Preview"
                    />
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full bg-ink text-paper py-3 px-6 font-sans text-xs font-medium tracking-wide hover:bg-charcoal transition-colors flex items-center justify-center gap-2"
                >
                  <Plus size={16} />
                  Add Playlist to Listening Room
                </button>
              </form>
            </div>
          </div>

          {/* Right Column: Existing Playlists */}
          <div className="lg:col-span-6 space-y-6">
            <h2 className="editorial-heading text-h3 mb-4">
              Active Playlists ({musicData.playlists.length})
            </h2>

            <div className="space-y-6">
              {musicData.playlists.map((pl, i) => (
                <div key={i} className="bg-paper border border-line p-6 relative">
                  <button
                    onClick={() => handleDeletePlaylist(i)}
                    className="absolute top-4 right-4 p-2 border border-line hover:bg-accent-red hover:text-paper text-stone transition-colors"
                    title="Remove Playlist"
                  >
                    <Trash2 size={14} />
                  </button>

                  <span className="editorial-mono text-micro text-accent-red tracking-widest block mb-1">
                    {pl.mood.toUpperCase()} / {pl.trackCount} TRACKS
                  </span>
                  <h3 className="editorial-heading text-h4 leading-tight">{pl.title}</h3>
                  <p className="text-small text-stone mb-4 italic font-serif">{pl.description}</p>

                  <div className="w-full h-[175px] overflow-hidden rounded-sm bg-cream">
                    <iframe
                      allow="autoplay *; encrypted-media *;"
                      height="175"
                      style={{ width: "100%", overflow: "hidden", borderRadius: "4px" }}
                      src={pl.embedUrl}
                      title={pl.title}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
