"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import BottomSheet from "@/components/profile/common/BottomSheet";
import { useCoinStore } from "@/components/profile/store/useCoinStore";
import { usePostViewStore } from "@/components/profile/store/usePostViewStore";

type Props = {
  id: string;
  children: React.ReactNode;
  closeHref?: string;
};

const ProjectDetailShell = ({ id, children, closeHref }: Props) => {
  const router = useRouter();
  const { viewed, markViewed } = usePostViewStore();
  const earn = useCoinStore((s) => s.earn);

  useEffect(() => {
    if (!viewed[id]) {
      markViewed(id);
      earn(1);
    }
  }, [id, viewed, markViewed, earn]);

  const handleClose = () => {
    if (closeHref) router.push(closeHref);
    else router.back();
  };

  return (
    <BottomSheet isOpen={true} onClose={handleClose}>
      {children}
    </BottomSheet>
  );
};

export default ProjectDetailShell;
