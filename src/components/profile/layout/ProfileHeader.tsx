"use client";

import { useCoinStore } from "@/components/profile/store/useCoinStore";
import styles from "./ProfileHeader.module.scss";

const ProfileHeader = () => {
  const { coins } = useCoinStore();

  return (
    <header className={styles.header}>
      <span className={styles.title}>Profile</span>
      <div className={styles.coinBadge}>
        <span className={styles.coinIcon}>🪙</span>
        <span className={styles.coinCount}>{coins} Coin</span>
      </div>
    </header>
  );
};

export default ProfileHeader;
