"use client";

import dynamic from "next/dynamic";

import ProfileContents from "@/components/profile/layout/ProfileContents";
import ProfileHeader from "@/components/profile/layout/ProfileHeader";
import styles from "./ProfileContainer.module.scss";

const Scene = dynamic(() => import("@/components/profile/Scene"), {
  ssr: false,
});

const ProfileContainer = () => {
  return (
    <div className={styles.container}>
      <ProfileHeader />
      <div className={styles.body}>
        <div className={styles.scene}>
          <Scene />
        </div>

        <div className={styles.contents}>
          <ProfileContents />
        </div>
      </div>
    </div>
  );
};

export default ProfileContainer;
