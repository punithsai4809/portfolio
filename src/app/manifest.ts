import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Punith — Software Engineer",
    short_name: "Punith",
    description: "An interactive editorial documentary exploring the work and craft of a software engineer.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF7",
    theme_color: "#1A1A1A",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
