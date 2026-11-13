"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2 } from "lucide-react";
import { photos, projectMeta } from "@/data/photos";

export default function ClosingSection({ onOpenLightbox }) {
  const closingPhoto = photos.find((p) => p.role === "closing") || photos[photos.length - 1];

  return (
    <section id="closing-section" className="relative w-full py-28 md:py-40 bg-night-950 border-t border-night-800">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        {/* Curatorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-3xl mx-auto mb-16 md:mb-20"
        >
          <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-gold-warm">
            Epilogue · {closingPhoto.bengaliTitle}
          </span>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-warm-white font-light tracking-wide">
            The Midnight Respite
          </h2>

          <p className="mt-4 font-serif text-lg text-warm-gray leading-relaxed font-light">
            Long after the grand aartis quieten and the loudspeakers dim, the festival remains alive in the quiet labor of those who hold its edges together.
          </p>
        </motion.div>

        {/* Closing Photograph Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full aspect-[3/2] rounded-sm overflow-hidden bg-night-900 border border-night-800 shadow-2xl cursor-pointer group"
          onClick={() => onOpenLightbox(closingPhoto)}
        >
          <Image
            src={closingPhoto.src}
            alt={closingPhoto.title}
            fill
            unoptimized
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover object-center group-hover:scale-[1.02] transition-transform duration-1000 ease-out"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Lightbox button */}
          <div className="absolute top-4 right-4 z-10 p-2.5 rounded-full bg-night-950/80 border border-night-700 text-warm-gray hover:text-warm-white transition-colors">
            <Maximize2 className="w-4 h-4" />
          </div>

          {/* Bottom Overlay Label */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-col md:flex-row md:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-mono tracking-widest text-gold-warm uppercase">
                Figure 17 — Concluding Work
              </span>
              <h3 className="font-display text-xl md:text-2xl text-warm-white font-normal">
                {closingPhoto.title}
              </h3>
            </div>
            <p className="text-xs font-mono text-warm-dark tracking-wider">
              {closingPhoto.details}
            </p>
          </div>
        </motion.div>

        {/* Narrative Reflection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="mt-12 max-w-3xl mx-auto space-y-5 text-center text-warm-gray font-serif text-base md:text-lg leading-relaxed font-light"
        >
          <p>
            {closingPhoto.caption}
          </p>
          <p className="italic text-warm-cream/90 pt-4">
            The night does not end with dawn in this documentary. It settles into the quiet endurance of human hands, the fading smoke of spent incense, and the lingering warmth of an ancient ritual sustained by millions under the midnight sky.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
