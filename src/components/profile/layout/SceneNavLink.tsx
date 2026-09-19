"use client";

import Image from "next/image";
import IconChevronRightRegular from "@seed-design/react-icon/lib/IconChevronRightRegular";

import type { Post } from "@/components/profile/constants/posts";

import styles from "@/components/profile/layout/SceneNavLink.module.scss";

export type SceneNavLinkProps = {
  post: Post;
  onClick: () => void;
};

/**
 * 내비 아래에 끼는 카드.
 *
 * 스와이퍼의 `PostCard` 를 줄인 꼴이다. 썸네일·제목·설명·출처를 담는다.
 *
 * 설명은 세 줄에서 자른다. 항목마다 길이가 10 자에서 70 자까지 제각각이라
 * 풀어 두면 카드 높이가 씬마다 들쭉날쭉해진다.
 */
export const SceneNavLink = ({ post, onClick }: SceneNavLinkProps) => {
  const host = post.url
    ? new URL(post.url).hostname.replace("www.", "")
    : undefined;

  return (
    <button type="button" className={styles.card} onClick={onClick}>
      <span className={styles.thumb} data-fit={post.imageFit ?? "cover"}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          sizes="48px"
          className={styles.image}
        />
      </span>

      <span className={styles.body}>
        <span className={styles.title}>{post.title}</span>
        {post.description && (
          <span className={styles.description}>{post.description}</span>
        )}
        {host && <span className={styles.source}>{host}</span>}
      </span>

      <IconChevronRightRegular size={14} className={styles.chevron} />
    </button>
  );
};

export default SceneNavLink;
