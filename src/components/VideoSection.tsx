"use client";

import { IoPlay, IoPause, IoExpand } from "react-icons/io5";
import { motion } from "framer-motion";
import { useState, useRef } from "react";
import ScrollAnimation from "./ScrollAnimation";
import SectionDivider from "./SectionDivider";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleToggle = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  return (
    <section className="section-container bg-white" id="video">
      <ScrollAnimation>
        <SectionDivider />
        <h2 className="section-title">Video Kỷ Niệm</h2>
        <p className="text-center text-gray-500 mb-10 max-w-md mx-auto text-sm">
          Những khoảnh khắc đáng nhớ của chúng tôi
        </p>
      </ScrollAnimation>

      <ScrollAnimation className="w-full max-w-3xl mx-auto px-4">
        <div className="relative rounded-xl md:rounded-2xl overflow-hidden shadow-2xl bg-black">
          <div className="relative w-full" style={{ paddingBottom: '177.78%' }}>
            <video
              ref={videoRef}
              src="/video/0412.mp4"
              className="absolute inset-0 w-full h-full object-cover"
              playsInline
              preload="metadata"
              poster=""
              onEnded={() => setIsPlaying(false)}
              onClick={handleToggle}
            />

            {/* Play overlay */}
            {!isPlaying && (
              <motion.div
                className="absolute inset-0 flex flex-col items-center justify-center bg-black/30 cursor-pointer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={handlePlay}
              >
                <motion.button
                  className="w-20 h-20 bg-wedding-red/90 rounded-full flex items-center justify-center shadow-xl backdrop-blur-sm"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <IoPlay className="text-white text-3xl ml-1" />
                </motion.button>
                <p className="text-white/80 text-sm mt-4 font-medium">
                  Nhấn để xem video
                </p>
              </motion.div>
            )}

            {/* Controls overlay when playing */}
            {isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-center justify-between">
                <button onClick={handleToggle} className="text-white p-2">
                  <IoPause className="text-xl" />
                </button>
                <button onClick={handleFullscreen} className="text-white p-2">
                  <IoExpand className="text-xl" />
                </button>
              </div>
            )}
          </div>
        </div>
      </ScrollAnimation>
    </section>
  );
}
