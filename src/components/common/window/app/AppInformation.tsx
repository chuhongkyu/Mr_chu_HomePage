import { setSearchWindow } from "@/store/searchWindowSlice";
import styles from "@/style/page.module.scss"
import { motion } from "motion/react";
import Image from "next/image";
import { useDispatch } from "react-redux";

const AppInformation = () => {
    const dispatch = useDispatch();

    const onHandeOpenSearchWindow = () => {
        dispatch(setSearchWindow(true))
    }
    return(
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 , ease: "easeInOut" }}
            className={styles["app-information"]}>
            <div className={styles["app-information-wrapper"]} onClick={onHandeOpenSearchWindow}    >
                <ul>
                    <li>
                        <Image src="/assets/icons/command.svg" alt="command" width={20} height={20}/>
                        <Image src="/assets/icons/plus.svg" alt="plus" width={20} height={20}/>
                        <span className={styles["space-bar"]}>Space bar</span>
                    </li>
                    <li>
                        <span className={styles["slash"]}>/</span>
                    </li>
                    <li>
                    <span className={styles["ctrl"]}>Ctrl</span>
                        <Image src="/assets/icons/plus.svg" alt="plus" width={20} height={20}/>
                        <span className={styles["space-bar"]}>Space bar</span>
                    </li>
                    <li>
                        
                    </li>
                </ul>
                
            </div>
            <div className={styles["app-information-wrapper-dim"]}></div>
        </motion.div>
    )
}

export default AppInformation;