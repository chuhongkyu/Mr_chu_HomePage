import { create } from "zustand";

import {
  FASTCAMPUS_PANELS,
  type Placement,
} from "@/components/profile/webgl/scenes/fastcampusPanels";

type PanelEditorStore = {
  panels: Placement[];
  selectedId: string;
  select: (id: string) => void;
  /** 선택된 판만 고친다. */
  patch: (next: Partial<Placement>) => void;
  reset: () => void;
};

/**
 * 배치 편집기가 만지는 판 목록. 개발용.
 *
 * 조작 UI 는 캔버스 밖, 판과 기즈모는 캔버스 안이라 둘을 잇는 지점이 필요하다.
 * UI 를 `drei/Html` 안에 두면 drei 가 건 transform 이 containing block 을
 * 만들어 `position: fixed` 를 가둔다.
 */
export const usePanelEditorStore = create<PanelEditorStore>((set) => ({
  panels: FASTCAMPUS_PANELS,
  selectedId: FASTCAMPUS_PANELS[0]?.id ?? "",

  select: (selectedId) => set({ selectedId }),

  patch: (next) =>
    set((state) => ({
      panels: state.panels.map((panel) =>
        panel.id === state.selectedId ? { ...panel, ...next } : panel
      ),
    })),

  reset: () => set({ panels: FASTCAMPUS_PANELS }),
}));
