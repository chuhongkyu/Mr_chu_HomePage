"use client";

import { useRouter } from "next/navigation";

import AboutContainer from "@/components/about/AboutContainer";
import BottomSheet from "@/components/profile/common/BottomSheet";

export default function AboutModal() {
  const router = useRouter();
  return (
    <BottomSheet isOpen={true} onClose={() => router.back()}>
      <AboutContainer />
    </BottomSheet>
  );
}
