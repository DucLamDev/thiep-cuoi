# Thiệp Cưới Online - Quân & Na

Website thiệp cưới online đẹp, mượt mà trên mobile với đầy đủ tính năng hiện đại.

## 🎉 Tính Năng Chính

- **Responsive Mobile-First** - Tối ưu hoàn hảo cho điện thoại
- **Animation Mượt Mà** - Hiệu ứng cánh hoa đào rơi, sparkle, scroll animations
- **Đếm Ngược Ngày Cưới** - Countdown timer chính xác đến giây
- **Photo Gallery** - Album ảnh với lightbox đẹp
- **Video Kỷ Niệm** - Embed video YouTube
- **RSVP Form** - Form xác nhận tham dự
- **Share Social** - Chia sẻ Facebook, Messenger, Zalo
- **Music Player** - Nhạc nền romantic
- **Personalized Invitation** - Tạo thiệp riêng cho từng khách mời
- **QR Code** - Tự động tạo QR code cho link thiệp

## 🛠 Công Nghệ Sử Dụng

- **Next.js 14** (App Router)
- **TypeScript**
- **TailwindCSS**
- **Framer Motion**
- **React Icons**
- **QR Code React**

## 📱 Cấu Trúc Project

```
wedding-invitation-v2/
├── src/
│   ├── app/
│   │   ├── page.tsx              # Trang chính
│   │   ├── layout.tsx            # Layout chung
│   │   ├── globals.css           # Global styles
│   │   ├── create-invitation/    # Trang tạo thiệp cá nhân
│   │   └── invitation/           # Trang thiệp cá nhân
│   └── components/
│       ├── Hero.tsx              # Hero section với countdown
│       ├── ParentsInfo.tsx       # Thông tin bố mẹ hai bên
│       ├── OurStory.tsx          # Timeline tình yêu
│       ├── PhotoGallery.tsx      # Album ảnh
│       ├── WeddingEvent.tsx      # Thông tin sự kiện
│       ├── VideoSection.tsx      # Video kỷ niệm
│       ├── RSVP.tsx              # Form xác nhận
│       ├── ShareInvitation.tsx   # Chia sẻ social
│       ├── MusicPlayer.tsx       # Nhạc nền
│       ├── PetalAnimation.tsx    # Cánh hoa đào rơi
│       ├── LoadingScreen.tsx     # Loading animation
│       └── ...
├── public/
│   ├── images/
│   │   ├── anhcuoi/              # Ảnh cưới
│   │   └── gallery/              # Album ảnh
│   └── music/
│       └── wedding-bgm.mp3       # Nhạc nền
└── ...
```

## 🚀 Bắt Đầu

### 1. Cài Đặt

```bash
npm install
```

### 2. Chạy Local

```bash
npm run dev
```

Mở http://localhost:3000 để xem website

### 3. Build Production

```bash
npm run build
npm start
```

## 📝 Thay Đổi Thông Tin

### 1. Thông Tin Cô Dâu Chú Rể

**File:** `src/components/Hero.tsx`

```typescript
// Thay đổi tên
<h1>Quân</h1>
<h1>Na</h1>

// Thay đổi ngày cưới
const WEDDING_DATE = new Date("2026-05-02T10:00:00+07:00");
```

### 2. Thông Tin Bố Mẹ

**File:** `src/components/ParentsInfo.tsx`

```typescript
// Cập nhật thông tin nhà trai
<p>Chú rể: Lê Đình Quân (Út Nam)</p>
<p>Địa chỉ: Thôn Vĩnh Thạnh, Xã Hoà Trí, Ninh Hoà, Khánh Hoà</p>

// Cập nhật thông tin nhà gái
<p>Bố: Nguyễn Thành Phương</p>
<p>Mẹ: Trần Thị Hương</p>
<p>Cô dâu: Nguyễn Thị Hiền Na (Thứ nữ)</p>
```

### 3. Thông Tin Sự Kiện

**File:** `src/components/WeddingEvent.tsx`

```typescript
const events = [
  {
    title: "Lễ Vu Quy",
    date: "02 Tháng 05, 2026",
    time: "08:00 - 10:00",
    venue: "Tư gia nhà gái",
    address: "Thôn Vĩnh Thạnh, Xã Hoà Trí, Ninh Hoà, Khánh Hoà",
    // ...
  },
  // ...
];
```

## 🖼️ Thay Ảnh

### 1. Ảnh Hero (Ảnh Cưới Chính)

**Đường dẫn:** `/public/images/anhcuoi/anh-cuoi-1.png`

**File:** `src/components/Hero.tsx`

```typescript
<Image 
  src="/images/anhcuoi/anh-cuoi-1.png" 
  alt="Cô dâu & Chú rể Quân & Na" 
  fill 
  className="object-cover" 
  priority 
/>
```

### 2. Album Ảnh Gallery

**Đường dẫn:** `/public/images/gallery/`

**File:** `src/components/PhotoGallery.tsx`

```typescript
const photos = [
  { src: "/images/gallery/photo1.jpg", alt: "Ảnh cưới 1" },
  { src: "/images/gallery/photo2.jpg", alt: "Ảnh cưới 2" },
  // Thêm ảnh tùy ý...
];
```

### 3. Nhạc Nền

**Đường dẫn:** `/public/music/wedding-bgm.mp3`

**File:** `src/components/MusicPlayer.tsx`

```typescript
<audio ref={audioRef} src="/music/wedding-bgm.mp3" loop preload="auto" />
```

## 🎨 Tùy Chọn Giao Diện

### 1. Màu Sắc

**File:** `tailwind.config.ts`

```typescript
colors: {
  wedding: {
    red: "#b91c1c",        // Đỏ cưới
    "red-light": "#dc2626",
    "red-dark": "#991b1b",
    pink: "#fce7f3",        // Hồng nhạt
    "pink-light": "#fdf2f8",
    "pink-dark": "#f9a8d4",
    gold: "#d4a574",        // Vàng
    cream: "#fef7f0",       // Kem
  },
}
```

### 2. Font

**File:** `src/app/layout.tsx`

```typescript
import { Playfair_Display, Poppins } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin", "vietnamese"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});
```

## 📱 Tính Năng Personalized Invitation

### Tạo Thiệp Cá Nhân

Truy cập `/create-invitation` để tạo thiệp mời riêng cho từng khách:

1. Nhập tên khách mời
2. Chọn quan hệ (bạn cô dâu/chú rể, đồng nghiệp, người thân)
3. Nhấn "Tạo link thiệp cưới"
4. Copy link hoặc quét QR code

**Ví dụ link:** `http://localhost:3000/invitation?name=Hồ+Đức+Lâm&shortname=Lâm&relation=ban-co-dau`

### Hiển Thị Lời Mời Cá Nhân

Thiệp sẽ hiển thị:
- "Thân gửi bạn Lâm"
- "Bạn Lâm thân mến, chúng tôi rất vui khi được mời bạn đến dự lễ cưới của chúng tôi."

## 🌐 Deploy Vercel

### 1. Push Code

```bash
git add .
git commit -m "Initial wedding invitation"
git push origin main
```

### 2. Deploy Vercel

1. Vào [vercel.com](https://vercel.com)
2. Import GitHub repository
3. Next.js sẽ auto-detect
4. Click Deploy

### 3. Environment Variables (nếu có)

Nếu cần biến môi trường, thêm trong Vercel Dashboard:
- `NEXT_PUBLIC_API_URL`
- `NEXT_PUBLIC_GA_ID`

## 🔧 Tùy Chọn Nâng Cao

### 1. Thay đổi Animation

**File:** `src/components/PetalAnimation.tsx`

```typescript
// Tăng/giảm số lượng cánh hoa
const petalCount = isMobile ? 20 : 35;

// Tùy chỉnh màu sắc
gradient.addColorStop(0, "#fbb6ce");
gradient.addColorStop(0.5, "#f9a8d4");
gradient.addColorStop(1, "#f472b6");
```

### 2. Thêm Google Analytics

**File:** `src/app/layout.tsx`

```typescript
import Script from "next/script";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
        <Script id="google-analytics">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </body>
    </html>
  );
}
```

### 3. SEO Meta Tags

**File:** `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  title: "Thiệp Cưới - Quân & Na | 02.05.2026",
  description: "Trân trọng kính mời bạn đến dự lễ thành hôn của chúng tôi",
  openGraph: {
    title: "Thiệp Cưới - Quân & Na",
    description: "Trân trọng kính mời bạn đến dự lễ thành hôn của chúng tôi",
    images: ["/images/anhcuoi/anh-cuoi-1.png"],
  },
};
```

## 📱 Responsive Design

Website được tối ưu hoàn hảo cho:

- **Mobile** (< 768px) - Layout vertical, font lớn, button dễ bấm
- **Tablet** (768px - 1024px) - Layout cân bằng
- **Desktop** (> 1024px) - Layout rộng, animation mượt

## 🎯 Performance Optimization

- **Dynamic Imports** - Lazy load components
- **Image Optimization** - Next.js Image với lazy loading
- **Bundle Analysis** - Tối ưu size
- **Animation Performance** - CSS transforms & will-change

## 🐛 Troubleshooting

### 1. Animation không chạy trên mobile
- Kiểm tra `prefers-reduced-motion`
- Giảm số lượng animation
- Use `transform` thay vì `position`

### 2. Ảnh không hiển thị
- Kiểm tra đường dẫn `/public/`
- Đảm bảo file tồn tại
- Check case sensitivity

### 3. Nhạc không tự động play
- Browser chặn autoplay
- Cần user interaction trước
- Use `user-gesture` API

## 📞 Support

Nếu có vấn đề hoặc cần tùy chỉnh:

1. Check console logs
2. Test trên multiple devices
3. Validate HTML/CSS
4. Performance audit

---

**Made with ❤️ for Quân & Na's Special Day**
