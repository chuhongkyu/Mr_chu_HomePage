import Webgl from "@/components/webgl/Webgl";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./style.scss";

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
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={`${notoSans.variable}`}>
        {children}
        <Webgl/>
      </body>
    </html>
  );
}
