import { create } from "zustand";

import {
  getSlideConfig,
  type PlayerAnimation,
  type SceneTheme,
  SLIDE_CONFIGS,
} from "@/components/profile/constants/slideConfig";

export type { PlayerAnimation, SceneTheme };

const DEFAULT_POST_ID = "7122521989285625856"; // POSTS[0] = 패캠

export const SLIDE_THEMES = SLIDE_CONFIGS.map((c) => c.theme);
export const DEFAULT_THEME = getSlideConfig(DEFAULT_POST_ID).theme;

type PlayerStore = {
  slideIndex: number;
  currentPostId: string;
  animation: PlayerAnimation;
  theme: SceneTheme;
  setSlideIndex: (index: number, postId: string) => void;
  setAnimation: (animation: PlayerAnimation) => void;
};

export const usePlayerStore = create<PlayerStore>((set) => ({
  slideIndex: 0,
  currentPostId: DEFAULT_POST_ID,
  animation: getSlideConfig(DEFAULT_POST_ID).animation,
  theme: getSlideConfig(DEFAULT_POST_ID).theme,
  setSlideIndex: (slideIndex, postId) => {
    const config = getSlideConfig(postId);
    set({ slideIndex, currentPostId: postId, animation: config.animation, theme: config.theme });
  },
  setAnimation: (animation) => set({ animation }),
}));
