import React from "react";

import { profileDragScreenPosition } from "@/components/profile/inventory/dragScreenPosition";
import { useProfilePlacementStore } from "@/components/profile/store/useProfilePlacementStore";
import { PROFILE_ITEM_MAP } from "@/components/profile/webgl/object/profileItems";

import styles from "@/components/profile/inventory/ProfileDragDropManager.module.scss";

// ─── Context ─────────────────────────────────────────────────────────

interface DragDropContextValue {
  startThumbnailDrag: (code: string, x: number, y: number) => void;
}

const ProfileDragDropContext = React.createContext<DragDropContextValue>({
  startThumbnailDrag: () => {},
});

export const useProfileDragDropManager = () =>
  React.useContext(ProfileDragDropContext);

// ─── Provider ────────────────────────────────────────────────────────

interface PreviewState {
  code: string;
  x: number;
  y: number;
}

export const ProfileDragDropManager: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [preview, setPreview] = React.useState<PreviewState | null>(null);
  const isListeningRef = React.useRef(false);

  const startDrag = useProfilePlacementStore((s) => s.startDrag);
  const endDrag = useProfilePlacementStore((s) => s.endDrag);
  const cancelDrag = useProfilePlacementStore((s) => s.cancelDrag);

  const startThumbnailDrag = React.useCallback(
    (code: string, x: number, y: number) => {
      setPreview({ code, x, y });
      profileDragScreenPosition.x = x;
      profileDragScreenPosition.y = y;
      profileDragScreenPosition.active = true;
      startDrag("inventory", code);

      if (isListeningRef.current) return;
      isListeningRef.current = true;

      const onPointerMove = (e: PointerEvent) => {
        profileDragScreenPosition.x = e.clientX;
        profileDragScreenPosition.y = e.clientY;
        setPreview((prev) =>
          prev ? { ...prev, x: e.clientX, y: e.clientY } : null
        );
      };

      const cleanup = () => {
        window.removeEventListener("pointermove", onPointerMove, {
          capture: true,
        });
        window.removeEventListener("pointerup", onPointerUp, { capture: true });
        window.removeEventListener("pointercancel", onPointerCancel, {
          capture: true,
        });
        isListeningRef.current = false;
        profileDragScreenPosition.active = false;
        setPreview(null);
      };

      const onPointerUp = () => {
        cleanup();
        endDrag();
      };
      const onPointerCancel = () => {
        cleanup();
        cancelDrag();
      };

      window.addEventListener("pointermove", onPointerMove, { capture: true });
      window.addEventListener("pointerup", onPointerUp, { capture: true });
      window.addEventListener("pointercancel", onPointerCancel, {
        capture: true,
      });
    },
    [startDrag, endDrag, cancelDrag]
  );

  const contextValue = React.useMemo(
    () => ({ startThumbnailDrag }),
    [startThumbnailDrag]
  );
  const itemDef = preview ? PROFILE_ITEM_MAP[preview.code] : null;

  return (
    <ProfileDragDropContext.Provider value={contextValue}>
      {children}
      {preview && itemDef && (
        <div
          className={styles.floatingPreview}
          style={{
            left: preview.x - 22,
            top: preview.y - 22,
            background: itemDef.color,
          }}
        />
      )}
    </ProfileDragDropContext.Provider>
  );
};
