'use client';

import { useEffect, Suspense } from 'react';
import RQProvider from "@/components/providers/RQProvider";
import { AppProvider } from "@/components/common/window/app/AppContext";
import AppWrapperClientLoader from "@/components/common/window/app/AppWrapperClientLoader";
import FormContainer from "@/components/common/window/searchFrom/FormContainer";
import KeyboardShortcuts from "@/components/common/KeyboardShortcuts";
import AppInformation from "@/components/common/window/app/AppInformation";
import BgToggleButton from "@/components/common/window/BgToggleButton";
import AppWidgetClient from "@/components/common/window/app/AppWidgetClient";
import Loading from './Loading';


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
      
      <Suspense fallback={
        <div className="loading-container">
          <Loading/>
        </div>
      }>
        <AppProvider>
            <div className="top">
              <RQProvider>
                <FormContainer/>
                <KeyboardShortcuts/>
                <AppWrapperClientLoader/>
              </RQProvider>
              {children}
              <AppInformation/>
            </div>
            <AppWidgetClient/>
        </AppProvider>
        <BgToggleButton/>
      </Suspense>
    </section>
  );
}