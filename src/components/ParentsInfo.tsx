"use client";

import { motion } from "framer-motion";
import { IoHeart } from "react-icons/io5";
import ScrollAnimation from "./ScrollAnimation";
import SectionDivider from "./SectionDivider";

export default function ParentsInfo() {
  return (
    <section className="section-container bg-white" id="parents">
      <ScrollAnimation>
        <SectionDivider />
        <h2 className="section-title">Thông Tin Gia Đình</h2>
        <p className="text-center text-gray-500 mb-10 max-w-md mx-auto text-sm">
          Sự hiện diện của hai gia đình là niềm vinh hạnh của chúng tôi
        </p>
      </ScrollAnimation>

      <div className="flex flex-col gap-8 max-w-2xl mx-auto w-full">
        {/* Nhà trai */}
        <ScrollAnimation delay={0.2} direction="left">
          <div className="wedding-card">
            <div className="text-center mb-4">
              <span className="text-3xl block mb-2">🤵</span>
              <h3 className="font-playfair text-xl text-wedding-red mb-1">
                Nhà Trai
              </h3>
            </div>
            <div className="space-y-2 text-center">
              <p className="text-gray-700 font-medium">
                Ông: Lê Tiến Phong
              </p>
              <p className="text-gray-700 font-medium">
                Bà: Nguyễn Thị Ngọc Phú
              </p>
              <p className="text-gray-700 font-medium">
                Chú rể: Lê Đình Quân (Út Nam)
              </p>
              <p className="text-gray-500 text-sm">
                Địa chỉ: Thôn Vĩnh Thạnh, Xã Hoà Trí, Ninh Hoà, Khánh Hoà
              </p>
            </div>
          </div>
        </ScrollAnimation>

        {/* Decorative heart */}
        <ScrollAnimation delay={0.3}>
          <div className="flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <IoHeart className="text-wedding-red text-2xl" />
            </motion.div>
          </div>
        </ScrollAnimation>

        {/* Nhà gái */}
        <ScrollAnimation delay={0.4} direction="right">
          <div className="wedding-card">
            <div className="text-center mb-4">
              <span className="text-3xl block mb-2">👰</span>
              <h3 className="font-playfair text-xl text-wedding-red mb-1">
                Nhà Gái
              </h3>
            </div>
            <div className="space-y-2 text-center">
              <p className="text-gray-700 font-medium">
                Bố: Nguyễn Thành Phương
              </p>
              <p className="text-gray-700 font-medium">
                Mẹ: Trần Thị Hương
              </p>
              <p className="text-gray-700 font-medium">
                Cô dâu: Nguyễn Thị Hiền Na (Thứ nữ)
              </p>
              <p className="text-gray-500 text-sm">
                Địa chỉ: Thôn Vĩnh Thạnh, Xã Hoà Trí, Ninh Hoà, Khánh Hoà
              </p>
            </div>
          </div>
        </ScrollAnimation>
      </div>

      {/* Thank you message */}
      <ScrollAnimation delay={0.5} className="mt-8">
        <div className="wedding-card max-w-md mx-auto text-center">
          <p className="text-wedding-red font-playfair text-lg mb-2">
            Trân Trọng Kính Mời
          </p>
          <p className="text-gray-600 text-sm leading-relaxed">
            Sự hiện diện của quý vị là niềm vinh hạnh lớn lao cho gia đình chúng
            tôi. Kính mong quý vị dành thời gian đến chung vui trong ngày trọng
            đại.
          </p>
        </div>
      </ScrollAnimation>
    </section>
  );
}
