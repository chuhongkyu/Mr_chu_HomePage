"use client";

import Image from "next/image";
import { ExternalLink } from "lucide-react";
import { usePostViewStore } from "@/components/profile/store/usePostViewStore";
import type { Post } from "@/components/profile/constants/linkedinPosts";
import styles from "./PostCard.module.scss";

type Props = {
  post: Post;
  onClick: () => void;
};

const PostCard = ({ post, onClick }: Props) => {
  const viewed = usePostViewStore((s) => s.viewed[post.id] ?? false);

  return (
    <button className={styles.card} onClick={onClick}>
      <div className={styles.imageWrap}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className={styles.image}
          sizes="100px"
        />
      </div>

      <div className={styles.body}>
        <p className={styles.title}>{post.title}</p>
        {post.description && (
          <p className={styles.desc}>{post.description}</p>
        )}
        <span className={styles.source}>
          <ExternalLink size={10} />
          linkedin.com
        </span>
      </div>

      {viewed && <span className={styles.viewedBadge}>✓</span>}
    </button>
  );
};

export default PostCard;
