import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import MusicPlayer from "@/components/MusicPlayer";
import MotionProvider from "@/components/MotionProvider";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thiệp Cưới - Quân & Na | 02.05.2026",
  description:
    "Trân trọng kính mời bạn đến dự lễ thành hôn của chúng tôi - Quân & Na. Ngày 02 tháng 05 năm 2026.",
  keywords: ["thiệp cưới", "wedding invitation", "Quân & Na"],
  openGraph: {
    title: "Thiệp Cưới - Quân & Na",
    description: "Trân trọng kính mời bạn đến dự lễ thành hôn của chúng tôi.",
    type: "website",
    locale: "vi_VN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body
        className={`${playfair.variable} ${poppins.variable} font-poppins antialiased bg-wedding-cream`}
      >
        <MotionProvider>
          <MusicPlayer />
          {children}
        </MotionProvider>
      </body>
    </html>
  );
}
