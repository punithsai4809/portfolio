"use client";

import { motion } from "motion/react";

/**
 * Abstract Editorial Art 3: AI Assisted Inventory System
 * "Isometric Data Blocks & Predictive Heatmaps"
 * Warm paper/cream background, isometric data cubes, probability curves, red/navy accents, and machine learning annotations.
 */
export function AbstractArtInventory() {
  return (
    <div className="relative w-full h-full min-h-[300px] bg-[#1E1B18] text-paper overflow-hidden select-none p-6 flex flex-col justify-between">
      {/* Background Isometric Grid */}
      <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none" width="100%" height="100%">
        <defs>
          <pattern id="grid-inv" width="30" height="30" patternUnits="userSpaceOnUse">
            <path d="M 0 15 L 15 0 L 30 15 L 15 30 Z" fill="none" stroke="#C5382B" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-inv)" />
      </svg>

      {/* Header Annotations */}
      <div className="relative z-10 flex justify-between items-start font-mono text-[10px] text-rose-400 tracking-widest uppercase">
        <div>
          <span>ARTWORK §03</span>
          <span className="block text-stone-400 text-[9px]">MACHINE LEARNING REORDER PREDICTIONS</span>
        </div>
        <div className="text-right">
          <span>MODEL: SCIKIT-LEARN</span>
          <span className="block text-rose-500 text-[9px]">● ACCURACY 90%</span>
        </div>
      </div>

      {/* Abstract Isometric Stack & Probability Density Curve */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 600 400" className="w-full h-full object-cover opacity-90">
          {/* Predictive Time-Series Trend Line */}
          <motion.path
            d="M 50 320 Q 180 300, 280 180 T 550 80"
            fill="none"
            stroke="#C5382B"
            strokeWidth="3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
          />

          {/* Dotted threshold line */}
          <line x1="50" y1="200" x2="550" y2="200" stroke="#E8B931" strokeWidth="1" strokeDasharray="6 4" opacity="0.6" />
          <text x="55" y="194" fill="#E8B931" fontSize="9" fontFamily="monospace">RESTOCK THRESHOLD TRIGGER</text>

          {/* Isometric Stacked Data Cubes */}
          <g transform="translate(180, 220)">
            <polygon points="0,-20 35,-38 70,-20 35,-2" fill="#C5382B" opacity="0.8" />
            <polygon points="0,-20 35,-2 35,30 0,12" fill="#991B1B" opacity="0.9" />
            <polygon points="35,-2 70,-20 70,12 35,30" fill="#7F1D1D" opacity="0.9" />
          </g>

          <g transform="translate(260, 160)">
            <polygon points="0,-20 35,-38 70,-20 35,-2" fill="#2B5EA7" opacity="0.8" />
            <polygon points="0,-20 35,-2 35,45 0,27" fill="#1E40AF" opacity="0.9" />
            <polygon points="35,-2 70,-20 70,27 35,45" fill="#1E3A8A" opacity="0.9" />
          </g>

          <g transform="translate(340, 110)">
            <polygon points="0,-20 35,-38 70,-20 35,-2" fill="#E8B931" opacity="0.85" />
            <polygon points="0,-20 35,-2 35,60 0,42" fill="#D97706" opacity="0.9" />
            <polygon points="35,-2 70,-20 70,42 35,60" fill="#B45309" opacity="0.9" />
          </g>

          {/* Pulse Node on Curve */}
          <circle cx="280" cy="180" r="7" fill="#C5382B" />
          <circle cx="280" cy="180" r="18" fill="none" stroke="#C5382B" strokeWidth="1.5" opacity="0.6" />
        </svg>
      </div>

      {/* Footer Technical Labels */}
      <div className="relative z-10 flex justify-between items-end font-mono text-[9px] text-stone-400 tracking-wider">
        <div className="flex gap-4">
          <span className="text-rose-400">STOCK FORECAST</span>
          <span>SMTP ALERT PIPELINE</span>
        </div>
        <div className="px-2 py-1 bg-stone-900 border border-stone-800 text-stone-300 rounded-[2px]">
          FIGURE 3.1 — PREDICTIVE MODEL DISTRIBUTION
        </div>
      </div>
    </div>
  );
}
