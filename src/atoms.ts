import { atom } from "recoil";

export const appList = atom({
  key: "app",
  default: ["resume", "about", "github", "project", "game_app"],
});

// export const bigList = atom({
//   key: "big",
//   default: [
//     "큰 프로젝트",
//     "귀여운 홈페이지",
//     "3D 프로젝트",
//     "바닐라 자바스크립트",
//     "넷플릭스",
//   ],
// });
