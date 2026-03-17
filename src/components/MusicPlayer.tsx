"use client";

import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { FaHeart } from "react-icons/fa";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const handleInteraction = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
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
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <>
      <audio ref={audioRef} src="/music/wedding-bgm.mp3" loop preload="auto" />

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
      {!isPlaying && (
        <motion.div
          className="fixed bottom-20 right-4 z-50 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg text-xs text-wedding-red"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 2 }}
        >
          🎵 Nhấn để bật nhạc
        </motion.div>
      )}
    </>
  );
}
