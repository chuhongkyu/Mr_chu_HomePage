import { atom } from "recoil";

export const appList = atom({
  key: "app",
  default: ["resume", "about", "github", "project", "game_app"],
});


export const stateType = atom({
  key: "test",
  default: false,
});