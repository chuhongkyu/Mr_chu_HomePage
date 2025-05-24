import { motion, LayoutGroup} from "motion/react";
import { ReactNode } from "react";
import styles from "@/style/sub-page.module.scss";
import { useModal } from "./ModalProvider";

const ModalTopNav = ({children}: {children: ReactNode}) => {
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

const ModalContent = ({children}: {children: ReactNode}) => {
  return(
    <div className={styles["window-modal-scroll-wrapper"]}>
      {children}
    </div>
  )
}

const ModalVariant = {
  inital: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, type: "spring" },
  },
  exit: {
    scale: 0,
    transition: { duration: 0.5, type: "spring" },
  },
};

interface IWindow {
  children: ReactNode;
}

const ModalStyle = ({
  children,
}: IWindow) => {
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
