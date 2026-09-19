"use client";

import IconChevronLeftRegular from "@seed-design/react-icon/lib/IconChevronLeftRegular";
import IconChevronRightRegular from "@seed-design/react-icon/lib/IconChevronRightRegular";

import { POSTS } from "@/components/profile/constants/posts";
import { SCENES } from "@/components/profile/constants/scenes";
import SceneNavLink from "@/components/profile/layout/SceneNavLink";
import { useSceneStore } from "@/components/profile/store/useSceneStore";

import styles from "@/components/profile/layout/SceneNav.module.scss";

/**
 * 씬 사이를 오가는 내비.
 *
 * 목록 끝에서는 화살표가 비활성화된다. 순환시키면 "지금 처음인지 끝인지"를
 * 알 수 없어진다. 지금은 씬이 하나뿐이라 양쪽 다 꺼져 있다.
 */
export type SceneNavProps = {
  /** 아래 카드를 눌렀을 때. 무엇을 열지는 씬 정의의 `link.open` 이 정한다. */
  onOpenLink: () => void;
};

export const SceneNav = ({ onOpenLink }: SceneNavProps) => {
  const index = useSceneStore((s) => s.index);
  const next = useSceneStore((s) => s.next);
  const prev = useSceneStore((s) => s.prev);

  const scene = SCENES[index];
  const hasPrev = index > 0;
  const hasNext = index < SCENES.length - 1;
  const linkPost = scene.link
    ? POSTS.find((post) => post.id === scene.link?.postId)
    : undefined;

  return (
    <nav className={styles.nav} aria-label="씬 이동">
      <div className={styles.row}>
        <button
          type="button"
          className={styles.button}
          onClick={prev}
          disabled={!hasPrev}
          aria-label="이전 씬"
        >
          <IconChevronLeftRegular size={18} />
        </button>

        {/* 남는 폭을 다 먹어서 화살표가 양 끝에 붙고, 안쪽은 가운데 정렬된다. */}
        <span className={styles.title}>
          <span className={styles.label}>{scene.label}</span>
          <span className={styles.year}>{scene.year}</span>
        </span>

        <button
          type="button"
          className={styles.button}
          onClick={next}
          disabled={!hasNext}
          aria-label="다음 씬"
        >
          <IconChevronRightRegular size={18} />
        </button>
      </div>

      {linkPost && <SceneNavLink post={linkPost} onClick={onOpenLink} />}
    </nav>
  );
};

export default SceneNav;
