"use client";

import { useRouter } from "next/navigation";

import BottomSheet from "@/components/profile/common/BottomSheet";
import CareerContainer from "@/components/resume/CareerContainer";

export default function ResumeModal() {
  const router = useRouter();
  return (
    <BottomSheet isOpen={true} onClose={() => router.back()}>
      <CareerContainer />
    </BottomSheet>
  );
}
