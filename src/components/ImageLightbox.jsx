"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Info,
  Maximize2,
  Calendar,
  Layers,
  Camera,
  Tag,
} from "lucide-react";
import { photos } from "@/data/photos";

export default function ImageLightbox({ currentPhoto, onClose, onSelectPhoto }) {
  const [showInfo, setShowInfo] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const currentIndex = photos.findIndex((p) => p.id === currentPhoto?.id);
  const safeIndex = currentIndex >= 0 ? currentIndex : 0;
  const activePhoto = currentPhoto || photos[0];

  const handleNext = useCallback(() => {
    setImageLoaded(false);
    if (safeIndex < photos.length - 1) {
      onSelectPhoto(photos[safeIndex + 1]);
    } else {
      onSelectPhoto(photos[0]); // Loop to start
    }
  }, [safeIndex, onSelectPhoto]);

  const handlePrev = useCallback(() => {
    setImageLoaded(false);
    if (safeIndex > 0) {
      onSelectPhoto(photos[safeIndex - 1]);
    } else {
      onSelectPhoto(photos[photos.length - 1]); // Loop to end
    }
  }, [safeIndex, onSelectPhoto]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") handleNext();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key.toLowerCase() === "i") setShowInfo((prev) => !prev);
    };

    window.addEventListener("keydown", handleKeyDown);
    // Lock body scroll while lightbox is open
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [onClose, handleNext, handlePrev]);

  // Touch swipe handling for mobile
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    if (isLeftSwipe) handleNext();
    if (isRightSwipe) handlePrev();
  };

  if (!activePhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-night-950/98 backdrop-blur-2xl select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Top Header Bar */}
      <div className="relative z-30 flex items-center justify-between px-4 sm:px-6 py-3.5 border-b border-night-800/80 bg-night-950/80 backdrop-blur-md">
        <div className="flex items-center space-x-3 min-w-0">
          <span className="font-mono text-xs text-gold-warm tracking-widest flex-shrink-0">
            {String(safeIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
          <span className="w-1 h-1 rounded-full bg-night-700 hidden sm:inline" />
          <span className="font-display text-xs sm:text-sm tracking-wider uppercase text-warm-white truncate">
            {activePhoto.title}
          </span>
          {activePhoto.bengaliTitle && (
            <span className="font-sans text-xs text-warm-dark italic hidden md:inline truncate">
              · {activePhoto.bengaliTitle}
            </span>
          )}
        </div>

        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`p-2 rounded-full border transition-colors ${
              showInfo
                ? "bg-gold-warm/20 border-gold-warm text-gold-warm"
                : "bg-night-900 border-night-700 text-warm-gray hover:text-warm-white"
            }`}
            title="Toggle Details (Shortcut: I)"
            aria-label="Toggle details panel"
          >
            <Info className="w-4 h-4" />
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-night-900 border border-night-700 text-warm-gray hover:text-warm-white hover:border-gold-warm transition-colors"
            title="Close Lightbox (Shortcut: Esc)"
            aria-label="Close Lightbox"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Lightbox Body */}
      <div className="relative flex-1 w-full min-h-0 flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-4 md:left-8 z-30 p-2.5 sm:p-3.5 rounded-full bg-night-900/80 border border-night-700/80 text-warm-gray hover:text-warm-white hover:border-gold-warm hover:scale-105 active:scale-95 transition-all shadow-xl backdrop-blur-sm"
          aria-label="Previous photograph"
          title="Previous (Arrow Left)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Central Image Viewport with Aspect Ratio Preservation */}
        <div className="relative w-full h-full max-w-7xl max-h-[78vh] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activePhoto.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <Image
                src={activePhoto.src}
                alt={activePhoto.title}
                fill
                priority
                unoptimized
                sizes="(max-width: 1280px) 100vw, 1920px"
                className="object-contain object-center drop-shadow-2xl select-none"
                onLoad={() => setImageLoaded(true)}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-4 md:right-8 z-30 p-2.5 sm:p-3.5 rounded-full bg-night-900/80 border border-night-700/80 text-warm-gray hover:text-warm-white hover:border-gold-warm hover:scale-105 active:scale-95 transition-all shadow-xl backdrop-blur-sm"
          aria-label="Next photograph"
          title="Next (Arrow Right)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Floating Details Overlay Drawer */}
        <AnimatePresence>
          {showInfo && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.25 }}
              className="absolute bottom-4 right-4 sm:right-8 z-30 w-80 sm:w-96 max-h-[70vh] p-5 rounded-2xl bg-night-950/95 border border-night-700/90 backdrop-blur-xl shadow-2xl overflow-y-auto"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between pb-2 border-b border-night-800">
                  <span className="text-[10px] font-mono tracking-widest text-gold-warm uppercase">
                    FIG. {String(safeIndex + 1).padStart(2, "0")} · {activePhoto.bengaliTitle}
                  </span>
                  <button
                    onClick={() => setShowInfo(false)}
                    className="p-1 text-warm-dark hover:text-warm-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <h3 className="font-display text-lg text-warm-white font-normal leading-snug">
                  {activePhoto.title}
                </h3>

                <p className="font-serif text-sm text-warm-gray leading-relaxed font-light">
                  {activePhoto.caption}
                </p>

                {/* <div className="pt-2 border-t border-night-800/80 space-y-1.5 text-xs font-mono text-warm-dark">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Camera className="w-3 h-3 mr-1.5 text-gold-warm" />
                      Atmosphere:
                    </span>
                    <span className="text-warm-gray">100% Night Capture</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="flex items-center">
                      <Layers className="w-3 h-3 mr-1.5 text-gold-warm" />
                      Resolution:
                    </span>
                    <span className="text-warm-gray">
                      {activePhoto.width} × {activePhoto.height} px
                    </span>
                  </div>

                  <div className="text-[11px] text-warm-dark font-sans pt-1">
                    {activePhoto.details}
                  </div>
                </div> */}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="relative z-30 w-full py-2.5 px-4 sm:px-6 bg-night-950/90 border-t border-night-800/80 flex items-center justify-center">
        <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar max-w-4xl py-1">
          {photos.map((p, idx) => (
            <button
              key={p.id}
              onClick={() => {
                setImageLoaded(false);
                onSelectPhoto(p);
              }}
              className={`relative flex-shrink-0 w-12 sm:w-14 h-8 sm:h-9 rounded-sm overflow-hidden border transition-all ${
                p.id === activePhoto.id
                  ? "border-gold-warm scale-110 shadow-lg ring-1 ring-gold-warm"
                  : "border-night-700/60 opacity-40 hover:opacity-100 hover:border-night-500"
              }`}
              title={p.title}
              aria-label={`View photo ${idx + 1}: ${p.title}`}
            >
              <Image
                src={p.src}
                alt={p.title}
                fill
                unoptimized
                sizes="56px"
                className="object-cover object-center"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
