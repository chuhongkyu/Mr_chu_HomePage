"use client";

import FloatingLinks from "@/components/profile/layout/FloatingLinks";
import HeaderMenu from "@/components/profile/layout/HeaderMenu";
import SceneBadge from "@/components/profile/layout/SceneBadge";
import { useCurrentProject } from "@/components/profile/store/useSceneStore";

import styles from "@/components/profile/layout/ProfileHeader.module.scss";

/**
 * 홈 화면 상단.
 *
 * 이름(`label`)은 하단 내비가 맡는다. 여기는 그 시기에 하려는 이야기다.
 */
const ProfileHeader = () => {
  const project = useCurrentProject();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <HeaderMenu />
        <div className={styles.side}>
          <SceneBadge label={project.headline} />
          <FloatingLinks links={project.links} />
        </div>
      </div>
    </header>
  );
};

export default ProfileHeader;
