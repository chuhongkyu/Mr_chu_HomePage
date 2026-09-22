import { create } from "zustand";
import { persist } from "zustand/middleware";

export type DevTool = "panels" | "stage";

export const DEV_TOOLS: { id: DevTool; label: string; hint: string }[] = [
  { id: "panels", label: "유리 패널 배치", hint: "온라인 강의" },
  { id: "stage", label: "건물 · 등장 지점", hint: "당근이네" },
];

type DevToolsStore = {
  open: boolean;
  /** 버튼 자리. 화면 왼쪽 위 기준 px. */
  x: number;
  y: number;
  tools: Record<DevTool, boolean>;
  setOpen: (open: boolean) => void;
  move: (x: number, y: number) => void;
  toggle: (tool: DevTool) => void;
};

export const useDevToolsStore = create<DevToolsStore>()(
  persist(
    (set) => ({
      open: false,
      x: 24,
      y: 120,
      tools: { panels: false, stage: false },

      setOpen: (open) => set({ open }),
      move: (x, y) => set({ x, y }),
      toggle: (tool) =>
        set((state) => ({
          tools: { ...state.tools, [tool]: !state.tools[tool] },
        })),
    }),
    { name: "dev-tools", version: 1 }
  )
);
