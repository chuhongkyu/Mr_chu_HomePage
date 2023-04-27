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
    padding-top: 100px;
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
    @media ${(props) => props.theme.device.mobile} {
        padding-top: 10px;
        .title{
            font-size: 20px;
            padding: 0 0 10px;
        }
        .content{
            font-size: 16px;
            padding-bottom: 15px;
            text-align: left;
            &.type1{
                font-size: 16px;
                font-weight: 500;
                line-height: 1.5;
                letter-spacing: -0.02em;
                text-align: left;
                padding-bottom: 15px;
            }
            &.type2{
                padding : 0;
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
                마포구청에서 일할 때 참여한 프로젝트 입니다. 2022 캐릭터 라이션싱 페어에 마포구 버디즈를 홍보하기 위해 홈페이지를 만들게 되었습니다.
                귀여운 캐릭터들 소개와 함께 이메일 js를 통해 이메일과 이름을 입력하면 행운의 편지가 가는 시스템을 구현 하였습니다. 리액트를 통해 처음으로 CSR 렌더링으로 이루어진 프로젝트 입니다.
                혼자서 개발을 하다보면 기획자나 디자이너와의 소통이 매우 중요하다는 것을 느꼈습니다. 여러 요구사항이 추가되는 상황에서도 합의를 이루어내기 위해서는 서로의 의견을 듣고 조율할 수 있는 능력이 필요합니다. 
                이를 위해서는 노션을 통해 일정을 짜고 기획자와 디자이너에게 주기적으로 작업을 공유 하였습니다.
            </div>
            <Pallarex1/>
        </div>
    </Wrapper>
  )
};

export default ContentTwo;
