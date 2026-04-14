"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { IoHeart, IoPerson, IoCall } from "react-icons/io5";
import Image from "next/image";
import emailjs from "@emailjs/browser";
import ScrollAnimation from "./ScrollAnimation";
import SectionDivider from "./SectionDivider";

type Attending = "yes" | "no" | "";

type SubmitFx = "none" | "yes" | "no";

function FireworksOverlay() {
  const particles = Array.from({ length: 28 }).map((_, i) => i);
  return (
    <motion.div
      className="fixed inset-0 z-[200] pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      {/* Burst center */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/10" />
      {particles.map((i) => {
        const angle = (i / particles.length) * Math.PI * 2;
        const distance = 120 + (i % 7) * 18;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        const colors = ["#b91c1c", "#f472b6", "#fb7185", "#f59e0b", "#ec4899"];
        return (
          <motion.span
            key={i}
            className="absolute left-1/2 top-[35%] w-2 h-2 rounded-full"
            style={{ backgroundColor: colors[i % colors.length] }}
            initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            animate={{
              x,
              y,
              scale: [0, 1.2, 0.8],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 1.1,
              ease: "easeOut",
              delay: 0.05 + (i % 6) * 0.015,
            }}
          />
        );
      })}
      <motion.div
        className="absolute left-1/2 top-[35%] -translate-x-1/2 -translate-y-1/2 text-5xl"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: [0.6, 1.1, 1], opacity: [0, 1, 0] }}
        transition={{ duration: 1.1, ease: "easeOut" }}
      >
        🎆
      </motion.div>
    </motion.div>
  );
}

function SadOverlay() {
  return (
    <motion.div
      className="fixed inset-0 z-[200] pointer-events-none flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
    >
      <motion.div
        className="text-center"
        initial={{ scale: 0.7, y: 10, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
      >
        <motion.div
          className="text-7xl"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 0.8, repeat: 2 }}
        >
          😢
        </motion.div>
        <motion.p
          className="mt-3 text-sm text-wedding-red/70"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          Hẹn gặp bạn dịp gần nhất nhé
        </motion.p>
      </motion.div>
    </motion.div>
  );
}

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attending: "" as Attending,
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitFx, setSubmitFx] = useState<SubmitFx>("none");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;
    setSubmitError(null);

    try {
      setIsSubmitting(true);

      // Gửi email qua EmailJS
      await emailjs.send(
        "service_j1alcii",
        "template_0lelbm7",
        {
          from_name: formData.name,
          phone: formData.phone,
          attending: formData.attending === "yes" ? "Sẽ tham dự" : "Không thể đến",
          message: formData.message || "(Không có lời nhắn)",
          page_url: typeof window !== "undefined" ? window.location.href : "",
        },
        "KM3Pben6KGoyNgVH9"
      );

      const fx: SubmitFx = formData.attending === "yes" ? "yes" : "no";
      setSubmitFx(fx);
      setIsSubmitted(true);
    } catch (error: any) {
      console.error("EmailJS Error:", error);
      const errorMessage = error?.text || error?.message || "Gửi thất bại. Vui lòng thử lại.";
      setSubmitError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section-container gradient-bg" id="rsvp">
      <AnimatePresence>
        {submitFx === "yes" && <FireworksOverlay />}
        {submitFx === "no" && <SadOverlay />}
      </AnimatePresence>

      <ScrollAnimation>
        <SectionDivider />
        <h2 className="section-title">Xác Nhận Tham Dự</h2>
        <p className="text-center text-gray-500 mb-10 max-w-md mx-auto text-sm">
          Sự hiện diện của bạn là niềm vinh hạnh của chúng tôi
        </p>
      </ScrollAnimation>

      <ScrollAnimation className="w-full max-w-md mx-auto">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              className="wedding-card"
              exit={{ opacity: 0, y: -20 }}
            >
              {/* Decorative header */}
              <div className="text-center mb-6">
                <span className="text-4xl">💌</span>
                <p className="font-playfair text-lg text-wedding-red mt-2">
                  Phiếu trả lời
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name */}
                <div className="relative">
                  <IoPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-wedding-red/50 text-sm" />
                  <input
                    type="text"
                    placeholder="Họ và tên"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-4 rounded-xl border-2 border-wedding-pink focus:border-wedding-red outline-none transition-colors text-sm bg-white/50"
                  />
                </div>

                {/* Phone */}
                <div className="relative">
                  <IoCall className="absolute left-4 top-1/2 -translate-y-1/2 text-wedding-red/50 text-sm" />
                  <input
                    type="tel"
                    placeholder="Số điện thoại"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full pl-11 pr-4 py-4 rounded-xl border-2 border-wedding-pink focus:border-wedding-red outline-none transition-colors text-sm bg-white/50"
                  />
                </div>

                {/* Attending */}
                <div className="space-y-3">
                  <p className="text-sm text-gray-600 font-medium">
                    Bạn có tham dự không?
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { value: "yes" as const, label: "Sẽ tham dự", icon: "🎉" },
                      { value: "no" as const, label: "Không thể đến", icon: "😢" },
                    ].map((option) => (
                      <motion.button
                        key={option.value}
                        type="button"
                        className={`p-4 rounded-xl border-2 text-center transition-all text-sm ${
                          formData.attending === option.value
                            ? "border-wedding-red bg-wedding-red/5 text-wedding-red"
                            : "border-wedding-pink bg-white/50 text-gray-600 hover:border-wedding-red/50"
                        }`}
                        onClick={() =>
                          setFormData({ ...formData, attending: option.value })
                        }
                        whileTap={{ scale: 0.95 }}
                      >
                        <span className="text-2xl block mb-1">
                          {option.icon}
                        </span>
                        {option.label}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Message */}
                <textarea
                  placeholder="Lời chúc cho cô dâu chú rể (không bắt buộc)"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  rows={3}
                  className="w-full px-4 py-4 rounded-xl border-2 border-wedding-pink focus:border-wedding-red outline-none transition-colors text-sm bg-white/50 resize-none"
                />

                {/* Submit */}
                <motion.button
                  type="submit"
                  className="wedding-btn w-full flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  disabled={!formData.name || !formData.phone || !formData.attending}
                >
                  <IoHeart className="text-sm" />
                  {isSubmitting ? "Đang gửi..." : "Gửi xác nhận"}
                </motion.button>

                {submitError && (
                  <p className="text-center text-sm text-red-600">
                    {submitError}
                  </p>
                )}
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="text-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
            >
              <h3 className="font-playfair text-2xl text-wedding-red mb-4">
                Cảm ơn bạn!
              </h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto mb-6">
                Chúng tôi đã nhận được phản hồi của bạn. Cảm ơn bạn rất nhiều!
              </p>
              <motion.div
                className="relative w-full max-w-sm mx-auto rounded-2xl overflow-hidden shadow-2xl"
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, type: "spring" }}
              >
                <Image
                  src="/images/anh-thiep-cuoi/ec05d0fb-24f5-41df-86dc-84116b1ab9f2.jpg"
                  alt="Thiệp cưới Đình Quân & Hiền Na"
                  width={600}
                  height={900}
                  className="w-full h-auto object-contain rounded-2xl"
                />
              </motion.div>
              <motion.div
                className="mt-6 text-4xl"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                💕
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </ScrollAnimation>
    </section>
  );
}
