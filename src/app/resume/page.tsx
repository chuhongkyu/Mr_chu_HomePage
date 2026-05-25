"use client";

import { useRouter } from "next/navigation";

import BottomSheet from "@/components/profile/common/BottomSheet";
import CareerContainer from "@/components/resume/CareerContainer";

const ResumePage = () => {
  const router = useRouter();
  return (
    <BottomSheet isOpen={true} onClose={() => router.push("/")}>
      <CareerContainer />
    </BottomSheet>
  );
};

export default ResumePage;
