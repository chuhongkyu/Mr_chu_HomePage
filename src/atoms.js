import { atom } from "recoil";

export const appList = atom({
  key: "app",
  default: ["resume", "about", "github", "others"],
});

// logo: `${env.PUBLIC_URL}/assets/img/folder.svg`,
//     pathName: "/about",
//     page: "<About/>",
