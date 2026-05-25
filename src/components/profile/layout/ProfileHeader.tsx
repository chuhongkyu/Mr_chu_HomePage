"use client";

import { usePathname, useRouter } from "next/navigation";

import { useCoinStore } from "@/components/profile/store/useCoinStore";

import styles from "@/components/profile/layout/ProfileHeader.module.scss";

const HomeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

const NAV_ITEMS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/resume", label: "Resume" },
  { href: "/project", label: "Project" },
  { href: "/game", label: "App" },
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
              aria-label={href === "/" ? "Home" : undefined}
            >
              {href === "/" ? <HomeIcon /> : label}
            </button>
          ))}
        </div>
        <div className={styles.coinBadge}>
          <img
            src="/assets/icons/coin.svg"
            alt="coin"
            className={styles.coinIcon}
          />
          <span className={styles.coinCount}>{coins}</span>
        </div>
      </nav>
    </header>
  );
};

export default ProfileHeader;
