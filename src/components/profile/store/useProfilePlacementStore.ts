import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { PROFILE_ITEM_MAP } from "@/components/profile/constants/profileItems";
import {
  canPlace,
  findFirstAvailablePosition,
} from "@/components/profile/inventory/InventoryGridEngine";

// ─── Types ────────────────────────────────────────────────────────────

export type PlacedProfileObject = {
  id: string;
  code: string;
  gridX: number;
  gridY: number;
};

export type ProfileDragState = {
  source: "inventory" | "scene";
  code: string;
  sourceObjectId?: string;
  worldPos: [number, number, number];
  gridX: number | null;
  gridY: number | null;
  isValidPlacement: boolean;
};

// ─── Helpers ──────────────────────────────────────────────────────────

type PlacedItem = {
  id: string;
  gridX: number;
  gridY: number;
  w: number;
  h: number;
};

const toPlacedItems = (objs: PlacedProfileObject[]): PlacedItem[] =>
  objs.map((o) => ({
    id: o.id,
    gridX: o.gridX,
    gridY: o.gridY,
    w: PROFILE_ITEM_MAP[o.code]?.w ?? 1,
    h: PROFILE_ITEM_MAP[o.code]?.h ?? 1,
  }));

const MAX_HISTORY = 20;

const getActive = (s: {
  pendingObjects: PlacedProfileObject[];
}) => s.pendingObjects;

const pushHistory = (s: {
  pendingObjects: PlacedProfileObject[];
  undoStack: PlacedProfileObject[][];
  redoStack: PlacedProfileObject[][];
}) => {
  const snapshot = JSON.parse(
    JSON.stringify(s.pendingObjects)
  ) as PlacedProfileObject[];
  s.undoStack.push(snapshot);
  if (s.undoStack.length > MAX_HISTORY) s.undoStack.shift();
  s.redoStack = [];
};

// ─── Store ────────────────────────────────────────────────────────────

type State = {
  placedObjects: PlacedProfileObject[];     // persisted to localStorage
  pendingObjects: PlacedProfileObject[];    // always an array, used for rendering
  cancelSnapshot: PlacedProfileObject[] | null;
  isInventoryOpen: boolean;
  isEditMode: boolean;
  dragState: ProfileDragState | null;
  undoStack: PlacedProfileObject[][];
  redoStack: PlacedProfileObject[][];
};

type Actions = {
  openInventory: () => void;
  closeInventory: (confirm: boolean) => void;
  placeObject: (code: string, gridX: number, gridY: number) => boolean;
  placeObjectAuto: (code: string) => boolean;
  removeObject: (id: string) => void;
  startDrag: (
    source: "inventory" | "scene",
    code: string,
    sourceObjectId?: string
  ) => void;
  updateDrag: (params: {
    worldPos: [number, number, number];
    gridX: number | null;
    gridY: number | null;
    outOfBounds?: boolean;
  }) => void;
  endDrag: () => void;
  cancelDrag: () => void;
  undo: () => void;
  redo: () => void;
};

export const useProfilePlacementStore = create<State & Actions>()(
  persist(
    immer((set) => ({
      placedObjects: [],
      pendingObjects: [],   // initialized from placedObjects via onRehydrateStorage
      cancelSnapshot: null,
      isInventoryOpen: false,
      isEditMode: false,
      dragState: null,
      undoStack: [],
      redoStack: [],

      openInventory: () => {
        set((s) => {
          s.isInventoryOpen = true;
          if (!s.isEditMode) {
            s.isEditMode = true;
            s.cancelSnapshot = JSON.parse(JSON.stringify(s.pendingObjects));
            s.undoStack = [];
            s.redoStack = [];
          }
        });
      },

      closeInventory: (confirm) => {
        set((s) => {
          if (confirm) {
            s.placedObjects = JSON.parse(JSON.stringify(s.pendingObjects));
          } else if (s.cancelSnapshot !== null) {
            s.pendingObjects = s.cancelSnapshot;
          }
          s.cancelSnapshot = null;
          s.isInventoryOpen = false;
          s.isEditMode = false;
          s.dragState = null;
          s.undoStack = [];
          s.redoStack = [];
        });
      },

      placeObject: (code, gridX, gridY) => {
        let placed = false;
        set((s) => {
          const itemDef = PROFILE_ITEM_MAP[code];
          if (!itemDef) return;
          const candidate: PlacedItem = {
            id: "__temp__",
            gridX,
            gridY,
            w: itemDef.w,
            h: itemDef.h,
          };
          if (!canPlace(toPlacedItems(s.pendingObjects), candidate)) return;
          pushHistory(s);
          s.pendingObjects.push({ id: crypto.randomUUID(), code, gridX, gridY });
          placed = true;
        });
        return placed;
      },

      placeObjectAuto: (code) => {
        let placed = false;
        set((s) => {
          const itemDef = PROFILE_ITEM_MAP[code];
          if (!itemDef) return;
          const result = findFirstAvailablePosition(
            toPlacedItems(s.pendingObjects),
            itemDef.w,
            itemDef.h
          );
          if (!result) return;
          pushHistory(s);
          s.pendingObjects.push({
            id: crypto.randomUUID(),
            code,
            gridX: result.gridX,
            gridY: result.gridY,
          });
          placed = true;
        });
        return placed;
      },

      removeObject: (id) => {
        set((s) => {
          pushHistory(s);
          const idx = s.pendingObjects.findIndex((o) => o.id === id);
          if (idx !== -1) s.pendingObjects.splice(idx, 1);
        });
      },

      startDrag: (source, code, sourceObjectId) => {
        set((s) => {
          s.dragState = {
            source,
            code,
            sourceObjectId,
            worldPos: [0, 0, 0],
            gridX: null,
            gridY: null,
            isValidPlacement: false,
          };
        });
      },

      updateDrag: ({ worldPos, gridX, gridY, outOfBounds }) => {
        set((s) => {
          if (!s.dragState) return;
          const itemDef = PROFILE_ITEM_MAP[s.dragState.code];
          if (!itemDef) return;
          s.dragState.worldPos = worldPos;
          s.dragState.gridX = gridX;
          s.dragState.gridY = gridY;
          if (gridX === null || gridY === null || outOfBounds) {
            s.dragState.isValidPlacement = false;
            return;
          }
          const base =
            s.dragState.source === "scene" && s.dragState.sourceObjectId
              ? s.pendingObjects.filter(
                  (o) => o.id !== s.dragState!.sourceObjectId
                )
              : s.pendingObjects;
          const candidate: PlacedItem = {
            id: s.dragState.sourceObjectId ?? "__drag__",
            gridX,
            gridY,
            w: itemDef.w,
            h: itemDef.h,
          };
          s.dragState.isValidPlacement = canPlace(
            toPlacedItems(base),
            candidate
          );
        });
      },

      endDrag: () => {
        set((s) => {
          const { dragState } = s;
          if (
            !dragState ||
            !dragState.isValidPlacement ||
            dragState.gridX === null ||
            dragState.gridY === null
          ) {
            s.dragState = null;
            return;
          }
          pushHistory(s);

          if (dragState.source === "scene" && dragState.sourceObjectId) {
            // mutate in place — component stays mounted, only position updates
            const item = s.pendingObjects.find(
              (o) => o.id === dragState.sourceObjectId
            );
            if (item) {
              item.gridX = dragState.gridX;
              item.gridY = dragState.gridY;
            }
          } else {
            s.pendingObjects.push({
              id: crypto.randomUUID(),
              code: dragState.code,
              gridX: dragState.gridX,
              gridY: dragState.gridY,
            });
          }

          s.dragState = null;
        });
      },

      cancelDrag: () => {
        set((s) => {
          s.dragState = null;
        });
      },

      undo: () => {
        set((s) => {
          if (s.undoStack.length === 0) return;
          const snapshot = s.undoStack.pop()!;
          const current = JSON.parse(
            JSON.stringify(s.pendingObjects)
          ) as PlacedProfileObject[];
          s.redoStack.push(current);
          s.pendingObjects = snapshot;
        });
      },

      redo: () => {
        set((s) => {
          if (s.redoStack.length === 0) return;
          const snapshot = s.redoStack.pop()!;
          const current = JSON.parse(
            JSON.stringify(s.pendingObjects)
          ) as PlacedProfileObject[];
          s.undoStack.push(current);
          s.pendingObjects = snapshot;
        });
      },
    })),
    {
      name: "profile-placement",
      partialize: (s) => ({ placedObjects: s.placedObjects }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          // pendingObjects는 항상 placedObjects와 동기화된 상태로 시작
          state.pendingObjects = JSON.parse(
            JSON.stringify(state.placedObjects)
          );
        }
      },
    }
  )
);

export const useProfileActivePlacedObjects = () =>
  useProfilePlacementStore((s) => s.pendingObjects);

export const useProfileCanUndo = () =>
  useProfilePlacementStore((s) => s.undoStack.length > 0);
export const useProfileCanRedo = () =>
  useProfilePlacementStore((s) => s.redoStack.length > 0);
