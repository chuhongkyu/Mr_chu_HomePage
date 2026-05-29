import { motion } from "motion/react";

import { containerVariants } from "@/components/common/page/container/AnimatedVariants";
import { WithChildren } from "@/types/global";

const TextGroup = ({ children }: WithChildren) => {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.2,
      }}
      className="text-group"
    >
      {children}
    </motion.div>
  );
};

export default TextGroup;
