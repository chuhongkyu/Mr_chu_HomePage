import { motion } from "framer-motion";
import styled from "styled-components";
import Parallax2 from "./Parallax2";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

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
            &:not(:last-of-type){
                margin-bottom: max(1.28vw, 30px);
            }
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
            padding: 0 0 20px;
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

const ContentThree = () => {
  return (
    <Wrapper>
        <div className="title">
            성능 최적화
        </div>
        <div className="content type2">
            <div className="sub_title">
                롯데백화점 리뉴얼 운영/구축
            </div>
            <div className="description">
                성능 향상을 실무에서 처음 요구 받은 것은 롯데 백화점 운영때 였습니다.<br/>
                구축 당시 webpack을 통해 js와 css파일을 압축한 적이 있지만 운영 때는 구체적으로
                PageSpeed Insights 를 활용하여 성능을 체크하고 성능을 개선을 하게 되었습니다.
                이미지 리소스들을 최대한 줄이고 불필요한 코드들이 없애는 방식으로 개선해 갔습니다.
            </div>
        </div>
        <div className="content type2">
            <div className="sub_title">
                CASSCOOL 카스 쿨 
            </div>
            <div className="description">
                카스 쿨 프로젝트에서는 네이버 지도에 많은 양의 마크를 세워야 했습니다.<br/>
                대량의 마크를 세워야 하기 때문에 지도는 버벅거리는 현상이 발생 했습니다.<br/>
                지도에서 화면에 보여지는 위치에만 그리는 방법을 사용하였지만 그것만으로는 부족했습니다.<br/>
                결국 '마커 클러스팅' 이라는 개념을 통해 마크업들이 여러개가 겹쳐졌을 때 묶어서 그룹화를 시켰습니다.
                이로 인해 지도의 버벅거림이 사라지고 카스 쿨을 페이지에 접속하는 사용자들에게 좋은 사용자경험을 선사 하였습니다.
            </div>
        </div>
        <Parallax2/>
    </Wrapper>
  )
};

export default ContentThree;