"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IoClose, IoChevronBack, IoChevronForward } from "react-icons/io5";
import Image from "next/image";
import ScrollAnimation from "./ScrollAnimation";
import SectionDivider from "./SectionDivider";

const photos = [
  { src: "/images/anhcuoi/anh-co-dau-va-chu-re-nhin-nhau.jpg", alt: "Cô dâu và chú rể nhìn nhau" },
  { src: "/images/anhcuoi/anh-co-dau-va-chu-re-ke-ben-nhau.jpg", alt: "Cô dâu và chú rể kề bên nhau" },
  { src: "/images/anhcuoi/anh-co-dau-va-chu-re-chi-nhan-tren-tay.jpg", alt: "Cô dâu và chú rể chỉ nhẫn" },
  { src: "/images/anhcuoi/chu-re-trao-nhan-cho-co-dau.jpg", alt: "Chú rể trao nhẫn cho cô dâu" },
  { src: "/images/anhcuoi/co-dau-trao-nhan-cho-chu-re.jpg", alt: "Cô dâu trao nhẫn cho chú rể" },
  { src: "/images/anhcuoi/anh-cong-dam-hoi.jpg", alt: "Cổng đám hỏi" },
  { src: "/images/anhcuoi/anh-hoa-cam-tay.jpg", alt: "Hoa cầm tay" },
  { src: "/images/anhcuoi/anh-ly-ruou.jpg", alt: "Ly rượu" },
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
              whileHover={{ scale: 1.05, rotate: 1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => openLightbox(index)}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image 
                src={photo.src} 
                alt={photo.alt} 
                fill 
                className="object-cover transition-transform duration-500 group-hover:scale-110" 
                sizes="(max-width: 768px) 50vw, 33vw"
              />

              {/* Hover overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-wedding-red/60 via-wedding-red/0 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-4">
                <motion.p
                  className="text-white text-sm font-medium px-3 text-center"
                  initial={{ y: 20, opacity: 0 }}
                  whileHover={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {photo.alt}
                </motion.p>
              </div>
              
              {/* Decorative corner */}
              <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-white/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
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
            <motion.button
              className="absolute top-4 right-4 text-white text-3xl z-10 p-3 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all"
              onClick={closeLightbox}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoClose />
            </motion.button>

            <motion.button
              className="absolute left-2 md:left-4 text-white text-2xl z-10 p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all"
              onClick={(e) => {
                e.stopPropagation();
                goPrev();
              }}
              whileHover={{ scale: 1.1, x: -5 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoChevronBack />
            </motion.button>

            <motion.div
              key={selectedIndex}
              className="max-w-4xl w-full relative"
              initial={{ scale: 0.8, opacity: 0, rotateY: -10 }}
              animate={{ scale: 1, opacity: 1, rotateY: 0 }}
              exit={{ scale: 0.8, opacity: 0, rotateY: 10 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full aspect-[3/4] md:aspect-video rounded-2xl overflow-hidden shadow-2xl bg-black/50">
                <Image 
                  src={photos[selectedIndex].src} 
                  alt={photos[selectedIndex].alt} 
                  fill 
                  className="object-contain"
                  sizes="90vw"
                  priority
                />
              </div>
              <motion.p
                className="text-white text-center mt-4 text-lg font-playfair"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {photos[selectedIndex].alt}
              </motion.p>
            </motion.div>

            <motion.button
              className="absolute right-2 md:right-4 text-white text-2xl z-10 p-4 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all"
              onClick={(e) => {
                e.stopPropagation();
                goNext();
              }}
              whileHover={{ scale: 1.1, x: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoChevronForward />
            </motion.button>

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
