import ModalLayout from "@/components/common/page/layout/ModalLayout";
import styles from '@/style/detail-page.module.scss';
import "react-notion/src/styles.css";
import "prismjs/themes/prism-tomorrow.css";
import { Metadata } from "next";

const title = "Project | MR.CHU";
const description = "Creative Developer specializing in Three.js, WebGL, and AI-driven 3D animation";
const image = "/assets/og_img_project.jpg";

export const metadata: Metadata = {
  title: title,
  description: description,
  openGraph: {
    title: title,
    description: description,
    images: [
      {
        url: image,
        width: 1200,
        height: 630,
        alt: "FE MR.CHU",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: title,
    description: description,
    images: [image],
  },
}; 

const ProjectLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <ModalLayout text="Project">
        <div className={styles["scroll-wrapper"]}>{children}</div>
    </ModalLayout>
  );
};

export default ProjectLayout;