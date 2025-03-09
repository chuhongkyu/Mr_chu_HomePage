"use client"

import styles from "@/style/page.module.scss";
import dynamic from "next/dynamic";

const WindowBar = dynamic(() => import("@/components/common/bar/WindowBar"), {
  ssr: false,
});

function CommonLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <>
          <section className={styles.page}>
            {children}
          </section>
          <WindowBar/>
        </>
    )
}

export default CommonLayout