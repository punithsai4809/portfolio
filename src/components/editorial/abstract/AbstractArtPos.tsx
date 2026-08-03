"use client";

import { motion } from "motion/react";

/**
 * Abstract Editorial Art 1: OceanWaves POS
 * "Fluid Waves & Transaction Vectors"
 * Swiss/Bauhaus inspired generative SVG artwork with dark indigo, cyan waves, grid lines & annotations.
 */
export function AbstractArtPos() {
  return (
    <div className="relative w-full h-full min-h-[300px] bg-[#0F172A] text-paper overflow-hidden select-none p-6 flex flex-col justify-between">
      {/* Background Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" width="100%" height="100%">
        <defs>
          <pattern id="grid-pos" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 30 0 L 0 0 0 30" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-pos)" />
      </svg>

      {/* Header Annotations */}
      <div className="relative z-10 flex justify-between items-start font-mono text-[10px] text-cyan-400/80 tracking-widest uppercase">
        <div>
          <span>ARTWORK §01</span>
          <span className="block text-slate-400 text-[9px]">OCEANWAVES POS ARCHITECTURE</span>
        </div>
        <div className="text-right">
          <span>16.86°N 81.68°E</span>
          <span className="block text-emerald-400 text-[9px]">● LIVE TRANSACTION STREAM</span>
        </div>
      </div>

      {/* Abstract Waves & Parametric Curves */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 600 400" className="w-full h-full object-cover opacity-90">
          <defs>
            <linearGradient id="wave-grad-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#2563EB" stopOpacity="0.2" />
            </linearGradient>
            <linearGradient id="wave-grad-2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Overlapping Wave Paths */}
          <motion.path
            d="M 0 200 C 150 120, 300 280, 450 160 C 520 100, 580 180, 600 200 L 600 400 L 0 400 Z"
            fill="url(#wave-grad-1)"
            initial={{ d: "M 0 200 C 150 120, 300 280, 450 160 C 520 100, 580 180, 600 200 L 600 400 L 0 400 Z" }}
            animate={{
              d: [
                "M 0 200 C 150 120, 300 280, 450 160 C 520 100, 580 180, 600 200 L 600 400 L 0 400 Z",
                "M 0 180 C 150 240, 300 140, 450 220 C 520 150, 580 210, 600 180 L 600 400 L 0 400 Z",
                "M 0 200 C 150 120, 300 280, 450 160 C 520 100, 580 180, 600 200 L 600 400 L 0 400 Z",
              ],
            }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          />

          <motion.path
            d="M 0 260 C 120 180, 280 320, 420 220 C 500 160, 560 240, 600 260 L 600 400 L 0 400 Z"
            fill="url(#wave-grad-2)"
            initial={{ opacity: 0.7 }}
            animate={{ opacity: [0.5, 0.8, 0.5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Geometric Vector Lines & Data Nodes */}
          <line x1="100" y1="50" x2="500" y2="350" stroke="#38BDF8" strokeWidth="1" strokeDasharray="6 4" opacity="0.4" />
          <line x1="500" y1="50" x2="100" y2="350" stroke="#C5382B" strokeWidth="1" strokeDasharray="4 4" opacity="0.4" />

          {/* Data Nodes */}
          <circle cx="200" cy="170" r="6" fill="#38BDF8" />
          <circle cx="200" cy="170" r="14" fill="none" stroke="#38BDF8" strokeWidth="1" opacity="0.5" />

          <circle cx="400" cy="230" r="6" fill="#06B6D4" />
          <circle cx="400" cy="230" r="22" fill="none" stroke="#06B6D4" strokeWidth="1" opacity="0.3" />

          <circle cx="300" cy="110" r="4" fill="#E8B931" />
          <line x1="300" y1="110" x2="380" y2="70" stroke="#E8B931" strokeWidth="1" />
          <text x="390" y="74" fill="#E8B931" fontSize="10" fontFamily="monospace">SYNC: MYSQL DB</text>
        </svg>
      </div>

      {/* Footer Technical Labels */}
      <div className="relative z-10 flex justify-between items-end font-mono text-[9px] text-slate-400 tracking-wider">
        <div className="flex gap-4">
          <span className="text-cyan-400">INPUT: TRANSACTIONS</span>
          <span>OUTPUT: INVENTORY METRICS</span>
        </div>
        <div className="px-2 py-1 bg-slate-800/80 border border-slate-700 text-slate-300 rounded-[2px]">
          FIGURE 1.1 — SYSTEM FLOW
        </div>
      </div>
    </div>
  );
}
