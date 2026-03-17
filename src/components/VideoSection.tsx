"use client";

import { FaPlay } from "react-icons/fa";
import { motion } from "framer-motion";
import { useState } from "react";
import ScrollAnimation from "./ScrollAnimation";
import SectionDivider from "./SectionDivider";

export default function VideoSection() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="section-container bg-white" id="video">
      <ScrollAnimation>
        <SectionDivider />
        <h2 className="section-title">Video Kỷ Niệm</h2>
        <p className="text-center text-gray-500 mb-10 max-w-md mx-auto text-sm">
          Những khoảnh khắc đáng nhớ của chúng tôi
        </p>
      </ScrollAnimation>

      <ScrollAnimation className="w-full max-w-lg mx-auto">
        <div className="wedding-card p-3">
          <div className="relative aspect-video rounded-xl overflow-hidden bg-gradient-to-br from-wedding-pink to-wedding-red/10">
            {!isPlaying ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-6xl mb-4">🎬</div>
                <motion.button
                  className="w-16 h-16 bg-wedding-red rounded-full flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsPlaying(true)}
                >
                  <FaPlay className="text-white text-lg ml-1" />
                </motion.button>
                <p className="text-wedding-red/60 text-sm mt-4">
                  Nhấn để xem video
                </p>
              </div>
            ) : (
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
                title="Wedding Video"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        </div>
      </ScrollAnimation>

      <ScrollAnimation delay={0.2}>
        <p className="text-center text-gray-400 text-xs mt-6 max-w-sm mx-auto">
          * Thay link YouTube bằng video kỷ niệm của bạn
        </p>
      </ScrollAnimation>
    </section>
  );
}
