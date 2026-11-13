"use client";

import { motion } from "framer-motion";
import { projectMeta } from "@/data/photos";
import { Camera, Moon, ShieldCheck, Heart } from "lucide-react";

export default function PhotographyCredits() {
  return (
    <section className="relative w-full py-24 bg-night-900 border-t border-night-800">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-gold-warm">
            Project Colophon & Integrity
          </span>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl text-warm-white font-light">
            Behind the Lens
          </h2>
          <p className="mt-2 text-sm sm:text-base font-serif text-warm-gray font-light max-w-2xl mx-auto">
            Honoring the documentary truth of Durga Puja after dark.
          </p>
        </motion.div>

        {/* Colophon Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-xl bg-night-950/60 border border-night-800 space-y-3">
            <div className="flex items-center space-x-2 text-gold-warm">
              <Camera className="w-4 h-4" />
              <h3 className="font-sans text-xs uppercase tracking-widest text-warm-white">
                Series Portfolio
              </h3>
            </div>
            <p className="text-xs text-warm-dark font-sans leading-relaxed">
              17 original photographs documenting pandals, devotion, ritual fire, crowds, and street artisans across the festival nights.
            </p>
            <div className="pt-2 text-[11px] font-mono text-warm-gray">
              Format: 35mm & Medium telephoto portraits
            </div>
          </div>

          <div className="p-6 rounded-xl bg-night-950/60 border border-night-800 space-y-3">
            <div className="flex items-center space-x-2 text-gold-warm">
              <Moon className="w-4 h-4" />
              <h3 className="font-sans text-xs uppercase tracking-widest text-warm-white">
                Creative Rule
              </h3>
            </div>
            <p className="text-xs text-warm-dark font-sans leading-relaxed">
              100% nocturnal capture. No artificial golden hour, day-to-night illusions, or digital daylight manipulation.
            </p>
            <div className="pt-2 text-[11px] font-mono text-warm-gray">
              Atmosphere: Pure nocturnal illumination
            </div>
          </div>

          <div className="p-6 rounded-xl bg-night-950/60 border border-night-800 space-y-3">
            <div className="flex items-center space-x-2 text-gold-warm">
              <ShieldCheck className="w-4 h-4" />
              <h3 className="font-sans text-xs uppercase tracking-widest text-warm-white">
                Visual Integrity
              </h3>
            </div>
            <p className="text-xs text-warm-dark font-sans leading-relaxed">
              Original compositions, aspect ratios, and genuine subjects preserved without generative replacement or synthetic manipulation.
            </p>
            <div className="pt-2 text-[11px] font-mono text-warm-gray">
              Philosophy: Documentary realism
            </div>
          </div>
        </div>

        {/* Bengali Cultural Dedication */}
        <div className="mt-16 text-center pt-8 border-t border-night-800/60">
          <p className="font-serif text-lg md:text-xl text-warm-cream font-light italic">
            "মা আসছেন আলো আর আঁধারের সীমানা ভেঙে — রাতেও তিনি জাগ্রত।"
          </p>
          <p className="mt-2 text-xs font-mono tracking-widest text-warm-dark uppercase">
            In Celebration of Durga Puja · Festival of Light & Shadow
          </p>
        </div>
      </div>
    </section>
  );
}
