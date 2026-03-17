"use client";

import { motion } from "framer-motion";

export default function SectionDivider() {
  return (
    <motion.div
      className="flex items-center justify-center gap-3 py-4"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <span className="text-wedding-pink-dark text-lg">🌸</span>
      <div className="w-16 h-[1px] bg-gradient-to-r from-transparent to-wedding-pink-dark" />
      <span className="text-wedding-red text-xl">❤</span>
      <div className="w-16 h-[1px] bg-gradient-to-l from-transparent to-wedding-pink-dark" />
      <span className="text-wedding-pink-dark text-lg">🌸</span>
    </motion.div>
  );
}
