import { create } from "zustand";
import {
  SLIDE_CONFIGS,
  type PlayerAnimation,
  type SceneTheme,
} from "@/components/profile/constants/slideConfig";

export type { PlayerAnimation, SceneTheme };

export const SLIDE_THEMES = SLIDE_CONFIGS.map((c) => c.theme);
export const DEFAULT_THEME = SLIDE_THEMES[0];

type PlayerStore = {
  slideIndex: number;
  animation: PlayerAnimation;
  theme: SceneTheme;
  setSlideIndex: (index: number) => void;
  setAnimation: (animation: PlayerAnimation) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  slideIndex: 0,
  animation: SLIDE_CONFIGS[0].animation,
  theme: SLIDE_CONFIGS[0].theme,
  setSlideIndex: (slideIndex) => {
    const config = SLIDE_CONFIGS[slideIndex] ?? SLIDE_CONFIGS[0];
    set({ slideIndex, animation: config.animation, theme: config.theme });
  },
  setAnimation: (animation) => set({ animation }),
}));
