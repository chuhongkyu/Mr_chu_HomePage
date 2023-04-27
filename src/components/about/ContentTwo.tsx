import { motion } from "framer-motion";
import styled from "styled-components";
import Pallarex1 from "components/about/Pallarex1";

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
                처음으로 기획자, 디자이너와 함께 작업한 프로젝트 였습니다. 마포구의 홍보를 위해 버디즈라는 캐릭터를 기획하고 이들을 코엑스에 전시할때 홈페이지도 같이 전시되는 작업이 였습니다.
            </div>
            <Pallarex1/>
        </div>
    </Wrapper>
  )
};

export default ContentTwo;
