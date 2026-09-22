import { Metadata } from "next";
import localFont from "next/font/local";

import RootLayout from "@/components/common/RootLayout";
import { PostHogProvider } from "@/components/providers/PostHogProvider";
import { ReduxProvider } from "@/components/providers/ReduxProvider";
import { AUTHOR, OG_IMAGE, SITE_NAME, SITE_URL } from "@/constants/site";

import "@/app/style.scss";

export const metadata: Metadata = {
  // 상대경로 이미지와 canonical 이 절대 URL 로 풀리는 기준이다.
  // 없으면 Next 가 localhost 로 채워 넣는다(빌드가 경고한다).
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: "FE | MR.CHU",
    // 하위 페이지가 제 이름만 적으면 뒤가 자동으로 붙는다.
    template: `%s | ${SITE_NAME}`,
  },
  authors: [{ name: AUTHOR.name, url: SITE_URL }],
  creator: AUTHOR.name,
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
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "FE | MR.CHU",
    description:
      "Creative Developer specializing in Three.js, WebGL, and AI-driven 3D animation",
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "FE | MR.CHU",
    description:
      "Creative Developer specializing in Three.js, WebGL, and AI-driven 3D animation",
    images: [OG_IMAGE.url],
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
