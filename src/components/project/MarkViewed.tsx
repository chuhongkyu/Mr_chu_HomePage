"use client";

import { useEffect } from "react";

import { useCoinStore } from "@/components/profile/store/useCoinStore";
import { usePostViewStore } from "@/components/profile/store/usePostViewStore";

/**
 * 글을 처음 열면 코인을 준다.
 *
 * 문서 자체는 서버에서 그려야 검색에 잡히므로, 상태가 필요한 이 한 조각만
 * 클라이언트로 떼어 낸다.
 */
const MarkViewed = ({ id }: { id: string }) => {
  const { viewed, markViewed } = usePostViewStore();
  const earn = useCoinStore((s) => s.earn);

  useEffect(() => {
    if (viewed[id]) return;
    markViewed(id);
    earn(1);
  }, [id, viewed, markViewed, earn]);

  return null;
};

export default MarkViewed;
