const config = {
  "*.{ts,tsx}": (files) =>
    files.map((f) => `next lint --fix --file ${f}`),
};

export default config;
