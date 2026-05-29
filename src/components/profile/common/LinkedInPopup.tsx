"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ExternalLink } from "lucide-react";
import { motion } from "motion/react";

import CoinRewardModal from "@/components/profile/common/CoinRewardModal";
import type { Post } from "@/components/profile/constants/posts";
import { useCoinStore } from "@/components/profile/store/useCoinStore";
import { usePostViewStore } from "@/components/profile/store/usePostViewStore";

import styles from "@/components/profile/common/LinkedInPopup.module.scss";

type Props = {
  post: Post;
  onClose: () => void;
};

const COUNTDOWN = 5;

type EmbedMode = "iframe" | "external";

const getEmbedMode = (url?: string): EmbedMode => {
  if (!url) return "external";
  if (
    url.includes("linkedin.com") ||
    url.includes("facebook.com") ||
    url.includes("notion.site")
  )
    return "iframe";
  return "external";
};

const getEmbedSrc = (post: { id: string; url?: string }): string => {
  if (!post.url) return "";
  if (post.url.includes("linkedin.com"))
    return `https://www.linkedin.com/embed/feed/update/urn:li:activity:${post.id}`;
  if (post.url.includes("facebook.com"))
    return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(post.url)}&show_text=false`;
  if (post.url.includes("notion.site")) {
    const url = new URL(post.url);
    const pageId = url.pathname.replace(/^\//, "").split("?")[0];
    return `${url.origin}/ebd//${pageId}`;
  }
  return "";
};

const LinkedInPopup = ({ post, onClose }: Props) => {
  const { viewed, markViewed } = usePostViewStore();
  const earn = useCoinStore((s) => s.earn);
  const alreadyViewed = viewed[post.id] ?? false;

  const [count, setCount] = useState(alreadyViewed ? 0 : COUNTDOWN);
  const [showReward, setShowReward] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const embedMode = getEmbedMode(post.url);

  useEffect(() => {
    if (alreadyViewed) return;

    timerRef.current = setInterval(() => {
      setCount((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          markViewed(post.id);
          earn(1);
          setShowReward(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current!);
  }, [post.id, alreadyViewed, markViewed, earn]);

  return (
    <>
      <motion.div
        className={styles.backdrop}
        style={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={onClose}
      />
      <motion.div
        className={styles.overlay}
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        onClick={(e) => e.stopPropagation()}
        transition={{ ease: [0.32, 0.72, 0, 1], duration: 0.4 }}
      >
        <div className={styles.header}>
          <button className={styles.backButton} onClick={onClose}>
            <ChevronLeft size={24} />
          </button>
        </div>

        <div className={styles.iframeWrap}>
          {embedMode === "iframe" ? (
            <iframe
              src={getEmbedSrc(post)}
              className={styles.iframe}
              frameBorder="0"
              allowFullScreen
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            />
          ) : (
            <div className={styles.externalWrap}>
              <p className={styles.externalTitle}>{post.title}</p>
              <p className={styles.externalDesc}>{post.description}</p>
              {post.url && (
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.externalLink}
                >
                  <ExternalLink size={16} />
                  링크 열기
                </a>
              )}
            </div>
          )}
        </div>

        {!alreadyViewed && count > 0 && (
          <div className={styles.counter}>
            <svg viewBox="0 0 36 36" className={styles.ring}>
              <circle cx="18" cy="18" r="15" className={styles.ringBg} />
              <circle
                cx="18"
                cy="18"
                r="15"
                className={styles.ringFill}
                strokeDasharray={`${((COUNTDOWN - count) / COUNTDOWN) * 94} 94`}
              />
            </svg>
            <span className={styles.countNum}>{count}</span>
          </div>
        )}

        {(alreadyViewed || count === 0) && !showReward && (
          <div className={styles.viewed}>✓ 읽음</div>
        )}
      </motion.div>

      <CoinRewardModal
        show={showReward}
        amount={1}
        onClose={() => setShowReward(false)}
      />
    </>
  );
};

export default LinkedInPopup;
