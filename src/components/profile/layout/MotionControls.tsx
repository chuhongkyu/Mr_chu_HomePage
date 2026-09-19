"use client";

import { useMotionStore } from "@/components/profile/store/useMotionStore";
import { MOTIONS } from "@/components/profile/webgl/character/MotionCharacter";

import styles from "@/components/profile/layout/MotionControls.module.scss";

/** 클립 이름을 그대로 보여주면 읽기 나쁘다. 버튼에 쓸 이름. */
const LABELS: Record<(typeof MOTIONS)[number], string> = {
  idle: "Idle",
  running: "Run",
  jump: "Jump",
  thinking: "Think",
  angry: "Angry",
  brush: "Brush",
  brush01: "Paint",
};

/**
 * 캐릭터 발밑에 놓이는 모션 칩.
 *
 * 3D 좌표에 붙일 수 있도록 순수 DOM 으로만 두었다. 위치는 감싸는
 * `Html` 이 정하고, 여기서는 칩 배열만 그린다.
 */
export const MotionControls = () => {
  const motion = useMotionStore((s) => s.motion);
  const play = useMotionStore((s) => s.play);

  return (
    <div className={styles.chips} role="group" aria-label="캐릭터 동작">
      {MOTIONS.map((name) => (
        <button
          key={name}
          type="button"
          className={`${styles.chip} ${motion === name ? styles.active : ""}`}
          onClick={() => play(name)}
          aria-pressed={motion === name}
        >
          {LABELS[name]}
        </button>
      ))}
    </div>
  );
};

export default MotionControls;
