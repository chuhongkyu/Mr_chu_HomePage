import styled from "styled-components";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    height: 2rem;
`;

const LineContainer = styled(motion.ul)`
    display: flex;
    justify-content: space-between;
    width: 100%;
    padding: 0 1rem;
    position: absolute;
    height: 100%;
    top: 50%;
    transform: translateY(-50%);
`;

const Line = styled(motion.span)`
    display: block;
    margin: 0 2rem;
    width: 100%;
    top: 50%;
    height: 5px;
    border-radius: 10px;
    background: rgb(249,197,30);
`;

const Point = styled(motion.li)`
    position: relative;
    width: 2rem;
    height: 2rem;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    border: 2px solid rgb(249,197,30);
    p{
        position: absolute;
        display: block;
        width: 12rem;
        top: calc(100% + 1.2rem);
        text-align: center;
    }
`;

const SmallPoint = styled(motion.span)`
    display: block;
    width: 1rem;
    height: 1rem;
    background: rgb(249,197,30);
    border-radius: 50%;
`;


const Chronicle = () => {
    const isMoible = useMediaQuery({
        query: '(min-width: 681px)'
    })
    if(isMoible){
        return(
            <Wrapper>
                <LineContainer>
                    <Point
                        initial={{scale: 0}}
                        animate={{scale: 1, transition: {duration: 0.5, type: "spring", delay: 1}}}>
                        <SmallPoint/>
                        <p>뉴미디어아트<br/>(Processing JAVA)</p>
                    </Point>
                    <Point
                        initial={{scale: 0}}
                        animate={{scale: 1, transition: {duration: 0.5, type: "spring", delay: 1.5}}}
                    >
                        <SmallPoint/>
                        <p>Unity 게임 개발<br/>(IOS, AOS) 배포</p>
                    </Point>
                    <Point
                        initial={{scale: 0}}
                        animate={{scale: 1, transition: {duration: 0.5, type: "spring", delay: 2.2}}}
                    >
                        <SmallPoint/>
                        <p>마포구청일자리지원과<br/>
                        (웹,앱개발)</p>
                    </Point>
                    <Point
                        initial={{scale: 0}}
                        animate={{scale: 1, transition: {duration: 0.5, type: "spring", delay: 2.9}}}
                    >
                        <SmallPoint/>
                        <p>더즈 인터렉티브</p>
                    </Point>
                    <Point
                        initial={{scale: 0}}
                        animate={{scale: 1, transition: {duration: 0.5, type: "spring", delay: 3.5}}}
                    >
                        <SmallPoint/>
                        <p>패스트 캠퍼스 (r3f) 강사</p>
                    </Point>
                </LineContainer>
                <Line  
                    initial={{width: "0%"}}
                    animate={{width: ["0%", "25%", "50%", "75%", "100%"], 
                    transition: {
                        delay: 1,
                        duration: 3,
                    }}}/>
            </Wrapper>
        )
    }else{
        return (
            <ul>
                <li>Unity 게임 개발 (IOS, AOS)</li>
                <li>마포구청 청년 일자리 사업단</li>
                <li>더즈 인터렉티브</li>
                <li>패스트 캠퍼스 (r3f) 강사</li>
            </ul>
        )
    }
}

export default Chronicle