"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import posthog from "posthog-js";
import type { Swiper as SwiperType } from "swiper";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import LinkedInPopup from "@/components/profile/common/LinkedInPopup";
import PostCard from "@/components/profile/common/PostCard";
import {
  type Post,
  POSTS,
} from "@/components/profile/constants/posts";
import { SLIDE_CONFIGS } from "@/components/profile/constants/slideConfig";
import { usePlayerStore } from "@/components/profile/store/usePlayerStore";

import styles from "@/components/profile/layout/ProfileContents.module.scss";

import "swiper/css";
import "swiper/css/pagination";

const getUrlSlideIndex = () => {
  if (typeof window === "undefined") return 0;
  const raw = new URLSearchParams(window.location.search).get("swiper");
  const idx = parseInt(raw ?? "0", 10);
  return Math.min(Math.max(isNaN(idx) ? 0 : idx, 0), SLIDE_CONFIGS.length - 1);
};

const ProfileContents = () => {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const setSlideIndex = usePlayerStore((s) => s.setSlideIndex);

  return (
    <>
      <section className={styles.contents}>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          spaceBetween={8}
          slidesPerView={1.1}
          slidesOffsetBefore={16}
          slidesOffsetAfter={16}
          breakpoints={{
            1024: { slidesPerView: 1.8, slidesOffsetAfter: 600 },
          }}
          onSwiper={(swiper: SwiperType) => {
            const idx = getUrlSlideIndex();
            if (idx !== 0) swiper.slideTo(idx, 0);
            setSlideIndex(idx);
          }}
          onSlideChange={(swiper: SwiperType) => {
            const index = swiper.activeIndex;
            setSlideIndex(index);
            posthog.capture("swipe_slide", {
              slide_index: index,
              animation: SLIDE_CONFIGS[index]?.animation,
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
              <PostCard post={post} onClick={() => setActivePost(post)} />
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
    </>
  );
};

export default ProfileContents;
