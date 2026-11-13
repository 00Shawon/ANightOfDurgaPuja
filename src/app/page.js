"use client";

import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import ProgressIndicator from "@/components/ProgressIndicator";
import HeroSection from "@/components/HeroSection";
import IntroductionSection from "@/components/IntroductionSection";
import StoryChapter from "@/components/StoryChapter";
import ClosingSection from "@/components/ClosingSection";
import PhotographyCredits from "@/components/PhotographyCredits";
import Footer from "@/components/Footer";
import ImageLightbox from "@/components/ImageLightbox";
import { chapters, photos } from "@/data/photos";

export default function Home() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [activeChapterId, setActiveChapterId] = useState(null);

  // Track active chapter during scrolling using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveChapterId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-25% 0px -60% 0px",
        threshold: 0,
      }
    );

    chapters.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    const hero = document.getElementById("hero-section");
    if (hero) observer.observe(hero);

    const closing = document.getElementById("closing-section");
    if (closing) observer.observe(closing);

    return () => observer.disconnect();
  }, []);

  const activeChapter = chapters.find((ch) => ch.id === activeChapterId);

  return (
    <main className="relative min-h-screen bg-night-900 text-warm-white selection:bg-gold-warm/25 selection:text-white">
      {/* Top scroll progress & chapter pill */}
      <ProgressIndicator activeChapter={activeChapter} />

      {/* Main Navigation Header */}
      <Navigation activeChapterId={activeChapterId} />

      {/* Opening / Hero Section with Hero Photograph (01 Canopy of Lights) */}
      <HeroSection onOpenLightbox={(p) => setSelectedPhoto(p)} />

      {/* Curatorial Introduction Section
      <IntroductionSection /> */}

      {/* Main Editorial Photo Essay Chapters (Chapters 1 to 4) */}
      <div className="relative">
        {chapters.map((chapter) => (
          <StoryChapter
            key={chapter.id}
            chapter={chapter}
            onOpenLightbox={(p) => setSelectedPhoto(p)}
          />
        ))}
      </div>

      {/* Closing Narrative Climax (Photo 17 Midnight Artisan) */}
      <ClosingSection onOpenLightbox={(p) => setSelectedPhoto(p)} />

      {/* Behind the Lens & Colophon
      <PhotographyCredits /> */}

      {/* Site Footer */}
      <Footer />

      {/* Fullscreen Interactive Lightbox Modal */}
      {selectedPhoto && (
        <ImageLightbox
          currentPhoto={selectedPhoto}
          onClose={() => setSelectedPhoto(null)}
          onSelectPhoto={(p) => setSelectedPhoto(p)}
        />
      )}
    </main>
  );
}
