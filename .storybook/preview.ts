import type { Preview } from "@storybook/nextjs";

// 전역 스타일 + 디자인 토큰(:root / [data-theme]).
import "../src/app/style.scss";

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
      return Story();
    },
  ],
};

export default preview;
