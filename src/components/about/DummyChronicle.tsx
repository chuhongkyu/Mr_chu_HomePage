import styled from "styled-components";
import { motion } from "framer-motion";

const LineContainer = styled(motion.ul)`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 1rem;
    position: absolute;
    z-index: 1;
    height: 100%;
    top: 50%;
    transform: translateY(-50%);
`;


const Point = styled(motion.li)`
    position: relative;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
`;

const SmallPoint = styled(motion.span)`
    display: block;
    width: 1rem;
    height: 1rem;
    background: rgb(226, 226, 226);
    border-radius: 50%;
`;


const Line = styled.span`
    position: absolute;
    display: block;
    width: 100%;
    height: 5px;
    border-radius: 10px;
    background: rgb(226, 226, 226);
    top: 50%;
    transform: translateY(-50%);
`;


function DummyChronicle() {
    return (
        <>
        <LineContainer>
            <Point>
                <SmallPoint/>
            </Point>
            <Point>
                <SmallPoint/>
            </Point>
            <Point>
                <SmallPoint/>
            </Point>
            <Point>
                <SmallPoint/>
            </Point>
            <Point>
                <SmallPoint/>
            </Point>
            <Point>
                <SmallPoint/>
            </Point>
        </LineContainer>
        <Line/>
        </>
    )
}

export default DummyChronicle