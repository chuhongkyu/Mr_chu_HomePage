import React, { useState } from "react"
import styles from "@/style/page.module.scss";
import { AnimatePresence, motion } from "motion/react";
import Image from "next/image";
import Copyied from "@/components/common/tooltip/Copyied";

function MailApp() {
    const [isCopied, setIsCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText("chuhongkyu@gmail.com");
        setIsCopied(true);
        setTimeout(() => {
            setIsCopied(false);
        }, 2000);
    };

    return (
        <div className={styles["mail-app-container"]}>
            <AnimatePresence mode="wait">
                {isCopied && <Copyied />}
            </AnimatePresence>
            <motion.div className={styles["app-item"]}>
                <button onClick={handleCopy}>
                    <Image src="/assets/icons/mail.png" alt="mail" width={42} height={42} />
                </button>
            </motion.div>
        </div>
    )
}

export default MailApp