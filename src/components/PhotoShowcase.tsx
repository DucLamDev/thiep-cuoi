"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { IoHeart } from "react-icons/io5";
import ScrollAnimation from "./ScrollAnimation";
import SectionDivider from "./SectionDivider";

const showcasePhotos = [
  {
    src: "/images/anhcuoi/anh-co-dau-va-chu-re-nhin-nhau.jpg",
    alt: "Ánh mắt yêu thương",
    caption: "Nhìn nhau thôi cũng đủ hạnh phúc",
  },
  {
    src: "/images/anhcuoi/chu-re-trao-nhan-cho-co-dau.jpg",
    alt: "Trao nhẫn cưới",
    caption: "Lời hứa mãi bên nhau",
  },
  {
    src: "/images/anhcuoi/anh-co-dau-va-chu-re-ke-ben-nhau.jpg",
    alt: "Kề bên nhau",
    caption: "Bên nhau là đủ",
  },
  {
    src: "/images/anhcuoi/co-dau-trao-nhan-cho-chu-re.jpg",
    alt: "Cô dâu trao nhẫn",
    caption: "Em trao anh cả trái tim",
  },
];

const floatingPhotos = [
  { src: "/images/anhcuoi/anh-hoa-cam-tay.jpg", alt: "Hoa cầm tay" },
  { src: "/images/anhcuoi/anh-ly-ruou.jpg", alt: "Ly rượu" },
  { src: "/images/anhcuoi/anh-cong-dam-hoi.jpg", alt: "Cổng đám hỏi" },
  { src: "/images/anhcuoi/anh-co-dau-va-chu-re-chi-nhan-tren-tay.jpg", alt: "Nhẫn cưới" },
];

export default function PhotoShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 5]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -5]);

  return (
    <section
      ref={containerRef}
      className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-wedding-pink/5 to-white"
      id="showcase"
    >
      <ScrollAnimation>
        <SectionDivider />
        <h2 className="section-title">Khoảnh Khắc Đáng Nhớ</h2>
        <p className="text-center text-gray-500 mb-16 max-w-md mx-auto text-sm px-4">
          Mỗi khoảnh khắc bên nhau đều là một kỷ niệm tuyệt đẹp
        </p>
      </ScrollAnimation>

      {/* Cinematic large photo cards with parallax */}
      <div className="max-w-5xl mx-auto px-4 space-y-24">
        {showcasePhotos.map((photo, index) => {
          const isEven = index % 2 === 0;
          return (
            <motion.div
              key={index}
              className={`flex flex-col ${
                isEven ? "md:flex-row" : "md:flex-row-reverse"
              } items-center gap-8 md:gap-12`}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              {/* Photo */}
              <motion.div
                className="relative w-full md:w-3/5 group"
                style={{ y: isEven ? y1 : y2, rotate: isEven ? rotate1 : rotate2 }}
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 60vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                {/* Decorative border */}
                <div className={`absolute -z-10 inset-0 rounded-2xl border-2 border-wedding-red/20 ${
                  isEven ? "translate-x-3 translate-y-3" : "-translate-x-3 translate-y-3"
                }`} />
              </motion.div>

              {/* Caption */}
              <motion.div
                className="w-full md:w-2/5 text-center md:text-left"
                initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="w-8 h-[2px] bg-wedding-red/50" />
                  <IoHeart className="text-wedding-red text-sm" />
                  <div className="w-8 h-[2px] bg-wedding-red/50" />
                </div>
                <h3 className="font-playfair text-2xl md:text-3xl text-wedding-red mb-3">
                  {photo.alt}
                </h3>
                <p className="text-gray-500 text-sm md:text-base italic leading-relaxed">
                  &ldquo;{photo.caption}&rdquo;
                </p>
              </motion.div>
            </motion.div>
          );
        })}
      </div>

      {/* Floating mini gallery strip */}
      <div className="mt-24 overflow-hidden">
        <ScrollAnimation>
          <p className="text-center font-playfair text-lg text-wedding-red/70 mb-8">
            Thêm nhiều khoảnh khắc...
          </p>
        </ScrollAnimation>
        <motion.div
          className="flex gap-4 px-4"
          animate={{ x: [0, -400, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[...floatingPhotos, ...floatingPhotos].map((photo, index) => (
            <motion.div
              key={index}
              className="relative flex-shrink-0 w-48 h-48 md:w-64 md:h-64 rounded-xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                className="object-cover"
                sizes="256px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-wedding-red/40 to-transparent opacity-0 hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                <span className="text-white text-xs font-medium">{photo.alt}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Romantic quote at bottom */}
      <ScrollAnimation className="mt-20 px-4">
        <motion.div
          className="text-center max-w-lg mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <div className="flex justify-center gap-2 mb-4">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -8, 0], opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
              >
                <IoHeart className="text-wedding-red/50 text-xs" />
              </motion.div>
            ))}
          </div>
          <p className="font-playfair text-xl md:text-2xl text-wedding-red/80 italic">
            &ldquo;Tình yêu không phải nhìn nhau, mà cùng nhìn về một hướng&rdquo;
          </p>
        </motion.div>
      </ScrollAnimation>
    </section>
  );
}
