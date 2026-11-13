"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

export default function ProgressIndicator({ activeChapter }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (latest) => {
      setPercentage(Math.round(latest * 100));
    });
  }, [scrollYProgress]);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 pointer-events-none">
      {/* Top golden progress track */}
      <div className="w-full h-[2px] bg-night-800">
        <motion.div
          className="h-full bg-gradient-to-r from-gold-dark via-gold-warm to-gold-light origin-left"
          style={{ scaleX }}
        />
      </div>

      {/* Floating subtle chapter pill on bottom right (mobile/desktop friendly) */}
      <div className="fixed bottom-6 right-6 z-40 pointer-events-auto">
        <div className="flex items-center space-x-3 px-3 py-1.5 rounded-full bg-night-950/80 backdrop-blur-md border border-night-700/60 text-xs font-mono tracking-wider text-warm-gray shadow-2xl">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-warm animate-pulse" />
          <span className="text-warm-white/90 font-sans text-[11px] uppercase tracking-widest hidden sm:inline">
            {activeChapter ? activeChapter.title : "Prologue"}
          </span>
          <span className="text-gold-warm/90">{percentage}%</span>
        </div>
      </div>
    </div>
  );
}
