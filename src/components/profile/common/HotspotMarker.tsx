"use client";

import IconChevronRightRegular from "@seed-design/react-icon/lib/IconChevronRightRegular";
import IconCloseRegular from "@seed-design/react-icon/lib/IconCloseRegular";
import { AnimatePresence, motion } from "motion/react";

import styles from "@/components/profile/common/HotspotMarker.module.scss";

/** 라인이 카드 모서리가 아니라 안쪽에 꽂히도록 미는 양. 카드 높이 기준. */
const CARD_SHIFT = "20%";

/** 라벨·카드가 라인 줄을 기준으로 아래로 펴질지 위로 펴질지. */
export type HotspotPlacement = "down" | "up";

export type HotspotMarkerProps = {
  label: string;
  /** 카드 좌상단 뱃지. 기획 이미지의 01 / 02 / 03. */
  index?: string;
  /** 액센트 색. 점·라인·라벨·테두리가 전부 이 색을 쓴다. */
  accent: string;
  /** 카드에 띄울 이미지(gif 포함). */
  media: string;
  mediaAlt?: string;
  /** gif 아래에 붙는 짧은 설명. */
  description?: string;
  /** "자세히 보기"를 눌렀을 때. 없으면 버튼을 안 그린다. */
  onMore?: () => void;
  /** 점에서 라벨까지의 거리(px). */
  lineLength?: number;
  /** 라벨이 점의 어느 쪽에 붙을지. */
  direction?: "right" | "left";
  /** 카드가 펴지는 세로 방향. 화면 아래쪽 앵커는 "up" 이라야 안 잘린다. */
  placement?: HotspotPlacement;
  open: boolean;
  onToggle: () => void;
};

/**
 * 앵커 점 → 흐르는 라인 → 라벨. 점·라인·라벨 어디를 눌러도 카드가 열린다.
 *
 * 앵커 점을 원점으로 두고 전부 절대 배치한다. 흐름 배치로 두면 카드가
 * 열릴 때 점 위치가 밀려서, 화면 가장자리에서 잘리는지 판단할 기준이 없어진다.
 *
 * 3D 와 무관한 순수 DOM 이라 Canvas 없이도 렌더된다.
 * 3D 좌표에 붙이고 펼침 방향을 정하는 건 `webgl/common/SceneHotspot` 이 맡는다.
 */
export const HotspotMarker = ({
  label,
  index = "01",
  accent,
  media,
  mediaAlt,
  description,
  onMore,
  lineLength = 64,
  direction = "right",
  placement = "down",
  open,
  onToggle,
}: HotspotMarkerProps) => {
  const panelClass = `${styles.panel} ${
    placement === "up" ? styles.placeUp : styles.placeDown
  }`;

  return (
    <div
      className={`${styles.marker} ${direction === "left" ? styles.left : ""}`}
      style={
        {
          "--accent": accent,
          "--line-length": `${lineLength}px`,
        } as React.CSSProperties
      }
    >
      <button
        type="button"
        className={styles.connector}
        onClick={onToggle}
        aria-label={`${label} ${open ? "닫기" : "열기"}`}
      >
        <span className={styles.dot} />
        <span className={styles.line} />
      </button>

      <div className={panelClass}>
        <AnimatePresence initial={false} mode="wait">
          {open ? (
            <motion.div
              key="card"
              className={styles.card}
              style={{
                // 라인 줄에 붙은 모서리를 축으로 펴진다.
                transformOrigin: `${placement === "up" ? "bottom" : "top"} ${
                  direction === "left" ? "right" : "left"
                }`,
                // 라인이 카드 맨 끝 모서리에 닿으면 얹혀만 있는 것처럼 보인다.
                // 카드를 제 높이의 20% 만큼 밀어 라인이 안쪽에 꽂히게 한다.
                // motion 이 scale 과 같은 transform 으로 합성하므로 충돌하지 않는다.
                y: placement === "up" ? CARD_SHIFT : `-${CARD_SHIFT}`,
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            >
              <div className={styles.cardHead}>
                <span className={styles.badge}>{index}</span>
                <h3 className={styles.title}>{label}</h3>
                <button
                  type="button"
                  className={styles.close}
                  onClick={onToggle}
                  aria-label={`${label} 닫기`}
                >
                  ×
                </button>
              </div>
              <img
                className={styles.media}
                src={media}
                alt={mediaAlt ?? label}
              />

              {description && (
                <p className={styles.description}>{description}</p>
              )}

              {onMore && (
                <button type="button" className={styles.more} onClick={onMore}>
                  자세히 보기
                  <span aria-hidden>→</span>
                </button>
              )}
            </motion.div>
          ) : (
            <motion.button
              key="label"
              type="button"
              className={styles.label}
              onClick={onToggle}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ type: "spring", stiffness: 280, damping: 26 }}
            >
              {label}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HotspotMarker;
