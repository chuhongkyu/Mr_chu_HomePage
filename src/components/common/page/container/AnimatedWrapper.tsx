import { motion } from "motion/react";
import { wrapperVariants } from "./AnimatedVariants";
import { WithChildren } from "@/types/global";

const AnimatedWrapper = ({ children, className }: WithChildren & { className?: string }) => {
    return (
        <motion.span 
            variants={wrapperVariants}
            className={className}
        >
            {children}
        </motion.span>
    );
};

export default AnimatedWrapper;