"use client";

import dynamic from "next/dynamic";

import ProfileHeader from "@/components/profile/layout/ProfileHeader";

import styles from "@/components/profile/ProfileContainer.module.scss";

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
      </div>
      {/* 당근 경험 씬으로 재구성하는 동안 아래 슬라이드는 내려둔다.
          컴포넌트는 layout/ProfileContents.tsx 에 그대로 있다. */}
    </div>
  );
};

export default ProfileContainer;
