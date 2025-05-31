import type { Metadata } from "next";
import localFont from "next/font/local";
import "./style.scss";
import AppWidgetClient from "@/components/common/window/app/AppWidgetClient";
import BackgroundController from "@/components/common/window/background/BackgroundController";
import BgToggleButton from "@/components/common/window/BgToggleButton";
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import RQProvider from "@/components/common/RQProvider";
import { AppProvider } from "@/components/common/window/app/AppContext";
import AppWrapperClientLoader from "@/components/common/window/app/AppWrapperClientLoader";


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
        <ReduxProvider>
          <section className="main">
            <RQProvider>
              {/* <FormContainer/> */}
              <AppProvider>
                <AppWrapperClientLoader/>
              </AppProvider>
            </RQProvider>
            {children}
            <AppWidgetClient/>
            <BgToggleButton/>
          </section>
          <BackgroundController/>
        </ReduxProvider>
      </body>
    </html>
  );
}
