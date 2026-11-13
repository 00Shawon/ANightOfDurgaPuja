"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronDown, Maximize2 } from "lucide-react";
import { photos, projectMeta } from "@/data/photos";

export default function HeroSection({ onOpenLightbox }) {
  const heroPhoto = photos.find((p) => p.role === "hero") || photos[0];

  const scrollToNext = () => {
    const intro = document.getElementById("introduction-section");
    if (intro) {
      intro.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero-section"
      className="relative w-full h-screen min-h-[700px] flex items-end justify-start overflow-hidden bg-night-950"
    >
      {/* Background Image Container with cinematic overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src={heroPhoto.src}
          alt={heroPhoto.title}
          fill
          priority
          sizes="100vw"
          className="object-cover object-center select-none brightness-95 contrast-[1.05]"
        />
        {/* Subtle radial & linear vignettes to complement nighttime aesthetic */}
        <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-night-950/40 to-night-950/20" />
        <div className="absolute inset-0 bg-radial-vignette opacity-70" />
      </div>

      {/* Lightbox trigger button for hero image */}
      <button
        onClick={() => onOpenLightbox(heroPhoto)}
        className="absolute top-24 right-6 md:right-12 z-20 p-2.5 rounded-full bg-night-950/60 backdrop-blur-md border border-night-700/60 text-warm-gray hover:text-warm-white hover:border-gold-warm/80 transition-all duration-300"
        aria-label="View hero image in full resolution"
        title="View in full resolution"
      >
        <Maximize2 className="w-4 h-4" />
      </button>

      {/* Hero Content Overlay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {/* Bengali Sub-heading */}
          <div className="inline-flex items-center space-x-2 text-xs md:text-sm font-sans tracking-[0.25em] text-gold-warm uppercase mb-3">
            <span className="w-6 h-[1px] bg-gold-warm/60 inline-block" />
            <span>{projectMeta.bengaliTitle}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[0.12em] uppercase text-warm-white leading-[1.08] mb-6">
            Durga Puja <br />
            <span className="font-normal italic font-serif text-warm-cream">at Night</span>
          </h1>

          {/* Short Introductory Statement */}
          <p className="font-serif text-lg sm:text-xl md:text-2xl text-warm-cream/90 leading-relaxed font-light max-w-2xl">
            A photographic story of the lights, rituals, and people I encountered during Durga Puja at night.
          </p>

          <div className="mt-6 flex items-center space-x-6 text-xs font-mono tracking-widest text-warm-dark uppercase">
            <span>17 Photographs</span>
            <span className="w-1 h-1 rounded-full bg-night-600" />
            <span>Personal Photo Essay</span>
            <span className="w-1 h-1 rounded-full bg-night-600" />
            <span>Captured at Night</span>
          </div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-12 flex items-center justify-between border-t border-night-700/60 pt-4"
        >
          <div className="text-[11px] font-mono tracking-widest text-warm-dark uppercase">
            Figure 01 — {heroPhoto.title}
          </div>

          <button
            onClick={scrollToNext}
            className="group flex items-center space-x-2 text-xs font-mono tracking-widest text-warm-gray hover:text-gold-warm transition-colors"
          >
            <span className="uppercase text-[11px]">Explore the Photos</span>
            <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-0.5 transition-transform" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}