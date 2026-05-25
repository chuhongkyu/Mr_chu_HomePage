"use client";

import { useRouter } from "next/navigation";

import UnityContainer from "@/components/game/UnityContainer";
import BottomSheet from "@/components/profile/common/BottomSheet";

const GamePage = () => {
  const router = useRouter();
  return (
    <BottomSheet isOpen={true} onClose={() => router.push("/")}>
      <UnityContainer />
    </BottomSheet>
  );
};

export default GamePage;
