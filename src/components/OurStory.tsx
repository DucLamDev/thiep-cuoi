"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaHeart, FaCoffee, FaRing } from "react-icons/fa";
import { GiDiamondRing } from "react-icons/gi";
import ScrollAnimation from "./ScrollAnimation";
import SectionDivider from "./SectionDivider";

const timeline = [
  {
    date: "THÁNG 6, 2020",
    title: "Lần Đầu Gặp Nhau",
    description:
      "Chúng tôi gặp nhau lần đầu tại một buổi họp mặt bạn bè. Ánh mắt đầu tiên đã nói lên tất cả.",
    icon: FaHeart,
    side: "left",
  },
  {
    date: "THÁNG 9, 2020",
    title: "Lần Đầu Hẹn Hò",
    description:
      "Buổi hẹn hò đầu tiên tại quán cà phê nhỏ. Chúng tôi nói chuyện đến khi quán đóng cửa.",
    icon: FaCoffee,
    side: "right",
  },
  {
    date: "THÁNG 12, 2024",
    title: "Lời Cầu Hôn",
    description:
      'Dưới ánh hoàng hôn tuyệt đẹp, anh quỳ gối và nói: "Em có muốn làm vợ anh không?"',
    icon: GiDiamondRing,
    side: "left",
  },
  {
    date: "THÁNG 5, 2026",
    title: "Ngày Trọng Đại",
    description:
      "Và bây giờ, chúng tôi sẵn sàng bước vào chương mới của cuộc đời - cùng nhau mãi mãi.",
    icon: FaRing,
    side: "right",
    isFinal: true,
  },
];

export default function OurStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.8], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      className="relative section-container bg-gradient-to-b from-white via-wedding-pink/5 to-white overflow-hidden"
      id="our-story"
    >
      {/* Background Cherry Blossom Branches */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -left-20 top-20 w-64 h-64 opacity-10"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, -50]) }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-wedding-red">
            <path
              d="M10,100 Q50,50 100,80 T190,100"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx={30 + i * 20}
                cy={70 + Math.sin(i) * 20}
                r="8"
                fill="currentColor"
                opacity="0.3"
              />
            ))}
          </svg>
        </motion.div>
        <motion.div
          className="absolute -right-20 bottom-20 w-64 h-64 opacity-10"
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 50]) }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full text-wedding-red">
            <path
              d="M190,100 Q150,150 100,120 T10,100"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
            />
            {[...Array(8)].map((_, i) => (
              <circle
                key={i}
                cx={170 - i * 20}
                cy={130 - Math.sin(i) * 20}
                r="8"
                fill="currentColor"
                opacity="0.3"
              />
            ))}
          </svg>
        </motion.div>
      </div>

      {/* Floating Petals */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-3 h-3 rounded-full bg-gradient-to-br from-wedding-pink to-wedding-pink-dark opacity-30"
            style={{
              left: `${10 + i * 15}%`,
              top: `${-10}%`,
            }}
            animate={{
              y: [0, 800],
              x: [0, Math.sin(i) * 50],
              rotate: [0, 360],
              opacity: [0.3, 0.1, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <ScrollAnimation>
        <SectionDivider />
        <h2 className="section-title">Câu Chuyện Tình Yêu</h2>
        <p className="text-center text-gray-500 mb-16 max-w-md mx-auto text-sm md:text-base px-4">
          Hành trình từ hai người xa lạ đến ngày nắm tay nhau bước vào lễ đường
        </p>
      </ScrollAnimation>

      <div className="relative max-w-4xl mx-auto w-full px-4 pb-16">
        {/* Center Timeline Line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-wedding-pink/30 to-transparent hidden md:block" />
        
        {/* Animated Timeline Line */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-wedding-red via-wedding-red to-transparent hidden md:block"
          style={{ height: lineHeight }}
        />

        {/* Mobile Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-transparent via-wedding-pink/30 to-transparent md:hidden" />
        <motion.div
          className="absolute left-8 top-0 w-[2px] bg-gradient-to-b from-wedding-red via-wedding-red to-transparent md:hidden"
          style={{ height: lineHeight }}
        />

        {timeline.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={index}
              className={`relative mb-20 last:mb-0 md:w-1/2 ${
                item.side === "left"
                  ? "md:pr-12 md:text-right md:ml-0"
                  : "md:pl-12 md:ml-auto"
              }`}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Timeline Node */}
              <motion.div
                className={`absolute top-8 w-14 h-14 rounded-full bg-gradient-to-br from-white to-wedding-pink/20 border-4 border-wedding-red flex items-center justify-center shadow-lg z-10 ${
                  item.side === "left"
                    ? "md:right-0 md:translate-x-1/2 left-1 md:left-auto"
                    : "md:left-0 md:-translate-x-1/2 left-1"
                }`}
                whileInView={{
                  scale: [0, 1.2, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(185, 28, 28, 0)",
                    "0 0 0 10px rgba(185, 28, 28, 0.1)",
                    "0 0 0 0 rgba(185, 28, 28, 0)",
                  ],
                }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.8,
                  delay: index * 0.2,
                  boxShadow: {
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.2 + 0.8,
                  },
                }}
              >
                <Icon className="text-wedding-red text-xl" />
              </motion.div>

              {/* Content Card */}
              <motion.div
                className="ml-20 md:ml-0 relative group"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div
                  className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(252,231,243,0.3) 100%)",
                  }}
                >
                  {/* Sparkle Effect */}
                  <motion.div
                    className="absolute -top-2 -right-2 w-4 h-4 bg-wedding-gold rounded-full opacity-0 group-hover:opacity-100"
                    animate={{
                      scale: [0, 1, 0],
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      delay: index * 0.3,
                    }}
                  />

                  {/* Date Label */}
                  <motion.span
                    className="inline-block text-xs font-semibold tracking-[0.2em] text-wedding-red/70 mb-3"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.3 }}
                  >
                    {item.date}
                  </motion.span>

                  {/* Title */}
                  <h3 className="font-playfair text-2xl md:text-3xl text-wedding-red mb-3 leading-tight">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                    {item.description}
                  </p>

                  {/* Decorative Corner */}
                  <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-wedding-pink/30 rounded-br-lg" />
                </div>
              </motion.div>

              {/* Floating Hearts for Final Milestone */}
              {item.isFinal && (
                <div className="absolute inset-0 pointer-events-none">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: "50%",
                      }}
                      initial={{ opacity: 0, y: 0, scale: 0 }}
                      whileInView={{
                        opacity: [0, 1, 0],
                        y: [0, -100],
                        scale: [0, 1, 0.5],
                      }}
                      viewport={{ once: true }}
                      transition={{
                        duration: 2,
                        delay: index * 0.2 + 0.5 + i * 0.1,
                        ease: "easeOut",
                      }}
                    >
                      <FaHeart className="text-wedding-red text-sm" />
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}

        {/* Final Message */}
        <motion.div
          className="text-center mt-16 relative"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.div
            className="inline-block"
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <p className="font-playfair text-2xl md:text-3xl text-wedding-red italic">
              And our forever begins...
            </p>
          </motion.div>
          
          {/* Decorative Hearts */}
          <div className="flex justify-center gap-3 mt-6">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              >
                <FaHeart className="text-wedding-red/40 text-sm" />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
