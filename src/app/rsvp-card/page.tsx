"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";

const GROOM_NAME = "Quân";
const BRIDE_NAME = "Na";

const relationText: Record<string, string> = {
  "ban-co-dau": "Bạn của cô dâu",
  "ban-chu-re": "Bạn của chú rể",
  "dong-nghiep": "Đồng nghiệp",
  "nguoi-than": "Người thân",
};

const events = [
  {
    title: "Lễ Vu Quy",
    date: "02 Tháng 05, 2026",
    time: "08:00 - 10:00",
    venue: "Tư gia nhà gái",
    address: "Thôn Vĩnh Thạnh, Xã Hoà Trí, Ninh Hoà, Khánh Hoà",
  },
  {
    title: "Lễ Thành Hôn",
    date: "02 Tháng 05, 2026",
    time: "11:00 - 13:00",
    venue: "Tư gia nhà trai",
    address: "Thôn Vĩnh Thạnh, Xã Hoà Trí, Ninh Hoà, Khánh Hoà",
  },
  {
    title: "Tiệc Cưới",
    date: "02 Tháng 05, 2026",
    time: "17:30 - 21:00",
    venue: "Nhà hàng tiệc cưới",
    address: "Thôn Vĩnh Thạnh, Xã Hoà Trí, Ninh Hoà, Khánh Hoà",
  },
];

function CardContent() {
  const sp = useSearchParams();
  const name = (sp.get("name") || "").trim();
  const relation = sp.get("relation") || "";
  const attending = sp.get("attending") === "no" ? "no" : "yes";

  const role = relationText[relation] || "";
  const salutation = [role, name].filter(Boolean).join(" ");

  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4 py-10 bg-[#d1132b]">
      <motion.div
        className="w-full max-w-[430px] relative"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {/* floral-ish top decoration */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-[92%] h-16 bg-white/20 blur-2xl rounded-full" />

        <div className="rounded-[28px] overflow-hidden shadow-2xl border border-white/30 bg-[#f8f4f2]">
          {/* header band */}
          <div className="px-8 pt-10 pb-6 bg-[#f8f4f2] relative">
            <div className="absolute right-6 top-6 w-14 h-14 rounded-full bg-[#d1132b]/10" />
            <div className="absolute left-6 top-8 w-10 h-10 rounded-full bg-[#d1132b]/10" />

            <p className="text-center text-xs tracking-[0.32em] uppercase text-[#7a0b18]/70">
              Wedding Invitation
            </p>
            <h1 className="text-center font-playfair text-4xl leading-tight text-[#7a0b18] mt-3">
              {GROOM_NAME}
              <span className="mx-2 text-[#d1132b]">&</span>
              {BRIDE_NAME}
            </h1>

            <div className="mt-5 flex items-center justify-center gap-2">
              <span className="h-px w-10 bg-[#d1132b]/30" />
              <span className="text-[#d1132b]">♥</span>
              <span className="h-px w-10 bg-[#d1132b]/30" />
            </div>

            <div className="mt-6 text-center">
              <p className="text-sm text-[#7a0b18]/70">Trân trọng kính mời</p>
              <p className="mt-1 font-playfair text-2xl text-[#7a0b18]">
                {salutation || "Quý khách"}
              </p>
              <p className="mt-2 text-xs text-[#7a0b18]/60">
                {attending === "yes"
                  ? "Cảm ơn bạn đã xác nhận tham dự"
                  : "Cảm ơn bạn đã phản hồi (không thể đến)"}
              </p>
            </div>
          </div>

          {/* red panel like sample */}
          <div className="px-8 py-8 bg-[#7a0b18] text-[#f8f4f2] relative">
            <div className="absolute inset-0 opacity-15">
              <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white blur-3xl" />
              <div className="absolute -bottom-16 -left-16 w-56 h-56 rounded-full bg-white blur-3xl" />
            </div>

            <div className="relative">
              <p className="text-xs tracking-[0.28em] uppercase opacity-80">
                Thời gian & Địa điểm
              </p>

              <div className="mt-5 space-y-5">
                {events.map((e) => (
                  <div key={e.title} className="rounded-2xl border border-white/20 p-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-playfair text-xl">{e.title}</p>
                      <p className="text-xs opacity-80">{e.date}</p>
                    </div>
                    <p className="mt-2 text-sm opacity-95">{e.time}</p>
                    <p className="mt-1 text-sm opacity-95">{e.venue}</p>
                    <p className="mt-1 text-xs opacity-80">{e.address}</p>
                  </div>
                ))}
              </div>

              <div className="mt-7 text-center">
                <p className="text-xs tracking-[0.28em] uppercase opacity-80">
                  Hân hạnh được đón tiếp
                </p>
                <p className="mt-2 font-playfair text-lg opacity-95">
                  02 . 05 . 2026
                </p>
              </div>
            </div>
          </div>

          {/* footer */}
          <div className="px-8 py-7 bg-[#f8f4f2]">
            <a
              href="/invitation"
              className="wedding-btn w-full flex items-center justify-center gap-2"
            >
              Xem thiệp cưới đầy đủ
            </a>
            <p className="text-center text-xs text-[#7a0b18]/50 mt-4">
              Cảm ơn bạn đã phản hồi.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function RSVPCardPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#d1132b] text-white">
          Đang tải thiệp...
        </div>
      }
    >
      <CardContent />
    </Suspense>
  );
}

