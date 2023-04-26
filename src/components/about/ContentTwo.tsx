import { motion } from "framer-motion";
import styled from "styled-components";

const Wrapper = styled(motion.div)`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    /* padding-bottom: max(8.333vw, 120px); */
    .title{
        font-size: max(1.25vw, 38px);
        font-weight: 500;
        line-height: 1.5;
        letter-spacing: -0.02em;
        padding: max(5.208vw, 80px) 0;
    }
    .content{
        font-size: max(1.25vw, 22px);
        font-weight: 500;
        line-height: 1.8;
        letter-spacing: -0.02em;
        padding-bottom: max(8.333vw, 120px);
        text-align: center;
        &.type1{
            font-size: max(1.25vw, 16px);
            font-weight: 500;
            line-height: 1.5;
            letter-spacing: -0.02em;
            text-align: left;
            padding-bottom: 0;
        }
        &.type2{
            width: 100%;
            padding: 0 50px;
            .sub_title{
                font-size: max(1.25vw, 22px);
                font-weight: 600;
                line-height: 1.8;
                letter-spacing: -0.02em;
                text-align: left;
                padding-bottom: 20px;
            }
            .description{
                font-size: max(1.25vw, 16px);
                font-weight: 500;
                line-height: 1.5;
                letter-spacing: -0.02em;
                text-align: left;
            }
        }
    }

`;

const ContentTwo = () => {
  return (
    <Wrapper>
        <div className="title">
            개발자는 문재해결을 하는 것이다.
        </div>
        <div className="content type2">
            <div className="sub_title">
                캐릭터 홍보 사이트 (버디즈)
            </div>
            <div className="description">
                유니티로 혼자서 앱 게임을 출시 해본 경험은 개발공부를 스스로 하는 습관을 길러 주었습니다.<br/>
                프론트 엔드로서 회사에서 하는 업무만으로는 개발에 대한 호기심이 충족 되지 않았고 계속 공부 하게 되었습니다.<br/>
            </div>
            
        </div>
    </Wrapper>
  )
};

export default ContentTwo;
