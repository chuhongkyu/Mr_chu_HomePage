import { motion } from "motion/react";

type ElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "b";

interface AnimatedTextProps {
    text?: string;
    html?: string;
    el?: ElementType;
    className?: string;
}

const wrapperVariants = {
    hidden:  { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.3,
            staggerChildren: 0.05,
        },
    },
};

const variants = {
    hidden: { opacity: 0, y: 5 },
    visible: { opacity: 1, y: 0, 
        transition: {
        duration: 0.3
    } },
};

const AnimatedCharacter = ({ char, index }: { char: string; index: number }) => (
    <motion.span 
        key={index} 
        variants={variants}
    >
        {char}
    </motion.span>
);

const AnimatedTextContent = ({ text }: { text: string }) => (
    <>
        {Array.from(text).map((char, index) => (
            <AnimatedCharacter key={index} char={char} index={index} />
        ))}
    </>
);

const AnimatedHtmlContent = ({ html }: { html: string }) => (
    <div dangerouslySetInnerHTML={{ __html: html }} />
);

const AnimatedText = ({
    text,
    html,
    el: ElementType = "p", 
    className
}: AnimatedTextProps) => {
    const content = html ? (
        <AnimatedHtmlContent html={html} />
    ) : text ? (
        <AnimatedTextContent text={text} />
    ) : null;

    return (
        <ElementType className={`${className} animated-text-wrapper`}>
            <span className="aria-hidden">{text || html}</span>
            <motion.span
                className="animated-text"
                variants={wrapperVariants}
                initial="hidden"
                animate="visible"
            >
                {content}
            </motion.span>
        </ElementType>
    );
};

export default AnimatedText;