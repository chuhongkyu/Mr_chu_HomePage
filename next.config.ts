import type { NextConfig } from "next";
const path = require('path');

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
    prependData: `
      @use "@/style/variables" as *;
      @use "@/style/mixins" as *;
      `
  }
};

export default nextConfig;
