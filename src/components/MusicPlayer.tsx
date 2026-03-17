"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

const MUSIC_SRC = "/music/paulyudin-wedding-485932.mp3";
const STORAGE_KEY = "wedding_bgm_enabled";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [autoplayHint, setAutoplayHint] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const enabled =
      typeof window !== "undefined"
        ? (window.localStorage.getItem(STORAGE_KEY) ??
            (() => {
              try {
                window.localStorage.setItem(STORAGE_KEY, "1");
              } catch {}
              return "1";
            })()) !== "0"
        : true;

    const tryPlay = async () => {
      if (!enabled) return;
      const el = audioRef.current;
      if (!el || isPlaying) return;

      el.volume = 0.6;
      try {
        await el.play();
        setIsPlaying(true);
        setAutoplayHint(false);
      } catch {
        // Most mobile browsers block autoplay with sound.
        // We'll show a hint and retry on first interaction.
        setAutoplayHint(true);
      }
    };

    void tryPlay();

    const handleInteraction = () => {
      if (!enabled) return;
      if (audioRef.current && !isPlaying) {
        audioRef.current.volume = 0.6;
        audioRef.current
          .play()
          .then(() => {
            setIsPlaying(true);
            setAutoplayHint(false);
          })
          .catch(() => {
            // Autoplay blocked by browser
          });
      }
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };

    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);

    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [isPlaying]);

  const toggleMusic = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      try {
        window.localStorage.setItem(STORAGE_KEY, "0");
      } catch {}
    } else {
      audioRef.current.volume = 0.6;
      audioRef.current.play();
      try {
        window.localStorage.setItem(STORAGE_KEY, "1");
      } catch {}
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={MUSIC_SRC}
        loop
        preload="metadata"
        playsInline
      />

      <motion.button
        className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-wedding-red rounded-full flex items-center justify-center shadow-xl"
        onClick={toggleMusic}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={isPlaying ? { scale: [1, 1.1, 1] } : {}}
        transition={
          isPlaying
            ? { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            : {}
        }
      >
        <FaHeart
          className={`text-white text-lg transition-opacity ${
            isPlaying ? "opacity-100" : "opacity-50"
          }`}
        />

        {/* Sound wave animation */}
        {isPlaying && (
          <div className="absolute -top-1 -right-1">
            <motion.div
              className="w-3 h-3 bg-wedding-red rounded-full"
              animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        )}
      </motion.button>

      {/* Music status tooltip */}
      {!isPlaying && autoplayHint && (
        <motion.div
          className="fixed bottom-20 right-4 z-50 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-xs text-wedding-red"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          🎵 Chạm để bật nhạc
        </motion.div>
      )}
    </>
  );
}
