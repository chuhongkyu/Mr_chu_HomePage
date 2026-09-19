"use client";

import { useEffect, useRef, useState } from "react";
import { animate,motion, useDragControls, useMotionValue } from "motion/react";

import CloseButton from "@/components/profile/common/CloseButton";

import styles from "@/components/profile/common/BottomSheet.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  variant?: "full" | "half";
  showCloseButton?: boolean;
  /**
   * 안쪽 콘텐츠가 이미 자기 좌우 여백을 갖는지. 켜면 시트가 좌우를 거의
   * 비운다. 노션 글처럼 렌더러가 여백을 넣는 경우에만.
   */
  flush?: boolean;
};

const SPRING = { type: "spring", damping: 32, stiffness: 320 } as const;

const BottomSheet = ({
  isOpen,
  onClose,
  children,
  variant = "full",
  showCloseButton = false,
  flush = false,
}: Props) => {
  const dragControls = useDragControls();
  const y = useMotionValue(0);
  const [visible, setVisible] = useState(false);
  const closingRef = useRef(false);

  useEffect(() => {
    if (isOpen) {
      closingRef.current = false;
      y.set(window.innerHeight);
      setVisible(true);
      animate(y, 0, SPRING);
    }
  }, [isOpen, y]);

  const closeSheet = async () => {
    if (closingRef.current) return;
    closingRef.current = true;
    await animate(y, window.innerHeight, SPRING);
    setVisible(false);
    onClose();
  };

  const handleDragEnd = (
    _: unknown,
    info: { velocity: { y: number }; offset: { y: number } }
  ) => {
    if (info.velocity.y > 300 || info.offset.y > 150) {
      closeSheet();
    } else {
      animate(y, 0, SPRING);
    }
  };

  if (!visible) return null;

  return (
    <>
      <motion.div
        className={styles.backdrop}
        style={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={closeSheet}
      />

      <motion.div
        className={variant === "half" ? styles.sheetHalf : styles.sheet}
        style={{ y }}
        drag="y"
        dragControls={dragControls}
        dragListener={false}
        dragConstraints={{ top: 0 }}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
      >
        <div
          className={styles.handleArea}
          onPointerDown={(e) => dragControls.start(e)}
        >
          <div className={styles.handle} />
        </div>

        {showCloseButton && (
          <CloseButton className={styles.closeBtn} onClick={closeSheet} />
        )}

        <div
          className={`${styles.content} ${flush ? styles.contentFlush : ""}`}
        >
          {children}
        </div>
      </motion.div>
    </>
  );
};

export default BottomSheet;
