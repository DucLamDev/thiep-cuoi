"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FaHeart, FaCopy, FaCheck, FaQrcode, FaLink } from "react-icons/fa";
import { QRCodeSVG } from "qrcode.react";
import dynamic from "next/dynamic";

const PetalAnimation = dynamic(() => import("@/components/PetalAnimation"), {
  ssr: false,
});

const relations = [
  { value: "ban-co-dau", label: "Bạn cô dâu" },
  { value: "ban-chu-re", label: "Bạn chú rể" },
  { value: "dong-nghiep", label: "Đồng nghiệp" },
  { value: "nguoi-than", label: "Người thân" },
];

function getShortName(fullName: string): string {
  const parts = fullName.trim().split(/\s+/);
  return parts[parts.length - 1];
}

export default function CreateInvitation() {
  const [name, setName] = useState("");
  const [relation, setRelation] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !relation) return;

    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    const link = `${baseUrl}/invitation?name=${encodeURIComponent(name)}&shortname=${encodeURIComponent(getShortName(name))}&relation=${relation}`;
    setGeneratedLink(link);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(generatedLink);
    } catch {
      const input = document.createElement("input");
      input.value = generatedLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen gradient-bg relative overflow-hidden">
      <PetalAnimation />

      <div className="relative z-20 flex flex-col items-center justify-center min-h-screen px-4 py-10">
        {/* Header */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="text-4xl block mb-3">💌</span>
          <h1 className="font-playfair text-3xl md:text-4xl text-wedding-red mb-2">
            Tạo Thiệp Mời
          </h1>
          <p className="text-gray-500 text-sm max-w-sm mx-auto">
            Tạo thiệp cưới cá nhân hóa cho từng khách mời
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          className="wedding-card w-full max-w-md"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Guest name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaHeart className="inline text-wedding-red text-xs mr-1" />
                Tên khách mời
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="VD: Hồ Đức Lâm"
                required
                className="w-full px-4 py-4 rounded-xl border-2 border-wedding-pink focus:border-wedding-red outline-none transition-colors text-sm bg-white/50"
              />
              {name && (
                <motion.p
                  className="text-xs text-wedding-red/60 mt-1"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  Sẽ hiển thị: &quot;Mời bạn {getShortName(name)}&quot;
                </motion.p>
              )}
            </div>

            {/* Relation */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <FaHeart className="inline text-wedding-red text-xs mr-1" />
                Quan hệ
              </label>
              <div className="grid grid-cols-2 gap-3">
                {relations.map((r) => (
                  <motion.button
                    key={r.value}
                    type="button"
                    className={`p-3 rounded-xl border-2 text-center transition-all text-sm ${
                      relation === r.value
                        ? "border-wedding-red bg-wedding-red/5 text-wedding-red font-medium"
                        : "border-wedding-pink bg-white/50 text-gray-600 hover:border-wedding-red/50"
                    }`}
                    onClick={() => setRelation(r.value)}
                    whileTap={{ scale: 0.95 }}
                  >
                    {r.label}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <motion.button
              type="submit"
              className="wedding-btn w-full flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={!name || !relation}
            >
              <FaLink className="text-sm" />
              Tạo link thiệp cưới
            </motion.button>
          </form>
        </motion.div>

        {/* Generated link */}
        {generatedLink && (
          <motion.div
            className="wedding-card w-full max-w-md mt-6"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring" }}
          >
            <div className="text-center mb-4">
              <span className="text-3xl">🎉</span>
              <p className="font-playfair text-lg text-wedding-red mt-1">
                Link thiệp đã sẵn sàng!
              </p>
            </div>

            {/* Preview */}
            <div className="bg-wedding-pink/20 rounded-xl p-4 mb-4">
              <p className="text-xs text-gray-500 mb-1">Xem trước lời mời:</p>
              <p className="text-sm text-wedding-red italic">
                &quot;Thân gửi bạn {getShortName(name)}, chúng tôi rất hạnh
                phúc khi được mời bạn đến chung vui trong ngày trọng đại.&quot;
              </p>
            </div>

            {/* Link display */}
            <div className="bg-gray-50 rounded-xl p-3 mb-4 overflow-hidden">
              <p className="text-xs text-gray-600 truncate">{generatedLink}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all ${
                  copied
                    ? "bg-green-50 text-green-600 border-2 border-green-200"
                    : "bg-wedding-red text-white"
                }`}
                onClick={handleCopy}
                whileTap={{ scale: 0.95 }}
              >
                {copied ? (
                  <>
                    <FaCheck /> Đã copy!
                  </>
                ) : (
                  <>
                    <FaCopy /> Copy Link
                  </>
                )}
              </motion.button>

              <motion.button
                className="px-4 py-3 rounded-xl border-2 border-wedding-red text-wedding-red text-sm font-medium"
                onClick={() => setShowQR(!showQR)}
                whileTap={{ scale: 0.95 }}
              >
                <FaQrcode className="text-lg" />
              </motion.button>
            </div>

            {/* QR Code */}
            {showQR && (
              <motion.div
                className="mt-4 flex flex-col items-center"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
              >
                <div className="bg-white p-4 rounded-xl shadow-md inline-block">
                  <QRCodeSVG
                    value={generatedLink}
                    size={200}
                    bgColor="#ffffff"
                    fgColor="#b91c1c"
                    level="M"
                  />
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  Quét mã QR để mở thiệp cưới
                </p>
              </motion.div>
            )}
          </motion.div>
        )}

        {/* Back link */}
        <motion.a
          href="/"
          className="mt-8 text-wedding-red/60 text-sm hover:text-wedding-red transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          ← Về trang thiệp cưới
        </motion.a>
      </div>
    </div>
  );
}
