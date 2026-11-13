"use client";

import { ArrowUp } from "lucide-react";
import { projectMeta } from "@/data/photos";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative w-full py-16 bg-night-950 border-t border-night-800 text-warm-dark text-xs">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Left Info */}
        <div className="space-y-1 text-center md:text-left">
          <p className="font-display tracking-[0.2em] uppercase text-warm-white text-xs">
            {projectMeta.title}
          </p>
          <p className="font-sans text-[11px] text-warm-dark tracking-wider">
            {projectMeta.bengaliTitle} · Personal Photography Series
          </p>
        </div>

        {/* Center Philosophy */}
        <div className="text-center font-serif italic text-warm-gray text-xs sm:text-sm">
          "One festival. A world of nighttime experiences. Multiple visual perspectives."
        </div>

        {/* Right Scroll to Top */}
        <div className="flex items-center space-x-4">
          <button
            onClick={scrollToTop}
            className="group flex items-center space-x-2 px-3 py-1.5 rounded-full border border-night-800 bg-night-900/60 hover:bg-night-800 hover:text-warm-white transition-colors focus:outline-none"
            aria-label="Back to top"
          >
            <span className="font-mono text-[10px] tracking-widest uppercase text-warm-gray group-hover:text-gold-warm">
              Back to Top
            </span>
            <ArrowUp className="w-3.5 h-3.5 text-gold-warm group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
