"use client";

import { useState } from "react";
import { AnimatePresence } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  LINKEDIN_POSTS,
  type Post,
} from "@/components/profile/constants/linkedinPosts";
import PostCard from "@/components/profile/common/PostCard";
import LinkedInPopup from "@/components/profile/common/LinkedInPopup";
import { usePlayerStore } from "@/components/profile/store/usePlayerStore";
import styles from "./ProfileContents.module.scss";

const ProfileContents = () => {
  const [activePost, setActivePost] = useState<Post | null>(null);
  const setSlideIndex = usePlayerStore((s) => s.setSlideIndex);

  return (
    <section className={styles.contents}>
      <Swiper
        modules={[Pagination]}
        pagination={{ clickable: true }}
        spaceBetween={8}
        slidesPerView={1.1}
        slidesOffsetBefore={16}
        slidesOffsetAfter={16}
        breakpoints={{
          1024: { slidesPerView: 1.8 },
        }}
        onSlideChange={(swiper) => {
          setSlideIndex(swiper.activeIndex);
        }}
        className={styles.swiper}
      >
        {LINKEDIN_POSTS.map((post) => (
          <SwiperSlide key={post.id} className={styles.slide}>
            <PostCard post={post} onClick={() => setActivePost(post)} />
          </SwiperSlide>
        ))}
      </Swiper>

      <AnimatePresence>
        {activePost && (
          <LinkedInPopup
            postId={activePost.id}
            onClose={() => setActivePost(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default ProfileContents;
