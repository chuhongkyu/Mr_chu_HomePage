import styles from "@/style/sub-page.module.scss";
import { motion } from "motion/react";
import { useMediaQuery } from "react-responsive";
import DummyChronicle from "./DummyChronicle";

const CHRONICLE_LIST = [
  { label: "(주)아이리브", delay: 4.5 },
  { label: "패스트 캠퍼스 (r3f) 강사", delay: 3.8 },
  { label: "(주)더즈 인터랙티브", delay: 3 },
  { label: "마포구청일자리지원과<br/>(웹,앱개발)", delay: 2.3 },
  { label: "Unity 게임 개발<br/>(IOS, AOS) 배포", delay: 1.6 },
  { label: "뉴미디어아트<br/>(Processing JAVA)", delay: 1 },
];

const Chronicle = () => {
  const isMobile = useMediaQuery({ query: "(min-width: 681px)" });
  if (isMobile) {
    return (
      <div className={styles["chronicle-wrapper"]}>
        <motion.ul className={styles["chronicle-line-container"]}>
          {CHRONICLE_LIST.map((item, idx) => (
            <motion.li
              key={idx}
              className={styles["chronicle-point"]}
              initial={{ scale: 0 }}
              animate={{ scale: 1, transition: { duration: 0.5, type: "spring", delay: item.delay } }}
            >
              <motion.span className={styles["chronicle-small-point"]} />
              <p dangerouslySetInnerHTML={{ __html: item.label }} />
            </motion.li>
          ))}
        </motion.ul>
        <DummyChronicle />
        <motion.span
          className={styles["chronicle-line"]}
          initial={{ width: "0%" }}
          animate={{
            width: ["0%", "20%", "40%", "60%", "80%", "100%"],
            transition: { delay: 1, duration: 4 },
          }}
        />
      </div>
    );
  } else {
    return (
      <ul>
        <li>(주) 아이리브</li>
        <li>패스트 캠퍼스 (r3f) 강사</li>
        <li>더즈 인터렉티브</li>
        <li>마포구청 청년 일자리 사업단</li>
        <li>Unity 게임 개발 (IOS, AOS)</li>
      </ul>
    );
  }
};

export default Chronicle;