"use client";

import { useState } from "react";
import { chapters } from "@/data/photos";
import { Compass, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function ChapterNavigation({ activeChapterId }) {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-full border border-night-700/80 bg-night-900/60 hover:bg-night-800/80 transition-all duration-300 text-xs text-warm-gray hover:text-warm-white focus:outline-none focus:ring-1 focus:ring-gold-warm"
        aria-label="Toggle chapter navigation"
      >
        <Compass className="w-3.5 h-3.5 text-gold-warm" />
        <span className="font-mono text-[11px] tracking-wider uppercase hidden sm:inline">
          Index
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-night-950/80 backdrop-blur-sm z-50"
            />

            {/* Menu Drawer */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="fixed top-20 right-6 md:right-12 z-50 w-80 md:w-96 rounded-2xl bg-night-900/95 border border-night-700 p-6 shadow-2xl backdrop-blur-xl"
            >
              <div className="flex items-center justify-between pb-4 border-b border-night-700/80">
                <div>
                  <h3 className="font-display text-sm tracking-widest uppercase text-warm-white">
                    Narrative Index
                  </h3>
                  <p className="text-[11px] font-sans text-warm-dark tracking-wide mt-0.5">
                    17 Night Photographs · 4 Chapters
                  </p>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-full text-warm-dark hover:text-warm-white transition-colors"
                  aria-label="Close menu"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="mt-4 space-y-2">
                <button
                  onClick={() => scrollTo("hero-section")}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors hover:bg-night-800 flex items-center justify-between group"
                >
                  <div>
                    <span className="font-mono text-[10px] text-warm-dark group-hover:text-gold-warm mr-2">
                      00
                    </span>
                    <span className="font-serif text-sm text-warm-gray group-hover:text-warm-white">
                      Prologue: Canopy of Lights
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-warm-dark">Introduction</span>
                </button>

                {chapters.map((ch) => {
                  const isActive = activeChapterId === ch.id;
                  return (
                    <button
                      key={ch.id}
                      onClick={() => scrollTo(ch.id)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors flex items-center justify-between group ${
                        isActive
                          ? "bg-night-800/90 border-l-2 border-gold-warm text-warm-white"
                          : "hover:bg-night-800 text-warm-gray"
                      }`}
                    >
                      <div>
                        <span className={`font-mono text-[10px] mr-2 ${isActive ? "text-gold-warm" : "text-warm-dark group-hover:text-gold-warm"}`}>
                          {ch.number}
                        </span>
                        <span className={`font-serif text-sm ${isActive ? "text-warm-white font-medium" : "group-hover:text-warm-white"}`}>
                          {ch.title}
                        </span>
                        <div className="text-[11px] text-warm-dark font-sans italic ml-6">
                          {ch.bengaliTitle}
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-warm-dark">
                        {ch.photoIds.length} Works
                      </span>
                    </button>
                  );
                })}

                <button
                  onClick={() => scrollTo("closing-section")}
                  className="w-full text-left px-3 py-2.5 rounded-lg text-xs transition-colors hover:bg-night-800 flex items-center justify-between group"
                >
                  <div>
                    <span className="font-mono text-[10px] text-warm-dark group-hover:text-gold-warm mr-2">
                      05
                    </span>
                    <span className="font-serif text-sm text-warm-gray group-hover:text-warm-white">
                      Epilogue: The Midnight Artisan
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-warm-dark">Closing</span>
                </button>
              </div>

              <div className="mt-5 pt-3 border-t border-night-700/60 text-center">
                <p className="text-[10px] tracking-wider text-warm-dark uppercase font-mono">
                  All photographs captured at night
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
