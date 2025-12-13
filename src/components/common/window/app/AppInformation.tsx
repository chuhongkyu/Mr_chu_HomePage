import { useDispatch } from "react-redux";
import { motion } from "motion/react";

import Icon from "@/components/common/Icon";
import CommandIcon from "@/components/common/icons/CommandIcon";
import PlusIcon from "@/components/common/icons/PlusIcon";
import { setSearchWindow } from "@/store/searchWindowSlice";

import styles from "@/style/page.module.scss";

const AppInformation = () => {
  const dispatch = useDispatch();

  const onHandeOpenSearchWindow = () => {
    dispatch(setSearchWindow(true));
  };
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut", delay: 0.2 }}
      className={styles["app-information"]}
    >
      <div
        className={styles["app-information-wrapper"]}
        onClick={onHandeOpenSearchWindow}
      >
        <ul>
          <li>
            <Icon
              svg={<CommandIcon className={styles["command-icon"]} />}
              width={18}
              height={18}
            />
            <Icon
              svg={<PlusIcon className={styles["plus-icon"]} />}
              width={20}
              height={20}
            />
            <span className={styles["k-key"]}>K</span>
          </li>
          <li>
            <span className={styles["slash"]}>/</span>
          </li>
          <li>
            <span className={styles["ctrl"]}>Ctrl</span>
            <Icon
              svg={<PlusIcon className={styles["plus-icon"]} />}
              width={20}
              height={20}
            />
            <span className={styles["k-key"]}>K</span>
          </li>
          <li></li>
        </ul>
      </div>
      <div className={styles["app-information-wrapper-dim"]}></div>
    </motion.div>
  );
};

export default AppInformation;
