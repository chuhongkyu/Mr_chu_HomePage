import type { NextConfig } from "next";
const path = require('path');

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
  sassOptions: {
    includePaths: [
      path.join(__dirname, 'src/style'),
      path.join(__dirname, 'styles')
    ],
    additionalData: `
      @use "variables" as *;
      @use "mixins" as *;
    `
  }
};

export default nextConfig;
