"use client";

import { motion } from "framer-motion";
import { projectMeta } from "@/data/photos";
import { Camera, Moon, Eye } from "lucide-react";

export default function IntroductionSection() {
  return (
    <section
      id="introduction-section"
      className="relative w-full py-28 md:py-40 bg-night-900 border-b border-night-800/80"
    >
      <div className="max-w-4xl mx-auto px-6 md:px-12">
        {/* Curatorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-gold-warm/90">
            Curatorial Statement
          </span>

          <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl text-warm-white font-light tracking-wide leading-snug">
            One festival. A world of nighttime experiences.{" "}
            <span className="font-serif italic text-warm-cream block mt-2">
              Multiple visual perspectives.
            </span>
          </h2>
        </motion.div>

        {/* Editorial Body */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-12 space-y-6 text-warm-gray text-base md:text-lg font-editorial-body leading-relaxed text-justify md:text-left font-light"
        >
          <p>
            When darkness falls over Bengal during Durga Puja, the city sheds its everyday geography. What emerges is not merely a festival of spectacle, but an immersive nocturnal theater of light, shadow, devotion, and labor.
          </p>

          <p>
            This photographic essay was conceived under a single creative rule: <strong className="text-warm-white font-normal">every image in this series was captured strictly at night</strong>. Without daylight to level the field, artificial illumination becomes a sculptor—cutting through crowds with neon blues, framing solitary faces with single halogen lamps, and catching the orange burst of flying embers from ritual censers.
          </p>

          <p>
            Rather than a catalogue of decorative pandals, these seventeen photographs document the lived nocturnal rhythm: from the quiet contemplation of devotees on marble thresholds and mothers navigating crimson crowds, to the weathered hands of street artisans tending their wares long past midnight.
          </p>
        </motion.div>

        {/* Pillars / Metadata Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 pt-10 border-t border-night-700/60"
        >
          <div className="flex flex-col items-start space-y-2 p-4 rounded-xl bg-night-950/40 border border-night-800">
            <Moon className="w-4 h-4 text-gold-warm" />
            <h4 className="font-sans text-xs uppercase tracking-widest text-warm-white">
              Nocturnal Atmosphere
            </h4>
            <p className="text-xs text-warm-dark font-sans leading-relaxed">
              Zero daylight transitions. Deep blacks, natural shadows, and available night lighting.
            </p>
          </div>

          <div className="flex flex-col items-start space-y-2 p-4 rounded-xl bg-night-950/40 border border-night-800">
            <Camera className="w-4 h-4 text-gold-warm" />
            <h4 className="font-sans text-xs uppercase tracking-widest text-warm-white">
              Photographic Truth
            </h4>
            <p className="text-xs text-warm-dark font-sans leading-relaxed">
              Authentic documentary compositions preserving original framing and human dignity.
            </p>
          </div>

          <div className="flex flex-col items-start space-y-2 p-4 rounded-xl bg-night-950/40 border border-night-800">
            <Eye className="w-4 h-4 text-gold-warm" />
            <h4 className="font-sans text-xs uppercase tracking-widest text-warm-white">
              Human Periphery
            </h4>
            <p className="text-xs text-warm-dark font-sans leading-relaxed">
              Exploring the sacred altar, the ecstatic dance, and the quiet resilience of street vendors.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
