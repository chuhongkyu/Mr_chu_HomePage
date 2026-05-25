"use client";

import { useRouter } from "next/navigation";

import UnityContainer from "@/components/game/UnityContainer";
import BottomSheet from "@/components/profile/common/BottomSheet";

export default function GameModal() {
  const router = useRouter();
  return (
    <BottomSheet isOpen={true} onClose={() => router.back()}>
      <UnityContainer />
    </BottomSheet>
  );
}
