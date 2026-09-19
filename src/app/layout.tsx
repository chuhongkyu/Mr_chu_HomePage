import { Metadata } from "next";
import localFont from "next/font/local";

import RootLayout from "@/components/common/RootLayout";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { ReduxProvider } from "@/components/providers/ReduxProvider";

import "@/app/style.scss";

export const metadata: Metadata = {
  title: "FE | MR.CHU",
  description:
    "Creative Developer specializing in Three.js, WebGL, and AI-driven 3D animation",
  keywords: [
    "MR.CHU",
    "추홍규",
    "프론트엔드 개발자",
    "Frontend Developer",
    "Creative Developer",
    "Three.js",
    "WebGL",
    "3D 인터랙션",
    "당근이네",
    "당근마켓 당근이네",
  ],
  openGraph: {
    title: "FE | MR.CHU",
    description:
      "Creative Developer specializing in Three.js, WebGL, and AI-driven 3D animation",
    images: [
      {
        url: "/assets/og_img_default.jpg",
        width: 1200,
        height: 630,
        alt: "FE MR.CHU",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FE | MR.CHU",
    description:
      "Creative Developer specializing in Three.js, WebGL, and AI-driven 3D animation",
    images: ["/assets/og_img_default.jpg"],
  },
};

// 디자인 토큰이 쓰는 weight 는 regular / medium / bold 셋뿐이라 그것만 싣는다.
// 한글 서브셋 woff2 로 weight 당 약 260KB.
const pretendard = localFont({
  src: [
    {
      path: "./fonts/Pretendard-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "./fonts/Pretendard-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

export default function Layout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={`${pretendard.variable}`}>
        <PostHogProvider>
          <ReduxProvider>
            <RootLayout modal={modal}>{children}</RootLayout>
          </ReduxProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
