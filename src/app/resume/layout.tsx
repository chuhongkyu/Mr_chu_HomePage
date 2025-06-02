import ModalLayout from "@/components/common/page/layout/ModalLayout";
import { Metadata } from "next";

const description = "MR.CHU’s resume featuring roles at Ailive, DOSE Interactive, and Mapo-gu, with project highlights like Samsung, Lotte, KGC, and CASS. Also teaches creative frontend development at Fast Campus."


export const metadata: Metadata = {
  title: "Resume | MR.CHU",
  description: description,
  openGraph: {
    title: "Resume | MR.CHU",
    description: description,
    images: [
      {
        url: "/assets/og-img_resume.jpg",
        width: 1200,
        height: 630,
        alt: "FE MR.CHU",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Resume | MR.CHU",
    description: description,
    images: ["/assets/og-img_resume.jpg"],
  },
}; 

const Layout = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {
    return (
        <ModalLayout text="Resume">
          {children}
        </ModalLayout>
    );
  }

export default Layout;