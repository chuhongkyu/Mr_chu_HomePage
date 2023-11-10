import { atom } from "recoil";
import { getCookie } from "utils/helper";

export const appList = atom({
  key: "app",
  default: ["resume", "about", "github", "project", "game_app"],
});


export const loginAtom = atom({
  key: "login",
  default: Boolean(getCookie('login')) ? false : true,
});


export const typing = atom({
  key: "typing",
  default: false
});