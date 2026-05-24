"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useDragControls, useMotionValue, animate } from "motion/react";
import { X } from "lucide-react";
import styles from "./BottomSheet.module.scss";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const SPRING = { type: "spring", damping: 32, stiffness: 320 } as const;

const BottomSheet = ({ isOpen, onClose, children }: Props) => {
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
        className={styles.sheet}
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

        <button className={styles.closeBtn} onClick={closeSheet} aria-label="닫기">
          <X size={20} />
        </button>

        <div className={styles.content}>{children}</div>
      </motion.div>
    </>
  );
};

export default BottomSheet;
