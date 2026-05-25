"use client";

import { usePathname,useRouter } from "next/navigation";

import { useCoinStore } from "@/components/profile/store/useCoinStore";

import styles from "@/components/profile/layout/ProfileHeader.module.scss";

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/project", label: "Project" },
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
        <div className={styles["nav-wrapper"]}>
          {NAV_ITEMS.map(({ href, label }) => (
            <button
              key={href}
              className={`${styles.navItem} ${pathname === href ? styles.active : ""}`}
              onClick={() => router.push(href)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className={styles.coinBadge}>
          <img src="/assets/icons/coin.svg" alt="coin" className={styles.coinIcon} />
          <span className={styles.coinCount}>{coins}</span>
        </div>
      </nav>
    </header>
  );
};

export default ProfileHeader;
