"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  FaFacebook,
  FaLink,
  FaCheck,
  FaComment,
} from "react-icons/fa";
import { SiZalo } from "react-icons/si";
import ScrollAnimation from "./ScrollAnimation";
import SectionDivider from "./SectionDivider";

export default function ShareInvitation() {
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      const input = document.createElement("input");
      input.value = shareUrl;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareLinks = [
    {
      name: "Facebook",
      icon: <FaFacebook className="text-xl" />,
      color: "bg-[#1877F2]",
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Messenger",
      icon: <FaComment className="text-xl" />,
      color: "bg-[#0084FF]",
      url: `https://www.facebook.com/dialog/send?link=${encodeURIComponent(shareUrl)}&app_id=291494419107518&redirect_uri=${encodeURIComponent(shareUrl)}`,
    },
    {
      name: "Zalo",
      icon: <SiZalo className="text-xl" />,
      color: "bg-[#0068FF]",
      url: `https://zalo.me/share?url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  return (
    <section className="section-container bg-white" id="share">
      <ScrollAnimation>
        <SectionDivider />
        <h2 className="section-title">Chia Sẻ Thiệp Cưới</h2>
        <p className="text-center text-gray-500 mb-10 max-w-md mx-auto text-sm">
          Hãy chia sẻ niềm vui cùng chúng tôi nhé!
        </p>
      </ScrollAnimation>

      <ScrollAnimation className="w-full max-w-md mx-auto">
        <div className="wedding-card text-center">
          <span className="text-5xl block mb-4">💌</span>

          {/* Share buttons */}
          <div className="flex justify-center gap-4 mb-6">
            {shareLinks.map((link, index) => (
              <motion.a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${link.color} text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg`}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {link.icon}
              </motion.a>
            ))}
          </div>

          {/* Copy link */}
          <motion.button
            className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl transition-all text-sm font-medium ${
              copied
                ? "bg-green-50 text-green-600 border-2 border-green-200"
                : "bg-wedding-pink/30 text-wedding-red border-2 border-wedding-pink hover:border-wedding-red"
            }`}
            onClick={handleCopyLink}
            whileTap={{ scale: 0.97 }}
          >
            {copied ? (
              <>
                <FaCheck /> Đã sao chép link!
              </>
            ) : (
              <>
                <FaLink /> Sao chép link thiệp cưới
              </>
            )}
          </motion.button>
        </div>
      </ScrollAnimation>

      {/* Footer */}
      <ScrollAnimation delay={0.3}>
        <div className="text-center mt-16 pb-8">
          <SectionDivider />
          <p className="font-playfair text-2xl text-wedding-red mt-4 mb-2">
            Quân & Na
          </p>
          <p className="text-gray-400 text-sm">02.05.2026</p>
          <p className="text-gray-400 text-xs mt-4">
            Made with ❤️ for our special day
          </p>
        </div>
      </ScrollAnimation>
    </section>
  );
}
