"use client"

import styles from "@/style/page.module.scss";
import BackgroundLayout from "./BackgroundLayout";

function CommonLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <>
          <main>
            {children}
          </main>
          <BackgroundLayout/>
        </>
    )
}

export default CommonLayout