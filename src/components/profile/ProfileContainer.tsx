"use client";

import dynamic from "next/dynamic";

import ProfileContents from "@/components/profile/layout/ProfileContents";
import ProfileHeader from "@/components/profile/layout/ProfileHeader";

import styles from "./ProfileContainer.module.scss";
import InventoryBottomSheet from "./inventory/InventoryBottomSheet";
import { ProfileDragDropManager } from "./inventory/ProfileDragDropManager";

const Scene = dynamic(() => import("@/components/profile/Scene"), {
  ssr: false,
});

const ProfileContainer = () => {
  return (
    <div className={styles.container}>
      <ProfileHeader />

      <ProfileDragDropManager>
        <div className={styles.body}>
          <div className={styles.scene}>
            <Scene />
          </div>

          <div className={styles.contents}>
            <ProfileContents />
          </div>
          <InventoryBottomSheet />
        </div>
      </ProfileDragDropManager>
    </div>
  );
};

export default ProfileContainer;
