"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import { IoHeart, IoChevronDown } from "react-icons/io5";
import SparkleEffect from "./SparkleEffect";

const WEDDING_DATE = new Date("2026-05-02T10:00:00+07:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const distance = WEDDING_DATE.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  return timeLeft;
}

interface HeroProps {
  guestName?: string;
  relation?: string;
}

export default function Hero({ guestName, relation }: HeroProps) {
  const timeLeft = useCountdown();

  const getGreeting = () => {
    if (!guestName) return null;

    const relationText: Record<string, string> = {
      "ban-co-dau": "bạn của cô dâu",
      "ban-chu-re": "bạn của chú rể",
      "dong-nghiep": "đồng nghiệp",
      "nguoi-than": "người thân",
    };

    const relText = relation ? relationText[relation] || "" : "";

    return (
      <motion.div
        className="wedding-card mb-6 text-center max-w-sm mx-auto"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        <p className="text-wedding-red/70 text-sm mb-1">Thân gửi {relText}</p>
        <p className="font-playfair text-2xl text-wedding-red font-bold mb-2">
          {guestName}
        </p>
        <p className="text-gray-600 text-sm leading-relaxed">
          Chúng tôi rất hạnh phúc khi được mời bạn đến chung vui trong ngày
          trọng đại của mình.
        </p>
      </motion.div>
    );
  };

  const scrollToContent = () => {
    const nextSection = document.getElementById("our-story");
    nextSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-container hero-gradient relative" id="hero">
      <SparkleEffect count={15} />

      {/* Decorative circles */}
      <div className="absolute top-10 left-5 w-32 h-32 bg-wedding-pink/30 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-5 w-40 h-40 bg-wedding-pink-dark/20 rounded-full blur-3xl" />

      <div className="relative z-20 flex flex-col items-center text-center max-w-lg mx-auto w-full">
        {/* Personalized greeting */}
        {getGreeting()}

        {/* Decorative top */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-4"
        >
          <span className="text-4xl">🌸</span>
        </motion.div>

        {/* Title */}
        <motion.p
          className="text-wedding-red/70 text-sm md:text-base tracking-[0.3em] uppercase mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          We&apos;re Getting Married
        </motion.p>

        {/* Wedding photo */}
        <motion.div
          className="relative w-56 h-56 md:w-72 md:h-72 mx-auto my-6"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4, type: "spring" }}
        >
          <div className="w-full h-full rounded-full border-4 border-white shadow-2xl overflow-hidden relative bg-gradient-to-br from-wedding-pink/20 to-white">
            <Image 
              src="/images/anhcuoi/anh-co-dau-va-chu-re-ke-ben-nhau.jpg" 
              alt="Cô dâu & Chú rể Đình Quân & Hiền Na" 
              fill 
              className="object-cover" 
              priority 
            />
          </div>
          {/* Floating hearts around chibi */}
          {[0, 1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute text-wedding-red"
              style={{
                top: `${[10, 70, 20, 80][i]}%`,
                left: `${[-5, 90, 85, -10][i]}%`,
              }}
              animate={{ y: [0, -10, 0], scale: [1, 1.2, 1] }}
              transition={{
                duration: 2,
                delay: i * 0.4,
                repeat: Infinity,
              }}
            >
              <IoHeart className="text-sm" />
            </motion.div>
          ))}
        </motion.div>

        {/* Names */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <h1 className="font-playfair text-5xl md:text-7xl text-wedding-red mb-2">
            Đình Quân
          </h1>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="my-2"
          >
            <IoHeart className="text-wedding-red text-2xl mx-auto" />
          </motion.div>
          <h1 className="font-playfair text-5xl md:text-7xl text-wedding-red">
            Hiền Na
          </h1>
        </motion.div>

        {/* Date */}
        <motion.p
          className="font-poppins text-wedding-red/80 text-lg md:text-xl mt-4 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          02 . 05 . 2026
        </motion.p>

        {/* Countdown */}
        <motion.div
          className="grid grid-cols-4 gap-3 md:gap-5 mt-8 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          {[
            { value: timeLeft.days, label: "Ngày" },
            { value: timeLeft.hours, label: "Giờ" },
            { value: timeLeft.minutes, label: "Phút" },
            { value: timeLeft.seconds, label: "Giây" },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-3 md:p-4 shadow-lg border border-wedding-pink min-w-[70px]"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              <span className="font-playfair text-2xl md:text-3xl text-wedding-red font-bold block">
                {String(item.value).padStart(2, "0")}
              </span>
              <span className="text-xs text-gray-500 uppercase tracking-wider">
                {item.label}
              </span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.button
          className="wedding-btn flex items-center gap-2"
          onClick={scrollToContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <IoHeart className="text-sm" />
          Xem thiệp cưới
        </motion.button>

        {/* Scroll indicator */}
        <motion.div
          className="mt-10"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <IoChevronDown className="text-wedding-red/50 text-xl" />
        </motion.div>
      </div>
    </section>
  );
}
