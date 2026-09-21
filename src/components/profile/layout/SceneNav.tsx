"use client";

import Image from "next/image";
import IconChevronLeftRegular from "@seed-design/react-icon/lib/IconChevronLeftRegular";
import IconChevronRightRegular from "@seed-design/react-icon/lib/IconChevronRightRegular";

import {
  type ProjectIcon,
  PROJECTS,
} from "@/components/profile/constants/projects";
import SceneNavLink from "@/components/profile/layout/SceneNavLink";
import { useSceneStore } from "@/components/profile/store/useSceneStore";

import styles from "@/components/profile/layout/SceneNav.module.scss";

const ICON_SIZE = 18;

const Glyph = ({ icon }: { icon: ProjectIcon }) => {
  if (typeof icon === "string") {
    return (
      <Image
        src={icon}
        alt=""
        width={ICON_SIZE}
        height={ICON_SIZE}
        className={styles.image}
      />
    );
  }

  const Icon = icon;
  return <Icon size={ICON_SIZE} />;
};

export type SceneNavProps = {
  /** 아래 카드를 눌렀을 때. 무엇을 열지는 프로젝트의 `url` 유무가 정한다. */
  onOpenLink: () => void;
};

/**
 * 씬 사이를 오가는 내비.
 *
 * 아이콘을 누르면 바로 건너뛰고, 양 끝 화살표로 차례로 넘길 수도 있다.
 * 이름은 두지 않는다. 한 줄을 더 먹는 데 비해 아이콘이 이미 말해 준다.
 */
export const SceneNav = ({ onOpenLink }: SceneNavProps) => {
  const index = useSceneStore((s) => s.index);
  const goTo = useSceneStore((s) => s.goTo);
  const next = useSceneStore((s) => s.next);
  const prev = useSceneStore((s) => s.prev);

  const project = PROJECTS[index];

  return (
    <nav className={styles.nav} aria-label="씬 이동">
      <div className={styles.row}>
        <button
          type="button"
          className={styles.arrow}
          onClick={prev}
          disabled={index === 0}
          aria-label="이전 씬"
        >
          <IconChevronLeftRegular size={18} />
        </button>

        <ul className={styles.scenes}>
          {PROJECTS.map((item, i) => {
            const current = i === index;

            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={styles.scene}
                  data-current={current}
                  aria-current={current ? "true" : undefined}
                  aria-label={item.label}
                  onClick={() => goTo(i)}
                >
                  <Glyph icon={item.icon} />
                </button>
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          className={styles.arrow}
          onClick={next}
          disabled={index === PROJECTS.length - 1}
          aria-label="다음 씬"
        >
          <IconChevronRightRegular size={18} />
        </button>
      </div>

      <SceneNavLink project={project} onClick={onOpenLink} />
    </nav>
  );
};

export default SceneNav;
