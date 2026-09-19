// 이 파일은 `npm run tokens` 로 생성됩니다. 직접 수정하지 마세요.
// 원본: tokens/*.json
export const color = {
  "gray": {
    "0": "#ffffff",
    "50": "#f8f8f8",
    "100": "#f5f5f5",
    "200": "#e8e8e8",
    "300": "#d4d4d4",
    "400": "#a3a3a3",
    "500": "#777777",
    "600": "#515151",
    "700": "#333333",
    "800": "#2c2c2c",
    "900": "#222222",
    "950": "#181818",
    "1000": "#000000"
  },
  "slate": {
    "100": "#f1f5f9",
    "200": "#e2e8f0",
    "400": "#94a3b8",
    "700": "#334155",
    "800": "#1e293b",
    "900": "#0f172a"
  },
  "brand": {
    "500": "#5b8dd9"
  },
  "daangn": {
    "garden": "#319769",
    "room": "#c75a50",
    "fleamarket": "#a8801a",
    "backdrop": "#e1e1e1"
  },
  "sand": {
    "50": "#f2f0eb",
    "100": "#eae8e2"
  },
  "amber": {
    "500": "#f4c430"
  },
  "ink": {
    "800": "#2a3038"
  },
  "alpha": {
    "black": {
      "5": "rgba(0, 0, 0, 0.05)",
      "10": "rgba(0, 0, 0, 0.1)",
      "24": "rgba(0, 0, 0, 0.24)",
      "30": "rgba(0, 0, 0, 0.3)",
      "40": "rgba(0, 0, 0, 0.4)",
      "50": "rgba(0, 0, 0, 0.5)",
      "60": "rgba(0, 0, 0, 0.6)",
      "80": "rgba(0, 0, 0, 0.8)"
    },
    "white": {
      "20": "rgba(255, 255, 255, 0.2)",
      "30": "rgba(255, 255, 255, 0.3)",
      "40": "rgba(255, 255, 255, 0.4)",
      "50": "rgba(255, 255, 255, 0.5)",
      "60": "rgba(255, 255, 255, 0.6)"
    },
    "brand": {
      "15": "rgba(91, 141, 217, 0.15)"
    }
  },
  "semantic": {
    "font": {
      "base": "#000000",
      "muted": "#333333",
      "invert": "#f1f5f9"
    },
    "bg": {
      "base": "#ffffff",
      "surface": "#ffffff"
    },
    "bg-surface-shadow": "rgba(0, 0, 0, 0.1)",
    "border": "#e2e8f0",
    "chip-active": "#2a3038",
    "bg1": "#eae8e2",
    "bg2": "#f2f0eb"
  }
} as const;

export const layer = {
  "scene-html": 3,
  "header": 5,
  "nav": 6,
  "hotspot-card": 8,
  "sheet-backdrop": 10,
  "sheet": 11,
  "sheet-close": 20,
  "popup": 100,
  "toast": 200
} as const;

export const radius = {
  "none": "0px",
  "xs": "4px",
  "sm": "6px",
  "md": "8px",
  "lg": "12px",
  "xl": "16px",
  "2xl": "20px",
  "3xl": "24px",
  "pill": "999px",
  "full": "50%"
} as const;

export const space = {
  "0": "0px",
  "1": "2px",
  "2": "4px",
  "3": "6px",
  "4": "8px",
  "5": "10px",
  "6": "12px",
  "7": "14px",
  "8": "16px",
  "10": "20px",
  "12": "24px",
  "16": "32px",
  "20": "40px",
  "24": "48px"
} as const;

export type ColorToken = typeof color;
