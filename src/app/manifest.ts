import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Punith Sai Guttula — Software Developer",
    short_name: "Punith",
    description: "An interactive editorial documentary exploring the work, projects, and craft of Punith Sai Guttula.",
    start_url: "/",
    display: "standalone",
    background_color: "#FAFAF7",
    theme_color: "#1A1A1A",
    icons: [
      {
        src: "/icon.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
