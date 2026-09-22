"use client";

import SceneNavLink from "@/components/profile/layout/SceneNavLink";
import ZoomSlider from "@/components/profile/layout/ZoomSlider";
import { useCurrentProject } from "@/components/profile/store/useSceneStore";

import styles from "@/components/profile/layout/SceneNav.module.scss";

export type SceneNavProps = {
  /** 아래 카드를 눌렀을 때. 무엇을 열지는 프로젝트의 `url` 유무가 정한다. */
  onOpenLink: () => void;
};

/**
 * 씬 사이를 오가는 내비.
 *
 * 줌이 곧 씬이라 내비도 줌 슬라이더다. 눈금을 누르면 그 단계로 옮겨 가고,
 * 휠이나 손가락으로 씬을 굴려도 손잡이가 같이 따라간다. 줌축에 얹히지 않은
 * 씬은 눈금이 없다.
 */
export const SceneNav = ({ onOpenLink }: SceneNavProps) => {
  const project = useCurrentProject();

  return (
    <nav className={styles.nav} aria-label="씬 이동">
      <ZoomSlider />
      <SceneNavLink project={project} onClick={onOpenLink} />
    </nav>
  );
};

export default SceneNav;
