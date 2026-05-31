"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import posthog from "posthog-js";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import CoinRewardModal from "@/components/profile/common/CoinRewardModal";
import LinkedInPopup from "@/components/profile/common/LinkedInPopup";
import PostCard from "@/components/profile/common/PostCard";
import { type Post, POSTS } from "@/components/profile/constants/posts";
import { useCoinStore } from "@/components/profile/store/useCoinStore";
import { usePlayerStore } from "@/components/profile/store/usePlayerStore";
import { usePostViewStore } from "@/components/profile/store/usePostViewStore";

import styles from "@/components/profile/layout/ProfileContents.module.scss";

import "swiper/css";
import "swiper/css/pagination";

const getUrlSlideIndex = () => {
  if (typeof window === "undefined") return 0;
  const raw = new URLSearchParams(window.location.search).get("swiper");
  const idx = parseInt(raw ?? "0", 10);
  return Math.min(Math.max(isNaN(idx) ? 0 : idx, 0), POSTS.length - 1);
};

const ProfileContents = () => {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const [showReward, setShowReward] = useState(false);
  const setSlideIndex = usePlayerStore((s) => s.setSlideIndex);
  const { viewed, markViewed } = usePostViewStore();
  const earn = useCoinStore((s) => s.earn);

  const handlePostClick = (post: Post) => {
    if (post.url?.includes("notion.site")) {
      window.open(post.url, "_blank");

      if (!viewed[post.id]) {
        let triggered = false;
        const reward = () => {
          if (triggered) return;
          triggered = true;
          document.removeEventListener("visibilitychange", onVisibility);
          window.removeEventListener("focus", onFocus);
          markViewed(post.id);
          earn(1);
          setShowReward(true);
        };
        const onVisibility = () => {
          if (document.visibilityState === "visible") reward();
        };
        const onFocus = () => reward();

        setTimeout(() => {
          document.addEventListener("visibilitychange", onVisibility);
          window.addEventListener("focus", onFocus, { once: true });
        }, 500);
      }
      return;
    }
    setActivePost(post);
  };

  return (
    <>
      <section className={styles.contents}>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={8}
          slidesPerView={1.15}
          slidesOffsetBefore={24}
          slidesOffsetAfter={24}
          breakpoints={{
            1024: { slidesPerView: 1.8, slidesOffsetAfter: 600 },
          }}
          onSwiper={(swiper: SwiperType) => {
            const idx = getUrlSlideIndex();
            if (idx !== 0) swiper.slideTo(idx, 0);
            setSlideIndex(idx, POSTS[idx].id);
          }}
          onSlideChange={(swiper: SwiperType) => {
            const index = swiper.activeIndex;
            setSlideIndex(index, POSTS[index].id);
            posthog.capture("swipe_slide", {
              slide_index: index,
              post_id: POSTS[index]?.id,
            });
            if (window.location.pathname === "/") {
              const url = new URL(window.location.href);
              url.searchParams.set("swiper", String(index));
              window.history.replaceState(null, "", url.toString());
            }
          }}
          className={styles.swiper}
        >
          {POSTS.map((post) => (
            <SwiperSlide key={post.id} className={styles.slide}>
              <PostCard post={post} onClick={() => handlePostClick(post)} />
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
      <AnimatePresence>
        {activePost && (
          <LinkedInPopup
            post={activePost}
            onClose={() => setActivePost(null)}
          />
        )}
      </AnimatePresence>
      <CoinRewardModal
        show={showReward}
        amount={1}
        onClose={() => setShowReward(false)}
      />
    </>
  );
};

export default ProfileContents;
