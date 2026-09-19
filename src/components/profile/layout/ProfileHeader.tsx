"use client";

import SceneBadge from "@/components/profile/layout/SceneBadge";
import { useCurrentScene } from "@/components/profile/store/useSceneStore";

import styles from "@/components/profile/layout/ProfileHeader.module.scss";

/**
 * 홈 화면 상단.
 *
 * 당근 경험 씬으로 재구성하면서 네비게이션과 코인 표시를 걷어냈다.
 * 지금은 현재 씬의 타이틀만 떠 있다. 바 배경도 없어서 씬 위에 그냥 얹힌다.
 * 씬 이름(`label`)은 하단 내비가 맡는다. 여기는 그 씬에서 하려는 이야기다.
 */
const ProfileHeader = () => {
  const scene = useCurrentScene();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <SceneBadge label={scene.title} />
      </div>
    </header>
  );
};

export default ProfileHeader;
