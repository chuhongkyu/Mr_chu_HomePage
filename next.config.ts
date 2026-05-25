import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
  reactStrictMode: true,

  experimental: {
    turbo: {
      rules: {
        "*.svg": {
          loaders: ["@svgr/webpack"],
          as: "*.js",
        },
        "*.glsl": {
          loaders: ["raw-loader"],
          as: "*.js",
        },
      },
    },
  },

  sassOptions: {
    includePaths: [
      path.join(__dirname, "src/style"),
      path.join(__dirname, "styles"),
    ],
    additionalData: `
      @use "variables" as *;
      @use "mixins" as *;
    `,
  },

  webpack(config) {
    // 기존 svg 처리 룰 찾기
    const fileLoaderRule = config.module.rules.find((rule: any) =>
      rule.test?.test?.(".svg")
    );

    config.module.rules.push(
      // *.svg?url → 기존 방식(URL)으로 처리
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      // 나머지 *.svg → React 컴포넌트
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ },
        use: ["@svgr/webpack"],
      }
    );

    // 기존 룰에서 .svg 제외
    if (fileLoaderRule) {
      fileLoaderRule.exclude = /\.svg$/i;
    }

    config.module.rules.push({
      test: /\.glsl$/,
      use: "raw-loader",
    });

    return config;
  },
};

export default nextConfig;
