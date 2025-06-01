'use client';

import { useEffect } from 'react';

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
    <section className="main">{children}</section>
  );
}