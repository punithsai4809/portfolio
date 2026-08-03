import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import type { JournalPost } from "@/types";

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
    await fs.writeFile(JOURNAL_PATH, JSON.stringify(posts, null, 2), "utf-8");
    return NextResponse.json({ success: true, count: posts.length });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save journal file" }, { status: 500 });
  }
}
