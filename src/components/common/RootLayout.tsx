"use client";

import { Suspense, useEffect } from "react";

import KeyboardShortcuts from "@/components/common/KeyboardShortcuts";
import Loading from "@/components/common/Loading";
import { AppProvider } from "@/components/common/window/app/AppContext";
import AppInformation from "@/components/common/window/app/AppInformation";
import AppWidgetClient from "@/components/common/window/app/AppWidgetClient";
import AppWrapperClientLoader from "@/components/common/window/app/AppWrapperClientLoader";
import FormContainer from "@/components/common/window/searchFrom/FormContainer";
import ProfileContainer from "@/components/profile/ProfileContainer";
import RQProvider from "@/components/providers/RQProvider";
import { WithChildren } from "@/types/global";

export default function RootLayout({ children, modal }: WithChildren & { modal?: React.ReactNode }) {
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
    </section>
  );
}
