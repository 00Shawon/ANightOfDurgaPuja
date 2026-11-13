"use client";

import { motion } from "framer-motion";
import EditorialImageLayout from "./EditorialImageLayout";
import HorizontalPhotoSequence from "./HorizontalPhotoSequence";
import { photos } from "@/data/photos";

export default function StoryChapter({ chapter, onOpenLightbox }) {
  // Find photos for this chapter
  const chapterPhotos = chapter.photoIds
    .map((id) => photos.find((p) => p.id === id))
    .filter(Boolean);

  return (
    <section id={chapter.id} className="relative w-full py-20 md:py-32 border-b border-night-800/80">
      {/* Chapter Title / Curatorial Transition */}
      <div className="max-w-4xl mx-auto px-6 md:px-12 mb-16 md:mb-24 text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center md:justify-start space-x-3 text-xs font-mono tracking-[0.3em] uppercase text-gold-warm">
            <span>Chapter {chapter.number}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold-warm/60" />
            <span className="font-sans italic text-warm-dark">{chapter.bengaliTitle}</span>
          </div>

          <h2 className="mt-3 font-display text-3xl sm:text-4xl md:text-5xl text-warm-white font-light tracking-wide">
            {chapter.title}
          </h2>

          <p className="mt-2 font-serif text-lg md:text-xl text-gold-light/90 italic font-light">
            {chapter.subtitle}
          </p>

          <p className="mt-6 font-serif text-base sm:text-lg text-warm-gray leading-relaxed font-light max-w-3xl">
            {chapter.intro}
          </p>
        </motion.div>
      </div>

      {/* Custom Chapter Compositions */}
      {chapter.id === "chapter-1" && (
        <div className="space-y-12 md:space-y-20">
          {/* Photo 1: Solitary devotion - Large portrait feature */}
          {chapterPhotos[0] && (
            <EditorialImageLayout
              photo={chapterPhotos[0]}
              layout="asymmetric-left"
              figureNumber="02"
              onOpenLightbox={onOpenLightbox}
            />
          )}

          {/* Photo 2: Full-width cinematic pandal illumination */}
          {chapterPhotos[1] && (
            <EditorialImageLayout
              photo={chapterPhotos[1]}
              layout="full-cinematic"
              figureNumber="03"
              onOpenLightbox={onOpenLightbox}
            />
          )}

          {/* Photos 3 & 4: Side-by-side comparison (Electric Darshan & Threshold) */}
          <div className="max-w-6xl mx-auto px-6 md:px-8 my-16 md:my-24">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              {chapterPhotos[2] && (
                <EditorialImageLayout
                  photo={chapterPhotos[2]}
                  layout="portrait-feature"
                  figureNumber="04"
                  onOpenLightbox={onOpenLightbox}
                />
              )}
              {chapterPhotos[3] && (
                <EditorialImageLayout
                  photo={chapterPhotos[3]}
                  layout="portrait-feature"
                  figureNumber="05"
                  onOpenLightbox={onOpenLightbox}
                />
              )}
            </div>
          </div>
        </div>
      )}

      {chapter.id === "chapter-2" && (
        <div className="space-y-12 md:space-y-20">
          {/* Dual intimate spread: Flame and Hand */}
          <div className="max-w-6xl mx-auto px-6 md:px-8 my-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              {chapterPhotos[0] && (
                <EditorialImageLayout
                  photo={chapterPhotos[0]}
                  layout="portrait-feature"
                  figureNumber="06"
                  onOpenLightbox={onOpenLightbox}
                />
              )}
              {chapterPhotos[1] && (
                <EditorialImageLayout
                  photo={chapterPhotos[1]}
                  layout="portrait-feature"
                  figureNumber="07"
                  onOpenLightbox={onOpenLightbox}
                />
              )}
            </div>
          </div>

          {/* Dhunuchi silhouette dancer feature */}
          {chapterPhotos[2] && (
            <EditorialImageLayout
              photo={chapterPhotos[2]}
              layout="asymmetric-left"
              figureNumber="08"
              onOpenLightbox={onOpenLightbox}
            />
          )}

          {/* Horizontal Photo Sequence for the Fire & Trance progression */}
          <HorizontalPhotoSequence
            title="Sequence: The Aarti & The Flying Embers"
            bengaliTitle="ধুনুচি নাচের গতিময় রূপ"
            subtitle="Follow the crescendo from the quiet flame to ecstatic midnight sparks"
            photos={chapterPhotos}
            onOpenLightbox={onOpenLightbox}
          />

          {/* Flying Embers landscape climax */}
          {chapterPhotos[3] && (
            <EditorialImageLayout
              photo={chapterPhotos[3]}
              layout="full-cinematic"
              figureNumber="09"
              onOpenLightbox={onOpenLightbox}
            />
          )}
        </div>
      )}

      {chapter.id === "chapter-3" && (
        <div className="space-y-12 md:space-y-20">
          {/* Mother and child - Portrait feature */}
          {chapterPhotos[0] && (
            <EditorialImageLayout
              photo={chapterPhotos[0]}
              layout="asymmetric-right"
              figureNumber="10"
              onOpenLightbox={onOpenLightbox}
            />
          )}

          {/* Scarlet Glow & Priests' Selfie - alternating layouts */}
          <div className="max-w-6xl mx-auto px-6 md:px-8 my-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              {chapterPhotos[1] && (
                <EditorialImageLayout
                  photo={chapterPhotos[1]}
                  layout="portrait-feature"
                  figureNumber="11"
                  onOpenLightbox={onOpenLightbox}
                />
              )}
              {chapterPhotos[3] && (
                <EditorialImageLayout
                  photo={chapterPhotos[3]}
                  layout="portrait-feature"
                  figureNumber="12"
                  onOpenLightbox={onOpenLightbox}
                />
              )}
            </div>
          </div>

          {/* Chiaroscuro of Faith - Solitary elderly woman portrait */}
          {chapterPhotos[2] && (
            <EditorialImageLayout
              photo={chapterPhotos[2]}
              layout="asymmetric-left"
              figureNumber="13"
              onOpenLightbox={onOpenLightbox}
            />
          )}
        </div>
      )}

      {chapter.id === "chapter-4" && (
        <div className="space-y-12 md:space-y-20">
          {/* Bioscope Man and Clay Toys - Street Life */}
          <div className="max-w-6xl mx-auto px-6 md:px-8 my-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start">
              {chapterPhotos[0] && (
                <EditorialImageLayout
                  photo={chapterPhotos[0]}
                  layout="portrait-feature"
                  figureNumber="14"
                  onOpenLightbox={onOpenLightbox}
                />
              )}
              {chapterPhotos[1] && (
                <EditorialImageLayout
                  photo={chapterPhotos[1]}
                  layout="portrait-feature"
                  figureNumber="15"
                  onOpenLightbox={onOpenLightbox}
                />
              )}
            </div>
          </div>

          {/* The Papad Seller - Mother and child on curb */}
          {chapterPhotos[2] && (
            <EditorialImageLayout
              photo={chapterPhotos[2]}
              layout="asymmetric-right"
              figureNumber="16"
              onOpenLightbox={onOpenLightbox}
            />
          )}
        </div>
      )}
    </section>
  );
}
