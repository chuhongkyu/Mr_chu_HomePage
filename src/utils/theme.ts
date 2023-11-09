export interface ITheme {
  theme:{
    black: {
      veryDark: string;
      darker: string;
      lighter: string;
      good: string;
      cloud: string;
    };
    white: {
      lighter: string;
      darker: string;
      gradient: string;
    };
    red: string;
    blue: string;
    yellow: string;
    glass: string;
    universe: string;
    shadow: string;
    device: {
      mobile: string;
      tablet: string;
      mac: string;
    },
  }
};



export const theme = {
  black: {
    veryDark: "#141414",
    darker: "#181818",
    lighter: "#2F2F2F",
    good: "rgb(34,34,34)",
    cloud: "rgba(0, 0, 0, 0.3)",
  },
  white: {
    lighter: "#fff",
    darker: "#e5e5e5",
    gradient: "linear-gradient(to bottom, #fff , #e5e5e5)",
  },
  red: "rgb(224,64,47)",
  blue: "rgb(46,142,214)",
  yellow: "rgb(249,197,30)",
  glass: "rgba(255,255,255,0.4)",
  universe:
    "linear-gradient(190deg, rgb(22, 27, 42), rgb(166, 115, 126), rgb(238,188,17) )",
  shadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
  device: {
    mobile: "screen and (max-width: 680px)",
    tablet: "screen and (max-width: 1024px)",
    mac: "screen and (max-width: 1440px)",
  },
};
