import styles from "@/style/sub-page.module.scss";
import { motion } from "motion/react";

function DummyChronicle() {
    return (
        <>
        <motion.ul className={styles["line-container"]}>
            <motion.li className={styles["point"]}>
                <motion.span className={styles["small-point"]}/>
            </motion.li>
            <motion.li className={styles["point"]}>
                <motion.span className={styles["small-point"]}/>
            </motion.li>
            <motion.li className={styles["point"]}>
                <motion.span className={styles["small-point"]}/>
            </motion.li>
            <motion.li className={styles["point"]}>
                <motion.span className={styles["small-point"]}/>
            </motion.li>
            <motion.li className={styles["point"]}>
                <motion.span className={styles["small-point"]}/>
            </motion.li>
            <motion.li className={styles["point"]}>
                <motion.span className={styles["small-point"]}/>
            </motion.li>
        </motion.ul>
        <span className={styles["dummy-line"]}/>
        </>
    )
}

export default DummyChronicle;