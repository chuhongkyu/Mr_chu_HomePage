import localFont from "next/font/local";
import "./style.scss";
import AppWidgetClient from "@/components/common/window/app/AppWidgetClient";
import BackgroundController from "@/components/common/window/background/BackgroundController";
import BgToggleButton from "@/components/common/window/BgToggleButton";
import { ReduxProvider } from '@/components/providers/ReduxProvider';
import RQProvider from "@/components/providers/RQProvider";
import { AppProvider } from "@/components/common/window/app/AppContext";
import AppWrapperClientLoader from "@/components/common/window/app/AppWrapperClientLoader";
import FormContainer from "@/components/common/window/searchFrom/FormContainer";
import RootLayout from "@/components/common/RootLayout";
import KeyboardShortcuts from "@/components/common/KeyboardShortcuts";

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
            <RQProvider>
              <FormContainer/>
              <KeyboardShortcuts/>
              <AppProvider>
                <AppWrapperClientLoader/>
              </AppProvider>
            </RQProvider>
            {children}
            <AppWidgetClient/>
            <BgToggleButton/>
          </RootLayout>
          <BackgroundController/>
        </ReduxProvider>
      </body>
    </html>
  );
}
