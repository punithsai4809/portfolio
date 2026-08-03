import {
  Playfair_Display,
  Instrument_Serif,
  Inter,
  Space_Mono,
  Caveat,
} from "next/font/google";

// Display — High contrast editorial headlines (alternative to Druk / Noe Display)
export const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

// Serif — Contemporary luxury section titles (alternative to Canela / Editorial New)
export const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: "400",
  style: ["normal", "italic"],
});

// Sans — Clean neo-grotesque body text
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

// Mono — Technical annotations, code, labels
export const spaceMono = Space_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
  weight: ["400", "700"],
});

// Handwritten — Annotations, personal notes
export const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-handwritten",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// Combined font variable class string for <html>
export const fontVariables = [
  playfairDisplay.variable,
  instrumentSerif.variable,
  inter.variable,
  spaceMono.variable,
  caveat.variable,
].join(" ");
