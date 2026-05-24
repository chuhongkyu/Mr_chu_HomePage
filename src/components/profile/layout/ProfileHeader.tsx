"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileText, Gamepad2, Home, User } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";

import { useCoinStore } from "@/components/profile/store/useCoinStore";
import styles from "./ProfileHeader.module.scss";

const NAV_ITEMS = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/about", icon: User, label: "About" },
  { href: "/game", icon: Gamepad2, label: "Game" },
  { href: "/resume", icon: FileText, label: "Resume" },
];

const ProfileHeader = () => {
  const { coins } = useCoinStore();
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Swiper
          modules={[FreeMode]}
          freeMode
          slidesPerView="auto"
          spaceBetween={0}
          slidesOffsetBefore={16}
          grabCursor
          className={styles.swiper}
        >
          {NAV_ITEMS.map(({ href, icon: Icon, label }) => (
            <SwiperSlide key={href} className={styles.slide}>
              <Link
                href={href}
                className={`${styles.navItem} ${pathname === href ? styles.active : ""}`}
              >
                <Icon size={28} />
                <span>{label}</span>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </nav>

      <div className={styles.coinBadge}>
        <span className={styles.coinIcon}>🪙</span>
        <span className={styles.coinCount}>{coins} Coin</span>
      </div>
    </header>
  );
};

export default ProfileHeader;
