"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaTimes, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import ScrollAnimation from "./ScrollAnimation";
import SectionDivider from "./SectionDivider";

const photos = [
  { src: "/images/gallery/photo1.jpg", alt: "Ảnh cưới 1" },
  { src: "/images/gallery/photo2.jpg", alt: "Ảnh cưới 2" },
  { src: "/images/gallery/photo3.jpg", alt: "Ảnh cưới 3" },
  { src: "/images/gallery/photo4.jpg", alt: "Ảnh cưới 4" },
  { src: "/images/gallery/photo5.jpg", alt: "Ảnh cưới 5" },
  { src: "/images/gallery/photo6.jpg", alt: "Ảnh cưới 6" },
];

export default function PhotoGallery() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setSelectedIndex(index);
  const closeLightbox = () => setSelectedIndex(null);

  const goNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % photos.length);
    }
  };

  const goPrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + photos.length) % photos.length);
    }
  };

  return (
    <section className="section-container bg-white" id="gallery">
      <ScrollAnimation>
        <SectionDivider />
        <h2 className="section-title">Album Ảnh Cưới</h2>
        <p className="text-center text-gray-500 mb-10 max-w-md mx-auto text-sm">
          Những khoảnh khắc đẹp nhất của chúng tôi
        </p>
      </ScrollAnimation>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 max-w-4xl mx-auto w-full px-2">
        {photos.map((photo, index) => (
          <ScrollAnimation key={index} delay={index * 0.1}>
            <motion.div
              className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group shadow-md"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => openLightbox(index)}
            >
              {/* Placeholder - replace with actual images */}
              <div className="w-full h-full bg-gradient-to-br from-wedding-pink to-wedding-pink-light flex items-center justify-center">
                <div className="text-center">
                  <span className="text-4xl block mb-2">📸</span>
                  <span className="text-xs text-wedding-red/50">
                    Ảnh {index + 1}
                  </span>
                </div>
              </div>
              {/* Uncomment for real images:
              <Image src={photo.src} alt={photo.alt} fill className="object-cover" loading="lazy" /> */}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-wedding-red/0 group-hover:bg-wedding-red/20 transition-all duration-300 flex items-center justify-center">
                <motion.span
                  className="text-white text-3xl opacity-0 group-hover:opacity-100 transition-opacity"
                  initial={false}
                >
                  🌸
                </motion.span>
              </div>
            </motion.div>
          </ScrollAnimation>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white text-2xl z-10 p-2"
              onClick={closeLightbox}
            >
              <FaTimes />
            </button>

            <button
              className="absolute left-2 md:left-4 text-white text-xl z-10 p-3 bg-white/10 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
            >
              <FaChevronLeft />
            </button>

            <motion.div
              key={selectedIndex}
              className="max-w-3xl max-h-[80vh] w-full aspect-square relative rounded-xl overflow-hidden"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="w-full h-full bg-gradient-to-br from-wedding-pink to-wedding-pink-light flex items-center justify-center">
                <div className="text-center">
                  <span className="text-6xl block mb-3">📸</span>
                  <span className="text-white/70 text-sm">
                    {photos[selectedIndex].alt}
                  </span>
                </div>
              </div>
              {/* Uncomment for real images:
              <Image src={photos[selectedIndex].src} alt={photos[selectedIndex].alt} fill className="object-contain" /> */}
            </motion.div>

            <button
              className="absolute right-2 md:right-4 text-white text-xl z-10 p-3 bg-white/10 rounded-full"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
            >
              <FaChevronRight />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-6 flex gap-2">
              {photos.map((_, i) => (
                <button
                  key={i}
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === selectedIndex ? "bg-white w-6" : "bg-white/50"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedIndex(i);
                  }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
