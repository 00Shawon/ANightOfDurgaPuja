"use client";

import { useState } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { soundscape } from "@/lib/soundscape";

export default function SoundscapeToggle() {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleSound = () => {
    const active = soundscape.toggle();
    setIsPlaying(active);
  };

  return (
    <button
      onClick={toggleSound}
      type="button"
      className="group relative flex items-center space-x-2 px-3 py-1.5 rounded-full border border-night-700/80 bg-night-900/60 hover:bg-night-800/80 transition-all duration-300 text-xs text-warm-gray hover:text-warm-white focus:outline-none focus:ring-1 focus:ring-gold-warm"
      aria-label={isPlaying ? "Mute ambient soundscape" : "Enable subtle ambient soundscape"}
      title={isPlaying ? "Mute ambient soundscape" : "Enable subtle ambient soundscape (optional)"}
    >
      {isPlaying ? (
        <>
          <div className="flex items-center space-x-0.5 h-3">
            <span className="w-0.5 h-2 bg-gold-warm animate-pulse" />
            <span className="w-0.5 h-3 bg-gold-warm animate-pulse delay-75" />
            <span className="w-0.5 h-1.5 bg-gold-warm animate-pulse delay-150" />
          </div>
          <Volume2 className="w-3.5 h-3.5 text-gold-warm" />
          <span className="font-mono text-[10px] tracking-wider text-gold-warm hidden md:inline">
            AMBIENCE ON
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-3.5 h-3.5 text-warm-dark group-hover:text-warm-gray transition-colors" />
          <span className="font-mono text-[10px] tracking-wider text-warm-dark group-hover:text-warm-gray hidden md:inline">
            SOUND OFF
          </span>
        </>
      )}
    </button>
  );
}
