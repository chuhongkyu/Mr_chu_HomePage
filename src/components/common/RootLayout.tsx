'use client';

import { useEffect } from 'react';
import RQProvider from "@/components/providers/RQProvider";
import { AppProvider } from "@/components/common/window/app/AppContext";
import AppWrapperClientLoader from "@/components/common/window/app/AppWrapperClientLoader";
import FormContainer from "@/components/common/window/searchFrom/FormContainer";
import KeyboardShortcuts from "@/components/common/KeyboardShortcuts";
import AppInformation from "@/components/common/window/app/AppInformation";
import BgToggleButton from "@/components/common/window/BgToggleButton";
import AppWidgetClient from "@/components/common/window/app/AppWidgetClient";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const setHeight = () => {
      const height = window.innerHeight;
      document.documentElement.style.setProperty('--mobile-height', `${height}px`);
    };

    window.addEventListener('resize', setHeight);
    setHeight();

    return () => {
      window.removeEventListener('resize', setHeight);
    };
  }, []);

  return (
    <section className="main">
      <div className="top">
        <RQProvider>
          <FormContainer/>
          <KeyboardShortcuts/>
          <AppProvider>
            <AppWrapperClientLoader/>
          </AppProvider>
        </RQProvider>
        {children}
        <AppInformation/>
      </div>
      <AppWidgetClient/>
      <BgToggleButton/>
    </section>
  );
}