import { motion } from "motion/react";

import { WithChildren } from "@/types/global";

import { wrapperVariants } from "./AnimatedVariants";

const AnimatedWrapper = ({
  children,
  className,
}: WithChildren & { className?: string }) => {
  return (
    <motion.span variants={wrapperVariants} className={className}>
      {children}
    </motion.span>
  );
};

export default AnimatedWrapper;
