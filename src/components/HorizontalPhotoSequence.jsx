"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";

export default function HorizontalPhotoSequence({
  title,
  subtitle,
  bengaliTitle,
  photos,
  onOpenLightbox,
}) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const { scrollLeft, clientWidth } = scrollRef.current;
    const scrollAmount = clientWidth * 0.75;
    scrollRef.current.scrollTo({
      left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full py-16 md:py-24 bg-night-950/70 border-y border-night-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12 mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="text-xs font-mono tracking-[0.25em] uppercase text-gold-warm mb-1">
            Visual Progression · {bengaliTitle}
          </div>
          <h3 className="font-display text-2xl sm:text-3xl text-warm-white font-light">
            {title}
          </h3>
          <p className="font-serif text-sm md:text-base text-warm-dark mt-1 font-light">
            {subtitle}
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center space-x-2">
          <button
            onClick={() => scroll("left")}
            className="p-2.5 rounded-full border border-night-700 bg-night-900 text-warm-gray hover:text-warm-white hover:border-gold-warm transition-colors"
            aria-label="Scroll left"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="p-2.5 rounded-full border border-night-700 bg-night-900 text-warm-gray hover:text-warm-white hover:border-gold-warm transition-colors"
            aria-label="Scroll right"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div
        ref={scrollRef}
        className="flex space-x-6 overflow-x-auto no-scrollbar px-6 md:px-12 pb-6 pt-2 scroll-smooth"
      >
        {photos.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="flex-shrink-0 w-[280px] sm:w-[340px] md:w-[420px] group cursor-pointer"
            onClick={() => onOpenLightbox(photo)}
          >
            {/* Image Container with preserved aspect ratio */}
            <div className="relative aspect-[2/3] w-full rounded-sm overflow-hidden bg-night-900 border border-night-800 shadow-xl">
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                unoptimized
                sizes="(max-width: 768px) 280px, 420px"
                className="object-cover object-center group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-night-950 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

              <div className="absolute top-3 right-3 p-1.5 rounded-full bg-night-950/70 border border-night-700 text-warm-gray opacity-0 group-hover:opacity-100 transition-opacity">
                <Maximize2 className="w-3.5 h-3.5" />
              </div>

              <div className="absolute bottom-3 left-3 right-3">
                <span className="text-[10px] font-mono tracking-widest text-gold-warm uppercase">
                  Part {idx + 1}
                </span>
                <h4 className="font-display text-sm sm:text-base text-warm-white font-normal line-clamp-1">
                  {photo.title}
                </h4>
              </div>
            </div>

            <div className="mt-2.5 px-1">
              <p className="text-xs font-serif text-warm-gray line-clamp-2 font-light">
                {photo.caption}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
