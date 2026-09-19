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
 * 캐릭터 밑에 가로로 눕는 모션 버튼들.
 *
 * 캐릭터는 캔버스 안, 버튼은 캔버스 밖이라 `useMotionStore` 로 잇는다.
 */
export const MotionControls = () => {
  const motion = useMotionStore((s) => s.motion);
  const play = useMotionStore((s) => s.play);

  return (
    <div className={styles.controls} role="group" aria-label="캐릭터 동작">
      {MOTIONS.map((name) => (
        <button
          key={name}
          type="button"
          className={`${styles.button} ${motion === name ? styles.active : ""}`}
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
