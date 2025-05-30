
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./style.scss";
import BackgroundLayout from "@/components/common/BackgroundLayout";
import AppWidget from "@/components/common/window/app/AppWidget";

const notoSans = localFont({
  src: [
    {
      path: "./fonts/NotoSansKR400.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/NotoSansKR500.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/NotoSansKR700.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-noto-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FE MR.CHU",
  description: "Creative Developer specializing in Three.js, WebGL, and AI-driven 3D animation. Transforming AI-generated motion data into dynamic skeleton-based animations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={`${notoSans.variable}`}>
        <section className="main">
          {children}
          <AppWidget/>
        </section>
        <BackgroundLayout/>
      </body>
    </html>
  );
}
