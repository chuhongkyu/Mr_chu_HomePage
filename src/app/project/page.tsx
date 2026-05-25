"use client";

import { useRouter } from "next/navigation";

import BottomSheet from "@/components/profile/common/BottomSheet";
import ProjectListSheet from "@/components/project/ProjectListSheet";

const ProjectPage = () => {
  const router = useRouter();
  return (
    <BottomSheet isOpen={true} onClose={() => router.push("/")}>
      <ProjectListSheet />
    </BottomSheet>
  );
};

export default ProjectPage;
