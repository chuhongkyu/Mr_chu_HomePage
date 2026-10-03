"use client";
import Image from "next/image";
import { motion } from "motion/react";

import { resumeWrapperVariants } from "@/components/common/page/container/AnimatedVariants";
import ProfileItem from "@/components/resume/ProfileItem";

import styles from "@/style/sub-page.module.scss";

/**
 * 로고는 비율이 제각각이다. 당근은 세로형, 마포는 가로형이고 둘 다 투명
 * 배경이라 `contain` 으로 넣고 검은 바탕을 깐다. 자세한 건 SCSS 의
 * `.career-logo` 에 적어 뒀다.
 */
type Career = {
  name: string;
  /** 이름 옆에 가운뎃점으로 붙는다. */
  role: string;
  since: string;
  logo: string;
  href?: string;
  /**
   * 정사각으로 만들어진 아이콘은 타일을 꽉 채운다. 비정사각 로고 마크는
   * 기본값대로 여백을 두고 앉힌다 — 꽉 채우면 잘린다.
   */
  fill?: true;
};

const JOBS: Career[] = [
  {
    name: "당근마켓",
    since: "2025.09 ~ 2026.09",
    role: "Software Engineer, Frontend",
    logo: "/assets/img/daangn/logo.png",
  },
  {
    name: "(주)아이리브",
    since: "2024.09 ~ 2025.09",
    role: "Frontend Developer",
    logo: "/assets/img/resume/ailive_icon.jpg",
    fill: true,
  },
  {
    name: "(주)더즈인터랙티브",
    since: "2022.08 ~ 2023.11",
    role: "Frontend Developer",
    logo: "/assets/img/resume/does_icon.jpg",
    fill: true,
  },
  {
    name: "마포 청년 일자리 사업단",
    since: "2022.03 ~ 2022.08",
    role: "App Developer",
    logo: "/assets/img/resume/mapo_icon.png",
  },
];

const EXPERIENCES: Career[] = [
  {
    name: "패스트 캠퍼스",
    role: "R3F 강사",
    since: "2023.10 ~",
    logo: "/assets/img/resume/fastcampus_icon.png",
    fill: true,
    href: "https://fastcampus.co.kr/dev_online_3dinteractive",
  },
  {
    name: "Sticker Slime",
    role: "IOS, Android 1인 개발",
    since: "2021.07 ~",
    logo: "/assets/img/resume/stickerslime_icon.png",
    fill: true,
  },
  {
    name: "우리말 추측하기",
    role: "IOS, Android 1인 개발",
    since: "2026.10.03 ~",
    logo: "/assets/img/resume/wordgame_icon.png",
    fill: true,
  },
];

/** 로고 · 이름 · 직무 · 기간 한 줄. Jobs 와 Experience 가 같은 꼴이다. */
const CareerRow = ({ name, role, since, logo, href, fill }: Career) => (
  <li className={styles.career}>
    <Image
      className={`${styles["career-logo"]} ${fill ? styles["career-logo-fill"] : ""}`}
      src={logo}
      alt=""
      width={40}
      height={40}
    />
    <div className={styles["career-body"]}>
      <p>
        {href ? (
          <a
            className={styles["career-link"]}
            href={href}
            target="_blank"
            rel="noreferrer noopener"
          >
            {name}
          </a>
        ) : (
          name
        )}
        <span className={styles["career-role"]}>{role}</span>
      </p>
      <p className={styles["career-since"]}>{since}</p>
    </div>
  </li>
);

const CareerContainer = () => {
  return (
    <motion.div
      className={styles["resume-container"]}
      variants={resumeWrapperVariants}
      initial="hidden"
      animate="visible"
    >
      <ProfileItem
        icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4bc.svg"
        title="Jobs"
        column="1 / -1"
      >
        {JOBS.map((job) => (
          <CareerRow key={job.name} {...job} />
        ))}
      </ProfileItem>
      <ProfileItem
        icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f3eb.svg"
        title="Education"
      >
        <li>
          <p>중앙대학교 미술학부 한국화</p>
          <p>2012 ~ 2018</p>
        </li>
        <li>
          <p>중앙대학교 대학원 뉴미디어아트</p>
          <p>자퇴</p>
        </li>
      </ProfileItem>

      <ProfileItem
        icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4bc.svg"
        title="Experience"
      >
        {EXPERIENCES.map((item) => (
          <CareerRow key={item.name} {...item} />
        ))}
      </ProfileItem>
      <ProfileItem
        icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4d5.svg"
        title="Built & Maintained"
        column="1 / -1"
      >
        <li>
          <a
            href="https://www.daangn.com/kr/group/%EB%8B%B9%EA%B7%BC%EC%9D%B4%EB%84%A4-%EC%9C%A0%EC%A0%80-%EB%AA%A8%EC%97%AC%EB%9D%BC-1d9k92dxan78/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <p>당근이네</p>
          </a>
          <p>당근 마켓</p>
        </li>
        <hr />
        <li>
          <a
            href="https://genaimo.ailive.world/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <p>Genaimo - 젠아이모</p>
          </a>
          <p>아이리브</p>
        </li>
        {/* 끊음음 */}
        <hr />

        <li>
          <a
            href="https://www.samsungactive.co.kr/main.do"
            target="_blank"
            rel="noreferrer noopener"
          >
            <p
              data-tip="React.js"
              data-text-color="white"
              data-background-color="blue"
            >
              삼성액티브자산운용
            </p>
          </a>
          <p>더즈 인터랙티브</p>
        </li>
        <li>
          <p
            data-tip="React.js"
            data-text-color="white"
            data-background-color="blue"
          >
            CASS COOL 프로젝트
          </p>
          <p>더즈 인터랙티브</p>
        </li>
        <li>
          <a
            href="https://www.jungkwanjang.co.kr/"
            target="_blank"
            rel="noreferrer noopener"
          >
            <p
              data-tip="JSP"
              data-text-color="black"
              data-background-color="red"
            >
              정관장 kgc 리브랜딩
            </p>
          </a>
          <p>더즈 인터랙티브</p>
        </li>
        <li>
          <a
            href="https://www.lotteshopping.com/main"
            target="_blank"
            rel="noreferrer noopener"
          >
            <p
              data-tip="JS"
              data-text-color="black"
              data-background-color="orange"
            >
              롯데백화점 리뉴얼 (웹,앱)
            </p>
          </a>
          <p>더즈 인터랙티브</p>
        </li>
        <li>
          <p
            data-tip="Next.js"
            data-text-color="white"
            data-background-color="darkblue"
          >
            CASS 월드컵 프로젝트
          </p>
          <p>더즈 인터랙티브</p>
        </li>
        {/* 끊음 */}
        <hr />
        <li>
          <p
            data-tip="JS"
            data-text-color="white"
            data-background-color="orange"
          >
            마포구 예쁜 카페 10선
          </p>
          <a
            target="_blank"
            href="https://chuhongkyu.github.io/Cafe_HomePage/"
            rel="noreferrer noopener"
          >
            <p>마포구청</p>
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://chuhongkyu.github.io/mapoCharacter/"
            rel="noreferrer noopener"
          >
            <p
              data-tip="리액트"
              data-text-color="white"
              data-background-color="skyblue"
            >
              마포 버디즈 소개 홈페이지
            </p>
          </a>
          <p>마포구청</p>
        </li>
        <li>
          <a
            target="_blank"
            href="https://mapo-project.github.io/SecondLife-frontend/"
            rel="noreferrer noopener"
          >
            <p
              data-tip="리액트"
              data-text-color="white"
              data-background-color="skyblue"
            >
              세컨드 라이프(헌 옷 수거 플랫폼)
            </p>
          </a>
          <p>마포구청</p>
        </li>
      </ProfileItem>

      <ProfileItem
        icon="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/26cf-fe0f.svg"
        title="Preferred Tools"
        column="1 / -1"
      >
        <li>
          <span>
            <img
              alt="React"
              src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"
            />
            <img
              alt="TypeScript"
              src="https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=TypeScript&logoColor=white"
            />
            <img
              alt="Next.js"
              src="https://img.shields.io/badge/Next.js-000000?style=flat-square&amp;logo=Next.js&amp;logoColor=white"
            />
            <img
              alt="JavaScript"
              src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white"
            />
          </span>
        </li>
        <li>
          <span>
            <img
              alt="Sass"
              src="https://img.shields.io/badge/Sass-CC6699?style=flat-square&logo=Sass&logoColor=white"
            />
            <img
              className="img-dark"
              alt="tailwind"
              src="https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=flat-square&logo=Tailwind%20CSS&logoColor=white"
            />
            <img
              className="img-dark"
              alt="styled-component"
              src="https://img.shields.io/badge/styled%20components-DB7093?style=flat-square&logo=styled-components&logoColor=white"
            />
          </span>
        </li>
        <li>
          <span>
            <img src="https://img.shields.io/badge/Docker-2496ED?style=flat-square&logo=Docker&logoColor=white" />
          </span>
        </li>
        <li>
          <span>
            <img
              alt="Node.js"
              src="https://img.shields.io/badge/Node.js-339933?logo=Node.js&logoColor=white"
            />
          </span>
        </li>
        <li>
          <span>
            <img
              alt="Unity"
              src="https://img.shields.io/badge/Unity-5f5a5f?style=flat-square&logo=Unity&logoColor=white"
            />
          </span>
        </li>
      </ProfileItem>
    </motion.div>
  );
};

export default CareerContainer;
