"use client";

import { useEffect, useState } from "react";
import SoundscapeToggle from "./SoundscapeToggle";
import ChapterNavigation from "./ChapterNavigation";

export default function Navigation({ activeChapterId, onOpenIndex }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-night-950/80 backdrop-blur-md border-b border-night-700/50 py-3.5"
          : "bg-gradient-to-b from-night-950/80 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Branding & Subtitle */}
        <a
          href="#hero-section"
          className="group flex flex-col focus:outline-none"
          aria-label="Return to top"
        >
          <span className="font-display text-xs md:text-sm tracking-[0.25em] uppercase text-warm-white group-hover:text-gold-light transition-colors">
            SHADOWS OF THE SACRED
          </span>
          <span className="text-[10px] md:text-[11px] font-sans text-warm-dark group-hover:text-warm-gray tracking-widest uppercase transition-colors">
            রাতের আলোয় দুর্গোৎসব · A Nocturnal Photo Essay
          </span>
        </a>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 md:space-x-4">
          <SoundscapeToggle />
          <ChapterNavigation activeChapterId={activeChapterId} />
        </div>
      </div>
    </header>
  );
}
