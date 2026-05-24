"use client";

import { useRouter, usePathname } from "next/navigation";
import { useCoinStore } from "@/components/profile/store/useCoinStore";
import styles from "./ProfileHeader.module.scss";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/game", label: "앱개발" },
  { href: "/resume", label: "Resume" },
];

const ProfileHeader = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { coins } = useCoinStore();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {NAV_ITEMS.map(({ href, label }) => (
          <button
            key={href}
            className={`${styles.navItem} ${pathname === href ? styles.active : ""}`}
            onClick={() => router.push(href)}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className={styles.coinBadge}>
        <span className={styles.coinIcon}>🪙</span>
        <span className={styles.coinCount}>{coins}</span>
      </div>
    </header>
  );
};

export default ProfileHeader;
