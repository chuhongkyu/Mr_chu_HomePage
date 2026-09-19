"use client";

import IconChevronLeftRegular from "@seed-design/react-icon/lib/IconChevronLeftRegular";
import IconChevronRightRegular from "@seed-design/react-icon/lib/IconChevronRightRegular";

import { SCENES } from "@/components/profile/constants/scenes";
import { useSceneStore } from "@/components/profile/store/useSceneStore";

import styles from "@/components/profile/layout/SceneNav.module.scss";

/**
 * 씬 사이를 오가는 내비.
 *
 * 목록 끝에서는 화살표가 비활성화된다. 순환시키면 "지금 처음인지 끝인지"를
 * 알 수 없어진다. 지금은 씬이 하나뿐이라 양쪽 다 꺼져 있다.
 */
export const SceneNav = () => {
  const index = useSceneStore((s) => s.index);
  const next = useSceneStore((s) => s.next);
  const prev = useSceneStore((s) => s.prev);

  const scene = SCENES[index];
  const hasPrev = index > 0;
  const hasNext = index < SCENES.length - 1;

  return (
    <nav className={styles.nav} aria-label="씬 이동">
      <button
        type="button"
        className={styles.button}
        onClick={prev}
        disabled={!hasPrev}
        aria-label="이전 씬"
      >
        <IconChevronLeftRegular size={20} />
      </button>

      <span className={styles.label}>{scene.label}</span>
      <span className={styles.count}>
        {index + 1}/{SCENES.length}
      </span>

      <button
        type="button"
        className={styles.button}
        onClick={next}
        disabled={!hasNext}
        aria-label="다음 씬"
      >
        <IconChevronRightRegular size={20} />
      </button>
    </nav>
  );
};

export default SceneNav;
