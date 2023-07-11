import { motion } from "framer-motion";
import styled from "styled-components";


const Load = styled(motion.div)`
    width: 48px;
    height: 48px;
    border: 5px solid rgb(46,142,214);
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    @keyframes rotation {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }}
`

const Loading = () =>{
    return(
        <Load></Load>
    )
}

export default Loading