"use client";

import { useRouter } from "next/navigation";

import AboutContainer from "@/components/about/AboutContainer";
import BottomSheet from "@/components/profile/common/BottomSheet";

const AboutPage = () => {
  const router = useRouter();
  return (
    <BottomSheet isOpen={true} onClose={() => router.push("/")}>
      <AboutContainer />
    </BottomSheet>
  );
};

export default AboutPage;
