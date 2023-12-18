import { motion } from "framer-motion";
import styled from "styled-components";
import Pallarex from "components/about/Parallax";

const Wrapper = styled(motion.div)`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    position: relative;
    .title{
        font-size: max(1.6667vw, 32px);
        font-weight: 500;
        line-height: 1.5;
        letter-spacing: -0.02em;
        padding: max(4.1667vw, 50px) 0;
    }
    .content{
        font-size: max(1.25vw, 22px);
        font-weight: 500;
        line-height: 1.8;
        letter-spacing: -0.02em;
        padding-bottom: max(6.2500vw, 80px);
        text-align: center;
        &.type1{
            font-size: max(1.25vw, 16px);
            font-weight: 500;
            line-height: 1.5;
            letter-spacing: -0.02em;
            text-align: left;
            padding-bottom: 0;
        }
    }
    @media ${(props) => props.theme.device.mobile} {
        padding-top: 10px;
       
    }
`;

const ContentOne = () => {
  return (
    <Wrapper>
        <div className="title">
            자기 주도 학습이 되는 사람이다.
        </div>
        <div className="content">
            유니티로 혼자서 앱 게임을 출시 해본 경험은 개발공부를 스스로 하는 습관을 길러 주었습니다.<br/>
            프론트 엔드로서 회사에서 하는 업무만으로는 개발에 대한 호기심이 충족 되지 않았고 계속 공부 하게 되었습니다.<br/>
        </div>
        <div className="content type1">
            사람들은 미대 출신이기 때문에 저에게 무언가 화려한 홈페이지를 기대합니다.<br/>
            디자이너 출신인이 아니기 때문에 무작정 화려한 홈페이지에는 거부감이 있고 굉장히 깔끔한 UI를 좋아합니다.<br/>
            하지만 의외로 화려한 것을 좋아하는 제작자, 투자자가 많고 ... 저는 가끔은 기대에 부응 해야합니다.
        </div>
        <Pallarex />
    </Wrapper>
  )
};

export default ContentOne;
