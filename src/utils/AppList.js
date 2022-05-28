const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

export const AppList = [
  {
    id: 0,
    name: "About Me",
    logo: `${env.PUBLIC_URL}/assets/img/folder.svg`,
  },
  {
    id: 1,
    name: "Works",
    logo: `${env.PUBLIC_URL}/assets/img/folder.svg`,
  },
  {
    id: 2,
    name: "gitHub",
    logo: "https://seeklogo.com/images/G/github-logo-7880D80B8D-seeklogo.com.png",
  },
];
