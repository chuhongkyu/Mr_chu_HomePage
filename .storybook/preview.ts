import localFont from "next/font/local";
import type { Preview } from "@storybook/nextjs";

// 전역 스타일 + 디자인 토큰(:root / [data-theme]).
import "../src/app/style.scss";

// layout.tsx 와 같은 폰트를 심는다.
// 안 하면 --font-pretendard 가 비어서 스토리북만 시스템 폰트로 보인다.
const pretendard = localFont({
  src: [
    { path: "../src/app/fonts/Pretendard-Regular.woff2", weight: "400" },
    { path: "../src/app/fonts/Pretendard-Medium.woff2", weight: "500" },
    { path: "../src/app/fonts/Pretendard-Bold.woff2", weight: "700" },
  ],
  variable: "--font-pretendard",
  display: "swap",
});

const preview: Preview = {
  parameters: {
    controls: { matchers: { color: /(background|color)$/i } },
    backgrounds: { disable: true },
  },

  // 디자인 토큰의 dark 모드를 스토리에서 바로 전환할 수 있게 한다.
  globalTypes: {
    theme: {
      description: "Design token theme mode",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", icon: "sun", title: "Light" },
          { value: "dark", icon: "moon", title: "Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },

  decorators: [
    (Story, context) => {
      document.documentElement.dataset.theme = context.globals.theme;
      document.documentElement.classList.add(pretendard.variable);
      return Story();
    },
  ],
};

export default preview;
