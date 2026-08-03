import type { Metadata } from "next";
import { fontVariables } from "@/lib/fonts";
import { SmoothScrollProvider } from "@/components/ui/SmoothScrollProvider";
import { Navigation } from "@/components/ui/Navigation";
import { ProgressBar } from "@/components/ui/ProgressBar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Punith Sai Guttula — Software Developer | Interactive Editorial Portfolio",
  description:
    "An interactive editorial documentary exploring the work, philosophy, and craft of Punith Sai Guttula — a Computer Science graduate and full-stack developer.",
  keywords: [
    "Punith Sai Guttula",
    "software developer",
    "portfolio",
    "Django",
    "Python",
    "React",
    "Next.js",
    "SAP Security",
    "web development",
  ],
  authors: [{ name: "Punith Sai Guttula" }],
  creator: "Punith Sai Guttula",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Punith Sai Guttula — Software Developer",
    description:
      "An interactive editorial documentary exploring the work, projects, and skills of Punith Sai Guttula.",
    siteName: "Punith Sai Guttula Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Punith Sai Guttula — Software Developer",
    description:
      "An interactive editorial documentary exploring the work and craft of Punith Sai Guttula.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontVariables} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        <SmoothScrollProvider>
          <ProgressBar />
          <Navigation />
          <main className="flex-1">{children}</main>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
