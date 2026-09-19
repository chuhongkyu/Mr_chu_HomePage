"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import IconChevronRightRegular from "@seed-design/react-icon/lib/IconChevronRightRegular";
import { AnimatePresence, motion } from "motion/react";

import CloseButton from "@/components/profile/common/CloseButton";

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
  /**
   * 카드를 앵커 옆이 아니라 화면 한가운데 띄운다.
   *
   * 좁은 화면에서는 앵커 어디에 붙여도 268px 카드가 가장자리를 넘는다.
   * 이때는 `Html` 밖(body)으로 내보내야 한다. drei 가 래퍼에 transform 을
   * 걸어 두는데, transform 은 containing block 을 만들어 안쪽의
   * `position: fixed` 를 가두기 때문이다.
   */
  centered?: boolean;
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
  centered = false,
  open,
  onToggle,
}: HotspotMarkerProps) => {
  /**
   * 가운데 카드를 내보낼 자리.
   *
   * `document.body` 가 아니다. 이 앱은 `.main` 이 z-index 를 갖고 있어 자기
   * 쌓임 맥락을 만든다. body 로 내보내면 그 바깥에 서게 되어, 안쪽의
   * 바텀시트가 아무리 높은 z-index 를 써도 카드가 그 위로 올라온다.
   */
  const [portalTarget, setPortalTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setPortalTarget(
      document.querySelector<HTMLElement>("[data-scene-root]") ?? document.body
    );
  }, []);

  const panelClass = `${styles.panel} ${
    placement === "up" ? styles.placeUp : styles.placeDown
  }`;

  const cardBody = (
    <>
      <div className={styles.cardHead}>
        <span className={styles.badge}>{index}</span>
        <h3 className={styles.title}>{label}</h3>
        <CloseButton size="sm" onClick={onToggle} label={`${label} 닫기`} />
      </div>
      <img className={styles.media} src={media} alt={mediaAlt ?? label} />

      {description && <p className={styles.description}>{description}</p>}

      {onMore && (
        <button type="button" className={styles.more} onClick={onMore}>
          자세히 보기
          <span aria-hidden>→</span>
        </button>
      )}
    </>
  );

  /** 앵커 옆에 펴지는 카드. 라인 줄에 붙은 모서리를 축으로 자란다. */
  const anchoredCard = (
    <motion.div
      key="card"
      className={styles.card}
      style={{
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
      {cardBody}
    </motion.div>
  );

  /**
   * 화면 한가운데 뜨는 카드. `Html` 바깥(body)으로 내보낸다.
   *
   * `data-hotspot-card` 는 바깥 클릭 판정에 쓰인다. 이 카드는 앵커 DOM
   * 밖에 있어서, 표시가 없으면 카드를 누르는 순간 바깥으로 보고 닫아 버린다.
   */
  const centeredCard = !portalTarget
    ? null
    : createPortal(
        <AnimatePresence>
          {open && (
            <div className={styles.centerLayer} data-hotspot-card>
                <motion.div
                  className={styles.centerBackdrop}
                  onClick={onToggle}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <motion.div
                  className={`${styles.card} ${styles.centered}`}
                  style={{ "--accent": accent } as React.CSSProperties}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ type: "spring", stiffness: 280, damping: 26 }}
                >
                  {cardBody}
                </motion.div>
              </div>
            )}
          </AnimatePresence>,
          document.body
        );

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
          {open && !centered ? (
            anchoredCard
          ) : open ? null : (
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

      {centered && centeredCard}
    </div>
  );
};

export default HotspotMarker;
