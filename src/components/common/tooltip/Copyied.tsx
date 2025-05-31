import { motion } from "motion/react"
import Image from "next/image"

const Copyied = () => {
    return (
        <motion.div 
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: -5 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.3 }}
            className="copyied-tooltip">
                <Image src="/assets/icons/alert-success.svg" alt="check" width={20} height={20} />
                <p>Copied</p>
        </motion.div>
    )
}

export default Copyied