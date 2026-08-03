import { NextResponse } from "next/server";
import fs from "fs/promises";
import path from "path";
import type { MusicData } from "@/types";

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
    await fs.writeFile(PLAYLISTS_PATH, JSON.stringify(music, null, 2), "utf-8");
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save playlists file" }, { status: 500 });
  }
}
