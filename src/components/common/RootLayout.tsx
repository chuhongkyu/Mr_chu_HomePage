"use client";

import { Suspense, useEffect } from "react";
import dynamic from "next/dynamic";

import KeyboardShortcuts from "@/components/common/KeyboardShortcuts";
import Loading from "@/components/common/Loading";
import { AppProvider } from "@/components/common/window/app/AppContext";
import AppInformation from "@/components/common/window/app/AppInformation";
import AppWidgetClient from "@/components/common/window/app/AppWidgetClient";
import AppWrapperClientLoader from "@/components/common/window/app/AppWrapperClientLoader";
import FormContainer from "@/components/common/window/searchFrom/FormContainer";
import { useDevMode } from "@/components/devtools/useDevMode";
import ProfileContainer from "@/components/profile/ProfileContainer";
import RQProvider from "@/components/providers/RQProvider";
import { WithChildren } from "@/types/global";

/** `?mode=edit` 일 때만 받아온다. 정적으로 가져오면 프로덕션 번들에 들어간다. */
const DevTools = dynamic(() => import("@/components/devtools/DevTools"), {
  ssr: false,
});

export default function RootLayout({ children, modal }: WithChildren & { modal?: React.ReactNode }) {
  const devMode = useDevMode();

  useEffect(() => {
    const setHeight = () => {
      const height = window.innerHeight;
      document.documentElement.style.setProperty(
        "--mobile-height",
        `${height}px`
      );
    };

    window.addEventListener("resize", setHeight);
    setHeight();

    return () => {
      window.removeEventListener("resize", setHeight);
    };
  }, []);

  return (
    <section className="main">
      <Suspense
        fallback={
          <div className="loading-container">
            <Loading />
          </div>
        }
      >
        {/* <AppProvider>
          <div className="top">
            <RQProvider>
              <FormContainer />
              <KeyboardShortcuts />
              <AppWrapperClientLoader />
            </RQProvider>
            {children}
            <AppInformation />
          </div>
          <AppWidgetClient />
      
        </AppProvider> */}
        <ProfileContainer />
        {children}
        {modal}
      </Suspense>

      {devMode && <DevTools />}
    </section>
  );
}
