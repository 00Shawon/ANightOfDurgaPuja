"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Maximize2, Info, Tag } from "lucide-react";

export default function EditorialImageLayout({
  photo,
  layout = "standard", // "full-cinematic" | "portrait-feature" | "asymmetric-left" | "asymmetric-right" | "side-by-side" | "detail-focus"
  priority = false,
  figureNumber,
  onOpenLightbox,
}) {
  const [showMeta, setShowMeta] = useState(false);

  // Layout-specific classes
  const isCinematic = layout === "full-cinematic";
  const isPortraitFeature = layout === "portrait-feature";
  const isAsymmetricLeft = layout === "asymmetric-left";
  const isAsymmetricRight = layout === "asymmetric-right";

  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative my-16 md:my-28 ${
        isCinematic
          ? "w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-12"
          : isPortraitFeature
          ? "max-w-4xl mx-auto px-4 sm:px-6"
          : "max-w-6xl mx-auto px-4 sm:px-6 md:px-8"
      }`}
    >
      {/* Editorial Grid / Flex Container */}
      <div
        className={`flex flex-col ${
          isAsymmetricLeft
            ? "lg:flex-row lg:items-end lg:gap-12"
            : isAsymmetricRight
            ? "lg:flex-row-reverse lg:items-end lg:gap-12"
            : ""
        }`}
      >
        {/* Main Image Frame */}
        <div
          className={`relative overflow-hidden rounded-sm bg-night-950 border border-night-800/80 shadow-2xl ${
            isCinematic
              ? "w-full aspect-[3/2] sm:aspect-[16/9] md:aspect-[2.1/1]"
              : isPortraitFeature
              ? "w-full max-w-xl mx-auto aspect-[2/3]"
              : isAsymmetricLeft || isAsymmetricRight
              ? "w-full lg:w-7/12 aspect-[2/3] lg:aspect-[2/3]"
              : "w-full aspect-[2/3] md:aspect-[3/2]"
          }`}
        >
          {/* Next.js Image with true aspect ratio preservation */}
          <div className="relative w-full h-full cursor-pointer" onClick={() => onOpenLightbox(photo)}>
            <Image
              src={photo.src}
              alt={photo.title}
              fill
              unoptimized
              priority={priority}
              sizes={
                isCinematic
                  ? "(max-width: 1280px) 100vw, 1280px"
                  : "(max-width: 768px) 100vw, 800px"
              }
              className="object-contain sm:object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-[1.02]"
            />

            {/* Subtle Vignette Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-night-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Hover Actions Bar */}
            <div className="absolute top-4 right-4 z-10 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMeta(!showMeta);
                }}
                className="p-2 rounded-full bg-night-950/80 backdrop-blur-md border border-night-700 text-warm-gray hover:text-gold-warm transition-colors"
                title="Toggle technical details"
                aria-label="Toggle photograph details"
              >
                <Info className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenLightbox(photo);
                }}
                className="p-2 rounded-full bg-night-950/80 backdrop-blur-md border border-night-700 text-warm-gray hover:text-warm-white transition-colors"
                title="Open fullscreen lightbox"
                aria-label="View in fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Editorial Caption & Narrative Metadata */}
        <div
          className={`mt-6 ${
            isAsymmetricLeft || isAsymmetricRight
              ? "w-full lg:w-5/12 lg:mt-0 lg:pb-4"
              : "w-full max-w-3xl"
          }`}
        >
          {/* Header Row */}
          <div className="flex items-center space-x-3 text-[11px] font-mono tracking-widest text-gold-warm uppercase">
            {figureNumber && <span>FIG. {figureNumber}</span>}
            <span className="w-1 h-1 rounded-full bg-night-600" />
            <span className="text-warm-dark font-sans italic">{photo.bengaliTitle}</span>
          </div>

          {/* Title */}
          <h3 className="mt-1 font-display text-xl sm:text-2xl text-warm-white font-normal tracking-wide">
            {photo.title}
          </h3>

          {/* Narrative Caption */}
          <p className="mt-2.5 font-serif text-base sm:text-lg text-warm-gray leading-relaxed font-light">
            {photo.caption}
          </p>

          {/* Technical and Context Details */}
          <div className="mt-4 pt-3 border-t border-night-800 flex flex-wrap items-center justify-between gap-3 text-xs text-warm-dark font-mono">
            <span className="tracking-wider">{photo.details}</span>

            {/* Click to expand in lightbox indicator */}
            <button
              onClick={() => onOpenLightbox(photo)}
              className="inline-flex items-center space-x-1.5 text-[11px] text-warm-dark hover:text-gold-warm transition-colors font-sans uppercase tracking-wider"
            >
              <span>Inspect Fullscreen</span>
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>

          {/* Expanded Metadata Drawer */}
          {showMeta && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-4 rounded-lg bg-night-950/90 border border-night-800 text-xs font-mono space-y-2 text-warm-gray"
            >
              <div className="flex items-center justify-between">
                <span className="text-warm-dark">Original File:</span>
                <span className="text-warm-white truncate max-w-[200px]">{photo.originalFile}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-warm-dark">Dimensions:</span>
                <span>{photo.width} × {photo.height} px ({photo.orientation})</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-warm-dark">Lighting Conditions:</span>
                <span className="text-gold-warm">100% Night / Ambient</span>
              </div>
              {photo.tags && (
                <div className="pt-2 border-t border-night-800 flex flex-wrap gap-1.5">
                  {photo.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center px-2 py-0.5 rounded-full bg-night-900 border border-night-700 text-[10px] text-warm-dark"
                    >
                      <Tag className="w-2.5 h-2.5 mr-1 text-gold-warm" />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.figure>
  );
}
