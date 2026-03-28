import React from "react";
import { AnimatePresence, motion } from "motion/react";

import { PROFILE_ITEMS } from "@/components/profile/constants/profileItems";
import {
  useProfileActivePlacedObjects,
  useProfileCanRedo,
  useProfileCanUndo,
  useProfilePlacementStore,
} from "@/components/profile/store/useProfilePlacementStore";

import { useProfileDragDropManager } from "./ProfileDragDropManager";
import styles from "./InventoryBottomSheet.module.scss";

const InventoryBottomSheet = () => {
  const isOpen = useProfilePlacementStore((s) => s.isInventoryOpen);
  const closeInventory = useProfilePlacementStore((s) => s.closeInventory);
  const placeObjectAuto = useProfilePlacementStore((s) => s.placeObjectAuto);
  const removeObject = useProfilePlacementStore((s) => s.removeObject);
  const undo = useProfilePlacementStore((s) => s.undo);
  const redo = useProfilePlacementStore((s) => s.redo);
  const canUndo = useProfileCanUndo();
  const canRedo = useProfileCanRedo();
  const placedObjects = useProfileActivePlacedObjects();

  const placedCountMap = React.useMemo(
    () =>
      placedObjects.reduce<Record<string, string[]>>((acc, obj) => {
        acc[obj.code] = acc[obj.code] ?? [];
        acc[obj.code].push(obj.id);
        return acc;
      }, {}),
    [placedObjects]
  );

  const handleItemClick = (code: string) => {
    const ids = placedCountMap[code];
    if (ids && ids.length > 0) {
      removeObject(ids[ids.length - 1]);
    } else {
      placeObjectAuto(code);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Header row */}
          <div className={styles.header}>
            <div className={styles.undoRedo}>
              <button
                className={styles.iconButton}
                onClick={undo}
                disabled={!canUndo}
                aria-label="undo"
              >
                <UndoIcon />
              </button>
              <button
                className={styles.iconButton}
                onClick={redo}
                disabled={!canRedo}
                aria-label="redo"
              >
                <RedoIcon />
              </button>
            </div>
          </div>

          <motion.div
            className={styles.sheet}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ ease: [0.32, 0.72, 0, 1], duration: 0.4 }}
          >
            {/* Item grid */}
            <div className={styles.itemGrid}>
              {PROFILE_ITEMS.map((item) => {
                const count = placedCountMap[item.code]?.length ?? 0;
                return (
                  <InventoryItemCard
                    key={item.code}
                    code={item.code}
                    label={item.label}
                    color={item.color}
                    count={count}
                    onClick={() => handleItemClick(item.code)}
                  />
                );
              })}
            </div>

            {/* Footer buttons */}
            <div className={styles.footer}>
              <button
                className={styles.cancelButton}
                onClick={() => closeInventory(false)}
              >
                Cancel
              </button>
              <button
                className={styles.confirmButton}
                onClick={() => closeInventory(true)}
              >
                Done
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default InventoryBottomSheet;

// ─── Item Card ───────────────────────────────────────────────────────

interface ItemCardProps {
  code: string;
  label: string;
  color: string;
  count: number;
  onClick: () => void;
}

const InventoryItemCard = ({
  code,
  label,
  color,
  count,
  onClick,
}: ItemCardProps) => {
  const { startThumbnailDrag } = useProfileDragDropManager();
  const isPlaced = count > 0;

  const onPointerDown = (e: React.PointerEvent) => {
    e.preventDefault();
    startThumbnailDrag(code, e.clientX, e.clientY);
  };

  return (
    <div
      className={styles.itemWrapper}
      onClick={onClick}
      onPointerDown={onPointerDown}
    >
      <div
        className={`${styles.itemBox} ${isPlaced ? styles.placed : ""}`}
        style={{ "--item-color": color } as React.CSSProperties}
      >
        <div className={styles.itemSwatch} style={{ background: color }} />
        {isPlaced && <span className={styles.badge}>{count}</span>}
      </div>
      <span className={styles.itemLabel}>{label}</span>
    </div>
  );
};

// ─── Icons ───────────────────────────────────────────────────────────

const UndoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M3 7v6h6" />
    <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
  </svg>
);

const RedoIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M21 7v6h-6" />
    <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3L21 13" />
  </svg>
);
