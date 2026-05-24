"use client";

import dynamic from "next/dynamic";
import { useRouter, usePathname } from "next/navigation";
import ProfileContents from "@/components/profile/layout/ProfileContents";
import ProfileHeader from "@/components/profile/layout/ProfileHeader";
import BottomSheet from "@/components/profile/common/BottomSheet";
import { usePlayerStore } from "@/components/profile/store/usePlayerStore";
import styles from "./ProfileContainer.module.scss";


const Scene = dynamic(() => import("@/components/profile/Scene"), {
  ssr: false,
});

const AboutContainer = dynamic(
  () => import("@/components/about/AboutContainer"),
  { ssr: false }
);

const UnityContainer = dynamic(
  () => import("@/components/game/UnityContainer"),
  { ssr: false }
);

const CareerContainer = dynamic(
  () => import("@/components/resume/CareerContainer"),
  { ssr: false }
);

const SHEET_MAP: Record<string, React.ComponentType> = {
  "/about": AboutContainer,
  "/game": UnityContainer,
  "/resume": CareerContainer,
};

const ProfileContainer = () => {
  const router = useRouter();
  const pathname = usePathname();

  const SheetContent = SHEET_MAP[pathname] ?? null;

  return (
    <div className={styles.container}>
      <ProfileHeader />
      <div className={styles.body}>
        <div className={styles.scene}>
          <Scene />
        </div>
      </div>
      <ProfileContents />

      <BottomSheet
        isOpen={!!SheetContent}
        onClose={() =>
          router.push(`/?swiper=${usePlayerStore.getState().slideIndex}`)
        }
      >
        {SheetContent && <SheetContent />}
      </BottomSheet>
    </div>
  );
};

export default ProfileContainer;
