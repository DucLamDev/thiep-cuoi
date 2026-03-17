"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FaHeart, FaCheck, FaUser, FaPhone } from "react-icons/fa";
import ScrollAnimation from "./ScrollAnimation";
import SectionDivider from "./SectionDivider";

export default function RSVP() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    attending: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrate with backend/API
    console.log("RSVP submitted:", formData);
    setIsSubmitted(true);
  };

  return (
    <section className="section-container gradient-bg" id="rsvp">
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
                  <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-wedding-red/50 text-sm" />
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
                  <FaPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-wedding-red/50 text-sm" />
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
                      { value: "yes", label: "Sẽ tham dự", icon: "🎉" },
                      { value: "no", label: "Không thể đến", icon: "😢" },
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
                  <FaHeart className="text-sm" />
                  Gửi xác nhận
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              className="wedding-card text-center py-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: "spring" }}
            >
              <motion.div
                className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <FaCheck className="text-green-500 text-3xl" />
              </motion.div>
              <h3 className="font-playfair text-2xl text-wedding-red mb-3">
                Cảm ơn bạn!
              </h3>
              <p className="text-gray-500 text-sm max-w-xs mx-auto">
                Chúng tôi đã nhận được phản hồi của bạn. Cảm ơn bạn rất nhiều!
              </p>
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
