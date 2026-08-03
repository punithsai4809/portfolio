"use client";

import { motion } from "motion/react";

/**
 * Abstract Editorial Art 2: Car Recommendation Chat Bot
 * "Neural Vectors & Golden Ratio Curves"
 * Deep charcoal background, golden ratio spirals, vector connections, and prompt pipeline annotations.
 */
export function AbstractArtChatbot() {
  return (
    <div className="relative w-full h-full min-h-[300px] bg-[#121212] text-paper overflow-hidden select-none p-6 flex flex-col justify-between">
      {/* Radial Background Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-950/30 via-transparent to-transparent pointer-events-none" />

      {/* Grid Pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-10 pointer-events-none" width="100%" height="100%">
        <defs>
          <pattern id="grid-chatbot" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="#FFFFFF" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid-chatbot)" />
      </svg>

      {/* Header Annotations */}
      <div className="relative z-10 flex justify-between items-start font-mono text-[10px] text-amber-400/90 tracking-widest uppercase">
        <div>
          <span>ARTWORK §02</span>
          <span className="block text-stone-400 text-[9px]">GPT-3.5 TURBO + LANGCHAIN</span>
        </div>
        <div className="text-right">
          <span>VECTOR EMBEDDINGS</span>
          <span className="block text-amber-500 text-[9px]">● AUTOMOBILE DATASET</span>
        </div>
      </div>

      {/* Abstract Golden Spiral & Vector Network */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <svg viewBox="0 0 600 400" className="w-full h-full object-cover opacity-85">
          {/* Concentric Golden Ratio Circles */}
          <circle cx="300" cy="200" r="160" fill="none" stroke="#E8B931" strokeWidth="0.5" strokeDasharray="4 6" opacity="0.3" />
          <circle cx="300" cy="200" r="100" fill="none" stroke="#F59E0B" strokeWidth="0.8" opacity="0.4" />
          <circle cx="300" cy="200" r="60" fill="none" stroke="#FBBF24" strokeWidth="1" strokeDasharray="12 4" opacity="0.6" />

          {/* Dynamic Rotating Neural Ring */}
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "300px 200px" }}
          >
            <circle cx="300" cy="100" r="5" fill="#F59E0B" />
            <line x1="300" y1="100" x2="300" y2="200" stroke="#F59E0B" strokeWidth="0.5" opacity="0.5" />

            <circle cx="400" cy="200" r="5" fill="#E8B931" />
            <line x1="400" y1="200" x2="300" y2="200" stroke="#E8B931" strokeWidth="0.5" opacity="0.5" />

            <circle cx="300" cy="300" r="5" fill="#EF4444" />
            <line x1="300" y1="300" x2="300" y2="200" stroke="#EF4444" strokeWidth="0.5" opacity="0.5" />

            <circle cx="200" cy="200" r="5" fill="#3B82F6" />
            <line x1="200" y1="200" x2="300" y2="200" stroke="#3B82F6" strokeWidth="0.5" opacity="0.5" />
          </motion.g>

          {/* Central Neural Core */}
          <circle cx="300" cy="200" r="12" fill="#E8B931" />
          <circle cx="300" cy="200" r="24" fill="none" stroke="#E8B931" strokeWidth="1.5" opacity="0.8" />

          {/* Abstract vehicle silhouette curves */}
          <path
            d="M 120 280 Q 220 180, 300 180 T 480 280"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="2"
            opacity="0.7"
          />

          {/* Technical Annotations */}
          <line x1="400" y1="200" x2="480" y2="140" stroke="#E8B931" strokeWidth="0.8" />
          <text x="490" y="144" fill="#E8B931" fontSize="9" fontFamily="monospace">PROMPT CHAIN: ACTIVE</text>
        </svg>
      </div>

      {/* Footer Technical Labels */}
      <div className="relative z-10 flex justify-between items-end font-mono text-[9px] text-stone-400 tracking-wider">
        <div className="flex gap-4">
          <span className="text-amber-400">QUERY PARSER</span>
          <span>LANGCHAIN MEMORY</span>
        </div>
        <div className="px-2 py-1 bg-stone-900 border border-stone-800 text-stone-300 rounded-[2px]">
          FIGURE 2.1 — AI RECOMMENDATION LOGIC
        </div>
      </div>
    </div>
  );
}
