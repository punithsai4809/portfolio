"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { label: "Profile", sectionId: "about", number: "02" },
  { label: "Work", sectionId: "projects", number: "03" },
  { label: "Skills", sectionId: "skills", number: "04" },
  { label: "Thoughts", sectionId: "thoughts", number: "05" },
  { label: "Cinema", sectionId: "movie-reviews", number: "06" },
  { label: "Journey", sectionId: "experience", number: "07" },
  { label: "Music", sectionId: "music", number: "09" },
  { label: "Contact", sectionId: "contact", number: "10" },
];

/**
 * Minimal editorial navigation.
 * Issue-style with section numbers, hidden on hero, visible after scroll.
 */
export function Navigation() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsMobileOpen(false);
    }
  };

  return (
    <>
      {/* Desktop nav */}
      <motion.nav
        className={cn(
          "fixed top-0 left-0 right-0 z-50 hidden md:block",
          "bg-paper/90 backdrop-blur-sm border-b border-line/50"
        )}
        initial={{ y: -100 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Main navigation"
      >
        <div className="flex items-center justify-between px-8 lg:px-16 py-3">
          <button
            onClick={() => scrollTo("hero")}
            className="editorial-mono text-tiny text-ink tracking-[0.15em] font-bold hover:text-accent-red transition-colors"
          >
            PUNITH
          </button>

          <div className="flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.sectionId}
                onClick={() => scrollTo(item.sectionId)}
                className="group flex items-center gap-1.5 editorial-mono text-micro text-muted tracking-widest hover:text-ink transition-colors"
              >
                <span className="text-accent-red/50 group-hover:text-accent-red transition-colors text-[9px]">
                  {item.number}
                </span>
                {item.label.toUpperCase()}
              </button>
            ))}
          </div>
        </div>
      </motion.nav>

      {/* Mobile hamburger button */}
      <motion.button
        className="fixed top-4 right-4 z-50 md:hidden w-10 h-10 flex items-center justify-center bg-paper/90 backdrop-blur-sm border border-line"
        onClick={() => setIsMobileOpen(!isMobileOpen)}
        animate={{ opacity: isVisible ? 1 : 0, pointerEvents: isVisible ? "auto" : "none" }}
        aria-label={isMobileOpen ? "Close menu" : "Open menu"}
      >
        {isMobileOpen ? <X size={18} /> : <Menu size={18} />}
      </motion.button>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden bg-paper flex flex-col justify-center px-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="space-y-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.button
                  key={item.sectionId}
                  onClick={() => scrollTo(item.sectionId)}
                  className="block text-left"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.3 }}
                >
                  <span className="editorial-mono text-micro text-accent-red tracking-widest">
                    §{item.number}
                  </span>
                  <span className="block editorial-heading text-h3 mt-0.5">
                    {item.label}
                  </span>
                </motion.button>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
