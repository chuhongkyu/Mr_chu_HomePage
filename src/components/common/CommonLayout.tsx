"use client"

import styles from "@/style/page.module.scss";
import dynamic from "next/dynamic";
import { RecoilRoot } from "recoil";

const WindowBar = dynamic(() => import("@/components/common/bar/WindowBar"), {
  ssr: false,
});

function CommonLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    return (
        <RecoilRoot>
          <section className={styles.page}>
            {children}
          </section>
          <WindowBar/>
        </RecoilRoot>
    )
}

export default CommonLayout