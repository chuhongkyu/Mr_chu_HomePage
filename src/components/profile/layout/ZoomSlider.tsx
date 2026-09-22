"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";

import {
  type ProjectIcon,
  PROJECTS,
} from "@/components/profile/constants/projects";
import {
  nearestStage,
  ZOOM_STAGES,
} from "@/components/profile/constants/zoomStages";
import { useZoomStore } from "@/components/profile/store/useZoomStore";

import styles from "@/components/profile/layout/ZoomSlider.module.scss";

const ICON_SIZE = 18;

/**
 * 시드에는 홑 빼기 기호가 없다(동그라미 친 것뿐). 더하기만 시드에서 가져오면
 * 둘의 두께가 어긋나므로 한 쌍을 여기서 같이 그린다.
 */
const Sign = ({ plus }: { plus?: boolean }) => (
  <svg width={16} height={16} viewBox="0 0 16 16" aria-hidden="true">
    <path
      d={plus ? "M3 8h10M8 3v10" : "M3 8h10"}
      stroke="currentColor"
      strokeWidth={1.6}
      strokeLinecap="round"
    />
  </svg>
);

const clamp01 = (x: number) => Math.min(Math.max(x, 0), 1);

/** 확대 → 축소 차례. 왼쪽이 확대다. */
const ORDER = [...ZOOM_STAGES].sort((a, b) => a.viewHeight - b.viewHeight);
const LAST = ORDER.length - 1;

/**
 * 담는 세로 ↔ 0~1 눈금.
 *
 * 눈금 사이를 똑같은 폭으로 편다. 담는 세로를 그대로(로그로라도) 그리면
 * 당근이네(22)에서 온라인 강의(60)까지가 트랙의 2/3 를 먹는다. 단계를
 * 고르는 물건이니 단계가 고르게 놓여야 한다.
 *
 * 한 칸 안에서는 로그로 잇는다. 휠이 배수로 움직이므로 선형으로 두면
 * 손잡이가 한쪽에서 뭉갠다.
 */
const toRatio = (viewHeight: number) => {
  for (let i = 0; i < LAST; i += 1) {
    const a = ORDER[i].viewHeight;
    const b = ORDER[i + 1].viewHeight;
    if (viewHeight > b) continue;

    const t =
      (Math.log(viewHeight) - Math.log(a)) / (Math.log(b) - Math.log(a));
    return clamp01((i + clamp01(t)) / LAST);
  }
  return 1;
};

const toViewHeight = (ratio: number) => {
  const x = clamp01(ratio) * LAST;
  const i = Math.min(Math.floor(x), LAST - 1);
  const a = Math.log(ORDER[i].viewHeight);
  const b = Math.log(ORDER[i + 1].viewHeight);
  return Math.exp(a + (b - a) * (x - i));
};

const STOPS = ORDER.map((stage, index) => ({
  ...stage,
  ratio: index / LAST,
  project: PROJECTS.find((item) => item.id === stage.project),
})).filter((stop) => stop.project);

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

/**
 * 줌이 곧 씬이므로 내비도 줌 슬라이더다.
 *
 * 눈금은 단계다. 끌면 그 사이를 이어 볼 수 있고, 놓으면 카메라 쪽 스냅이
 * 가까운 단계로 붙인다. 휠과 손가락으로도 똑같이 움직인다.
 */
export const ZoomSlider = () => {
  const goTo = useZoomStore((s) => s.goTo);
  const dragTo = useZoomStore((s) => s.dragTo);

  const track = useRef<HTMLDivElement>(null);
  const [stageId, setStageId] = useState<string | null>(null);

  /**
   * 손잡이는 리렌더 없이 움직인다. 줌은 프레임마다 바뀌는 값이라
   * 상태로 들고 있으면 내비가 통째로 다시 그려진다.
   */
  useEffect(() => {
    const apply = (viewHeight: number) => {
      if (!track.current) return;
      track.current.style.setProperty(
        "--at",
        clamp01(toRatio(viewHeight)).toFixed(4)
      );
      setStageId(nearestStage(viewHeight).project);
    };

    apply(useZoomStore.getState().viewHeight);
    return useZoomStore.subscribe((state) => apply(state.viewHeight));
  }, []);

  const seek = useCallback(
    (clientX: number) => {
      const box = track.current?.getBoundingClientRect();
      if (!box || box.width === 0) return;
      dragTo(toViewHeight(clamp01((clientX - box.left) / box.width)));
    },
    [dragTo]
  );

  const step = (direction: 1 | -1) => {
    const current = useZoomStore.getState().viewHeight;
    const index = STOPS.findIndex(
      (stop) => stop.project?.id === nearestStage(current).project
    );
    const next =
      STOPS[Math.min(Math.max(index + direction, 0), STOPS.length - 1)];
    if (next) goTo(next.viewHeight);
  };

  return (
    <div className={styles.row}>
      <button
        type="button"
        className={styles.step}
        onClick={() => step(-1)}
        aria-label="확대"
      >
        <Sign plus />
      </button>

      <div
        ref={track}
        className={styles.track}
        role="group"
        aria-label="확대 정도"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId);
          seek(event.clientX);
        }}
        onPointerMove={(event) => {
          if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
          seek(event.clientX);
        }}
      >
        <div className={styles.rail} />
        <div className={styles.thumb} />

        {STOPS.map((stop) => (
          <button
            key={stop.project!.id}
            type="button"
            className={styles.stop}
            style={{ left: `${stop.ratio * 100}%` }}
            data-current={stop.project!.id === stageId}
            aria-current={stop.project!.id === stageId ? "true" : undefined}
            aria-label={stop.project!.label}
            title={stop.project!.label}
            // 눈금을 누르면 끌기로 새지 않게 여기서 끊는다.
            onPointerDown={(event) => event.stopPropagation()}
            onClick={() => goTo(stop.viewHeight)}
          >
            <Glyph icon={stop.project!.icon} />
          </button>
        ))}
      </div>

      <button
        type="button"
        className={styles.step}
        onClick={() => step(1)}
        aria-label="축소"
      >
        <Sign />
      </button>
    </div>
  );
};

export default ZoomSlider;
