import styled from "styled-components";
import { motion } from "framer-motion";
import { useMediaQuery } from "react-responsive";

const Wrapper = styled.div`
    display: flex;
    justify-content: flex-end;
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
                        animate={{scale: 1, transition: {duration: 0.5, type: "spring", delay: 4.5}}}
                        >
                        <SmallPoint/>
                        <p>(주)아이리브</p>
                    </Point>
                    <Point
                        initial={{scale: 0}}
                        animate={{scale: 1, transition: {duration: 0.5, type: "spring", delay: 3.8}}}
                    >
                        <SmallPoint/>
                        <p>패스트 캠퍼스 (r3f) 강사</p>
                        
                    </Point>
                    <Point
                        initial={{scale: 0}}
                        animate={{scale: 1, transition: {duration: 0.5, type: "spring", delay: 3}}}
                    >
                        <SmallPoint/>
                        <p>(주)더즈 인터랙티브</p>
                    </Point>
                    <Point
                        initial={{scale: 0}}
                        animate={{scale: 1, transition: {duration: 0.5, type: "spring", delay: 2.3}}}
                    >
                        <SmallPoint/>
                        <p>마포구청일자리지원과<br/>
                        (웹,앱개발)</p>
                    </Point>
                    <Point
                        initial={{scale: 0}}
                        animate={{scale: 1, transition: {duration: 0.5, type: "spring", delay: 1.6}}}
                    >
                        <SmallPoint/>
                        <p>Unity 게임 개발<br/>(IOS, AOS) 배포</p>
                    </Point>
                    <Point
                        initial={{scale: 0}}
                        animate={{scale: 1, transition: {duration: 0.5, type: "spring", delay: 1}}}>
                        <SmallPoint/>
                        <p>뉴미디어아트<br/>(Processing JAVA)</p>
                    </Point>
                </LineContainer>
                <Line  
                    initial={{width: "0%"}}
                    animate={{width: ["0%", "20%", "40%", "60%", "80%", "100%"], 
                    transition: {
                        delay: 1,
                        duration: 4,
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