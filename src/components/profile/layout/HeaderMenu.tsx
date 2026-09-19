"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  IconDocumentLine,
  IconHorizline3VerticalTightFill,
  IconPersonLine,
} from "@karrotmarket/react-monochrome-icon";

import styles from "@/components/profile/layout/HeaderMenu.module.scss";

/**
 * 인터셉팅 라우트(`app/@modal/(.)…`)가 잡아서 씬 위에 시트로 띄운다.
 * 주소가 남으므로 뒤로가기로 닫히고, 링크를 직접 열면 전체 화면이 된다.
 */
const ITEMS = [
  { href: "/project", label: "프로젝트", Icon: IconDocumentLine },
  { href: "/resume", label: "이력서", Icon: IconPersonLine },
];

export const HeaderMenu = () => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className={styles.root} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        aria-label="메뉴"
      >
        <IconHorizline3VerticalTightFill size={18} />
      </button>

      {open && (
        <nav className={styles.panel}>
          {ITEMS.map(({ href, label, Icon }) => (
            <Link
              key={href}
              href={href}
              className={styles.item}
              onClick={() => setOpen(false)}
            >
              <Icon size={16} className={styles.icon} />
              {label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
};

export default HeaderMenu;
