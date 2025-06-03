import { motion, LayoutGroup} from "motion/react";
import styles from "@/style/sub-page.module.scss";
import { useModal } from "./ModalProvider";
import { WithChildren } from "@/types/global";
import { ModalVariant } from "./ModalAnimation";

const ModalTopNav = ({children}: WithChildren) => {
  const { onHandleSize, onExit } = useModal();
  return(
    <nav className={styles["window-modal-top-nav"]}>
      <ul className={styles["nav-btn-wrapper"]}>
        <li className={[styles["nav-btn"], styles["red"]].join(" ")}>
          <button onClick={onExit}>
            <img src="/assets/icons/xbtn.svg" alt="x-btn"/>
          </button>
        </li>
        <li className={[styles["nav-btn"], styles["yellow"]].join(" ")}><button onClick={onExit}></button></li>
        <li className={[styles["nav-btn"], styles["green"]].join(" ")}><button onClick={onHandleSize}></button></li>
      </ul>
      <div className={styles["window-modal-top-nav-title"]}>
        <h3>{children}</h3>
      </div>
    </nav>
  )
}

const ModalContent = ({children}: WithChildren) => {
  return(
    <div className={styles["window-modal-scroll-wrapper"]}>
      {children}
    </div>
  )
}

const ModalStyle = ({
  children,
}: WithChildren) => {
  const { resize } = useModal();

  return (
      <LayoutGroup>
        <motion.div
          className={styles["window-modal-wrapper"]}
          variants={ModalVariant}
          initial="inital"
          animate="animate"
          exit="exit"
          >
          <motion.div 
            className={styles["window-modal-content"]}
            animate={{
              width: resize ? "100vw" : "80vw",
              height: resize ? "100%" : "80%",
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      </LayoutGroup>
  );
};

ModalStyle.Nav = ModalTopNav;
ModalStyle.Content = ModalContent;

export default ModalStyle;
