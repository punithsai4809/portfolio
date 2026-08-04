import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import type { JournalPost } from "@/types";
import { syncToGitHub } from "@/lib/githubSync";

const JOURNAL_PATH = path.join(process.cwd(), "src/content/journal.json");

export async function GET() {
  try {
    const data = await fs.readFile(JOURNAL_PATH, "utf-8");
    const posts: JournalPost[] = JSON.parse(data);
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to read journal file" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const posts: JournalPost[] = await request.json();
    const jsonString = JSON.stringify(posts, null, 2);

    // Try local write if filesystem is writable
    try {
      await fs.writeFile(JOURNAL_PATH, jsonString, "utf-8");
    } catch {
      // Ephemeral filesystem on Vercel
    }

    // Sync to GitHub repo so Vercel auto-deploys updated content
    const result = await syncToGitHub(
      "src/content/journal.json",
      jsonString,
      "admin: update journal content"
    );

    return NextResponse.json({
      success: true,
      count: posts.length,
      syncedToGithub: result.success,
      githubError: result.error,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save journal file" }, { status: 500 });
  }
}
