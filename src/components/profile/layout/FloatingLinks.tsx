"use client";

import Image from "next/image";
import Link from "next/link";
import { IconDocumentLine } from "@karrotmarket/react-monochrome-icon";

import type { ProjectLink } from "@/components/profile/constants/projects";

import styles from "@/components/profile/layout/FloatingLinks.module.scss";

export type FloatingLinksProps = {
  links?: ProjectLink[];
};

/**
 * 헤더 문구 아래에 세로로 쌓이는 바로가기.
 *
 * `/project/<id>` 는 인터셉팅 라우트가 잡아서 씬 위에 시트로 띄운다.
 * 주소가 남으므로 뒤로가기로 닫힌다.
 */
export const FloatingLinks = ({ links }: FloatingLinksProps) => {
  if (!links?.length) return null;

  return (
    <div className={styles.list}>
      {links.map(({ label, href, icon }) => (
        <Link key={href} href={href} className={styles.item}>
          <span className={styles.icon}>
            {icon ? (
              <Image
                src={icon}
                alt=""
                width={18}
                height={18}
                className={styles.image}
              />
            ) : (
              <IconDocumentLine size={16} />
            )}
          </span>
          {label}
        </Link>
      ))}
    </div>
  );
};

export default FloatingLinks;
