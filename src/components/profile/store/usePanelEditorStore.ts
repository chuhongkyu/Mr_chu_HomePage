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
 * 배치 편집기가 만지는 판 목록. 개발용이다.
 *
 * 조작 UI 는 캔버스 밖 DOM, 판과 기즈모는 캔버스 안이라 둘을 잇는 지점이
 * 필요하다. UI 를 캔버스 안(`drei/Html`)에 두면 drei 가 wrapper 에 transform
 * 을 걸고, transform 은 containing block 을 만들어서 그 안의 `position: fixed`
 * 가 화면에 붙지 못한다. 그래서 UI 를 밖으로 뺐다.
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
