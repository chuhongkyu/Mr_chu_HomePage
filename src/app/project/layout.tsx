import { Metadata } from "next";

import { OG_IMAGE } from "@/constants/site";

import "prismjs/themes/prism-tomorrow.css";
import "react-notion-x/src/styles.css";

const title = "Project";
const description =
  "Creative Developer specializing in Three.js, WebGL, and AI-driven 3D animation";

export const metadata: Metadata = {
  // 문자열 하나로 두면 루트의 title.template 이 이 가지에서 통째로 사라져,
  // 글 제목(`당근이네`)에 사이트 이름이 안 붙는다. 여기서 다시 세운다.
  title: { default: title, template: "%s | MR.CHU" },
  description: description,
  openGraph: {
    title: title,
    description: description,
    images: [OG_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [OG_IMAGE.url],
  },
};

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return <>{children}</>;
};

export default ProjectLayout;
