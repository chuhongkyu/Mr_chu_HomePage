const containerVariants = {
    hidden:  { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.1,
            // staggerChildren: 0.5,
        },
    },
};

const wrapperVariants = {
    hidden:  { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
        },
    },
};

const resumeWrapperVariants = {
    hidden:  { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            staggerChildren: 0.1,
        },
    },
};

const textWrapperVariants = {
    hidden:  { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            staggerChildren: 0.05,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, 
        transition: {
        duration: 0.3
    } },
};


export {containerVariants, wrapperVariants,resumeWrapperVariants, textWrapperVariants, itemVariants };