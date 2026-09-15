import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(ts|tsx)"],

  framework: {
    name: "@storybook/nextjs",
    options: {},
  },

  staticDirs: ["../public"],

  typescript: {
    // props 테이블을 자동 생성한다. 3D 컴포넌트의 props 를 보여주는 게 목적.
    reactDocgen: "react-docgen-typescript",
  },

  // next.config 의 sassOptions(토큰 additionalData 포함)는 @storybook/nextjs 가
  // 자동으로 읽어간다. 하지만 커스텀 webpack() 룰은 읽지 않으므로 여기서 다시 선언한다.
  webpackFinal: async (config) => {
    const fileLoaderRule = config.module?.rules?.find(
      (rule) =>
        rule &&
        typeof rule === "object" &&
        "test" in rule &&
        (rule.test as RegExp)?.test?.(".svg")
    );
    if (fileLoaderRule && typeof fileLoaderRule === "object") {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module?.rules?.push(
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
      {
        test: /\.glsl$/,
        use: "raw-loader",
      }
    );

    return config;
  },
};

export default config;
