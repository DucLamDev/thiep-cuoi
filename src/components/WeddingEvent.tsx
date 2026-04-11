"use client";

import { motion } from "framer-motion";
import { IoLocationSharp, IoTime, IoCalendar } from "react-icons/io5";
import ScrollAnimation from "./ScrollAnimation";
import SectionDivider from "./SectionDivider";

const events = [
  {
    title: "Lễ Vu Quy",
    date: "02 Tháng 05, 2026",
    time: "08:00 - 10:00",
    venue: "Tư gia nhà gái",
    address: "Thôn Vĩnh Thạnh, Xã Hoà Trí, Ninh Hoà, Khánh Hoà",
    mapUrl: "https://maps.google.com/?q=Vĩnh+Thạnh+Hoà+Trí+Ninh+Hoà+Khánh+Hòa",
    icon: "🏠",
  },
  {
    title: "Lễ Thành Hôn",
    date: "02 Tháng 05, 2026",
    time: "11:00 - 13:00",
    venue: "Tư gia nhà trai",
    address: "Thôn Vĩnh Thạnh, Xã Hoà Trí, Ninh Hoà, Khánh Hoà",
    mapUrl: "https://maps.google.com/?q=Vĩnh+Thạnh+Hoà+Trí+Ninh+Hoà+Khánh+Hòa",
    icon: "💒",
  },
  {
    title: "Tiệc Cưới",
    date: "02 Tháng 05, 2026",
    time: "17:30 - 21:00",
    venue: "Nhà hàng tiệc cưới",
    address: "Thôn Vĩnh Thạnh, Xã Hoà Trí, Ninh Hoà, Khánh Hoà",
    mapUrl: "https://maps.google.com/?q=Vĩnh+Thạnh+Hoà+Trí+Ninh+Hoà+Khánh+Hòa",
    icon: "🎉",
  },
];

export default function WeddingEvent() {
  return (
    <section className="section-container gradient-bg" id="events">
      <ScrollAnimation>
        <SectionDivider />
        <h2 className="section-title">Sự Kiện Cưới</h2>
        <p className="text-center text-gray-500 mb-10 max-w-md mx-auto text-sm">
          Chúng tôi rất mong được đón tiếp bạn tại các sự kiện sau
        </p>
      </ScrollAnimation>

      <div className="flex flex-col gap-6 max-w-lg mx-auto w-full">
        {events.map((event, index) => (
          <ScrollAnimation key={index} delay={index * 0.15}>
            <motion.div
              className="wedding-card relative overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3 }}
            >
              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-wedding-pink/30 rounded-bl-full" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{event.icon}</span>
                  <div>
                    <h3 className="font-playfair text-xl md:text-2xl text-wedding-red">
                      {event.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-3 ml-1">
                  <div className="flex items-center gap-3 text-gray-600">
                    <IoCalendar className="text-wedding-red text-sm flex-shrink-0" />
                    <span className="text-sm">{event.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-600">
                    <IoTime className="text-wedding-red text-sm flex-shrink-0" />
                    <span className="text-sm">{event.time}</span>
                  </div>
                  <div className="flex items-start gap-3 text-gray-600">
                    <IoLocationSharp className="text-wedding-red text-sm flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium">{event.venue}</p>
                      <p className="text-xs text-gray-400">{event.address}</p>
                    </div>
                  </div>
                </div>

                <a
                  href={event.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-4 text-sm text-wedding-red hover:text-wedding-red-dark transition-colors font-medium"
                >
                  <IoLocationSharp className="text-xs" />
                  Xem bản đồ
                </a>
              </div>
            </motion.div>
          </ScrollAnimation>
        ))}
      </div>

      {/* Google Maps embed */}
      <ScrollAnimation className="w-full max-w-lg mx-auto mt-8">
        <div className="wedding-card p-2">
          <iframe
            src="https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=Th%C3%B4n+V%C4%A9nh+Th%E1%BA%A1nh%2C+X%C3%A3+H%C3%B2a+Tr%C3%AD%2C+T%E1%BB%89nh+Kh%C3%A1nh+H%C3%B2a&language=vi"
            width="100%"
            height="250"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Thôn Vĩnh Thạnh, Xã Hòa Trí, Tỉnh Khánh Hòa"
          />
        </div>
      </ScrollAnimation>
    </section>
  );
}
