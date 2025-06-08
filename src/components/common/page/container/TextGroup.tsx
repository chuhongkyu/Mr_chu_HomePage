import { WithChildren } from "@/types/global";
import { motion } from "motion/react";
import { containerVariants} from "./AnimatedVariants";

const TextGroup = ({children}: WithChildren) => {
  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: true,
        amount: 0.5,
      }}
      className="text-group"
    >
        {children}
    </motion.div>
  )
}

export default TextGroup;