"use client";

import { useRouter } from "next/navigation";

import BottomSheet from "@/components/profile/common/BottomSheet";
import ProjectListSheet from "@/components/project/ProjectListSheet";

export default function ProjectListModal() {
  const router = useRouter();
  return (
    <BottomSheet isOpen={true} onClose={() => router.back()}>
      <ProjectListSheet />
    </BottomSheet>
  );
}
