"use client";

import { IconMinusLine, IconPlusLine } from "@karrotmarket/react-monochrome-icon";

import {
  useZoomStore,
  ZOOM_MAX,
  ZOOM_MIN,
} from "@/components/profile/store/useZoomStore";

import styles from "@/components/profile/layout/ZoomControl.module.scss";

/** 버튼 한 번에 움직이는 양. */
const STEP = 0.05;

const percent = (ratio: number) =>
  `${((ratio - ZOOM_MIN) / (ZOOM_MAX - ZOOM_MIN)) * 100}%`;

/**
 * 지도 확대처럼 쓰는 줌 조절기.
 *
 * 휠과 두 손가락으로도 되지만 처음 온 사람은 그걸 모른다. 눈에 보이는
 * 손잡이를 하나 둔다. 양쪽은 같은 값을 보므로 휠로 당기면 손잡이도 따라 움직인다.
 */
export const ZoomControl = () => {
  const ratio = useZoomStore((s) => s.ratio);
  const request = useZoomStore((s) => s.request);

  const step = (amount: number) => () => request(ratio + amount);

  return (
    <div className={styles.control}>
      <button
        type="button"
        className={styles.step}
        onClick={step(STEP)}
        disabled={ratio >= ZOOM_MAX}
        aria-label="확대"
      >
        <IconPlusLine size={14} />
      </button>

      <input
        className={styles.slider}
        type="range"
        min={ZOOM_MIN}
        max={ZOOM_MAX}
        step={0.005}
        value={ratio}
        style={{ "--fill": percent(ratio) } as React.CSSProperties}
        onChange={(event) => request(Number(event.target.value))}
        aria-label="지도 확대"
      />

      <button
        type="button"
        className={styles.step}
        onClick={step(-STEP)}
        disabled={ratio <= ZOOM_MIN}
        aria-label="축소"
      >
        <IconMinusLine size={14} />
      </button>
    </div>
  );
};

export default ZoomControl;
