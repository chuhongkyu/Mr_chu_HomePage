import { atom, selector } from "recoil";
import { AppList } from "./utils/AppList";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const apps = [
  {
    name: "About Me",
    logo: `${env.PUBLIC_URL}/assets/img/folder.svg`,
    path: "/about",
    page: "<About/>",
  },
  {
    name: "Works",
    logo: `${env.PUBLIC_URL}/assets/img/folder.svg`,
    path: "/works",
    page: "",
  },
  {
    name: "git Hub",
    logo: "https://seeklogo.com/images/G/github-logo-7880D80B8D-seeklogo.com.png",
    path: "/git",
    page: "",
  },
];

export const appList = atom({
  key: "app",
  default: apps,
});
