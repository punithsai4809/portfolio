import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import type { MusicData } from "@/types";
import { syncToGitHub } from "@/lib/githubSync";

const PLAYLISTS_PATH = path.join(process.cwd(), "src/content/playlists.json");

export async function GET() {
  try {
    const data = await fs.readFile(PLAYLISTS_PATH, "utf-8");
    const music: MusicData = JSON.parse(data);
    return NextResponse.json(music);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read playlists file" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const music: MusicData = await request.json();
    const jsonString = JSON.stringify(music, null, 2);

    // Try local write if filesystem is writable
    try {
      await fs.writeFile(PLAYLISTS_PATH, jsonString, "utf-8");
    } catch {
      // Ephemeral filesystem on Vercel
    }

    // Sync to GitHub repo so Vercel auto-deploys updated content
    const result = await syncToGitHub(
      "src/content/playlists.json",
      jsonString,
      "admin: update playlists content"
    );

    return NextResponse.json({
      success: true,
      syncedToGithub: result.success,
      githubError: result.error,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save playlists file" }, { status: 500 });
  }
}
