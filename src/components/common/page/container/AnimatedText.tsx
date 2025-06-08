import { motion } from "motion/react";
import { itemVariants, textWrapperVariants } from "./AnimatedVariants";

type ElementType = "h1" | "h2" | "h3" | "h4" | "h5" | "p" | "b" ;

interface AnimatedTextProps {
    text?: string;
    html?: string;
    el?: ElementType;
    className?: string;
}

const AnimatedCharacter = ({ char, index }: { char: string; index: number }) => (
    <motion.span 
        key={index} 
        variants={itemVariants}
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
    <motion.div variants={itemVariants} dangerouslySetInnerHTML={{ __html: html }} />
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
        <ElementType
            className={`${className} animated-text-wrapper`}>
            <span className="aria-hidden">{text || html}</span>
            <motion.span
                className="animated-text"
                variants={textWrapperVariants}
                initial="hidden"
                animate="visible"
            >
                {content}
            </motion.span>
        </ElementType>
    );
};

export default AnimatedText;