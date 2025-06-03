import localFont from "next/font/local";
import "./style.scss";
import BackgroundController from "@/components/common/window/background/BackgroundController";
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import RootLayout from "@/components/common/RootLayout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FE | MR.CHU",
  description: "Creative Developer specializing in Three.js, WebGL, and AI-driven 3D animation",
  openGraph: {
    title: "FE | MR.CHU",
    description: "Creative Developer specializing in Three.js, WebGL, and AI-driven 3D animation",
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
    description: "Creative Developer specializing in Three.js, WebGL, and AI-driven 3D animation",
    images: ["/assets/og_img_default.jpg"],
  },
}; 

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

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kr">
      <body className={`${notoSans.variable}`}>
        <ReduxProvider>
          <RootLayout>
            
            {children}
            
          </RootLayout>
          <BackgroundController/>
        </ReduxProvider>
      </body>
    </html>
  );
}
