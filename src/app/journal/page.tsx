import type { Metadata } from "next";
import { JournalIndex } from "./JournalIndex";

export const metadata: Metadata = {
  title: "Dispatches — Journal | Punith",
  description: "Thoughts, movie reviews, essays, and notes on technology, cinema, and craft.",
};

export default function JournalArchivePage() {
  return <JournalIndex />;
}
