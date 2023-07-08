import { motion } from "framer-motion";
import styled from "styled-components";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

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
        font-size: max(1.6667vw, 20px);
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
                b{
                    font-weight: 600;
                }
                .box{
                    margin: 1rem 20px;
                    background: #333;
                    padding: 10px;
                    color: #fff;
                    font-size: 12px;
                    line-height: 180%;
                }
            }
        }
    }
    @media ${(props) => props.theme.device.mobile} {
        padding-top: 10px;
        .title{
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

const ParallaxImage = styled(motion.a)`
    width: fit-content;
    height: fit-content;
    display: block;
    border: 1px solid rgba(0,0,0,.8);
    border-radius: 4px;
    overflow: hidden;
    margin-top: 30px;
    img{
        display: block;
        width: 180px;
        height: 300px;
        object-fit: cover;
        transform-origin: center;
    }
`;

const ContentFour = () => {
  return (
    <Wrapper>
        <div className="content type2">
            <div className="sub_title">
                반응형 코딩에 대한 생각
            </div>
            <div className="description">
                웹 개발자에게는 반응형 코딩은 언제나 가장 힘든 부분입니다. Z플립과 같은 다양한 기기, 삼성브라우저, 사파리같은 다양한 브라우저들로 인해 웹 개발이 굉장히 힘들어지고 있습니다.
                롯데 백화점 리뉴얼 당시 앱 조차도 웹 뷰로 제작 되기 때문에 고려해야 할 사항이 굉장히 많았습니다.<br/>
                이러한 반응형 웹이 웹 개발자들을 고생시키지만 그로 인해 웹 개발자들은 파워를 얻는다고 생각합니다.<br/>
                <br/>
                롯데 백화점 리뉴얼 시에는 앱쪽의 화면의 css나 js가변처리가 초기시점에 잡히지 않는 경우들이 있었다. 
                영역을 체크하는 함수의 시작 시점이 늦거나 css가 디바이스마다 다를 경우에 디버깅을 통해 해결해야 한다.<br/>
                <br/>
                우리는 구글 크롬에서 지원하는 <b>chrome://inspect/#devices</b> 와 <b>사파리</b>를 통해 모든 디바이스를 체크 할 수 있다.<br/>
                <br></br>
                PC 웹은 일정이상 비율이 줄어도 폰트와 스타일이 줄어 들지 않는 스타일링이 좋다고 생각합니다. 따라서 css를 rem과 고정 px를 통해 작성하고 max,min을 잡는 것이 중요하다고 생각합니다.<br/>
                <div className="box">
                    - 최소 최소값을 잡자. max(8.333vw, 120px);<br/>
                    - 파이어폭스, 크롬, 엣지등 다양한 브라우저를 신경쓰자.
                </div>
                <br></br>
                MOW, 앱과 같은 모바일 환경은 js를 통해 화변비율에 따른 가변처리를 먼저하고 css로 스타일링을 하는 것이 좋다고 생각합니다. con(30px) 이러한 방식은 디자이너가 정한 px를 개발자들이 쉽게 반영할 수 있습니다.
                <div className="box">
                    - js를 통한 가변처리를 하자. con(30px)<br/>
                    - 스크롤, 주소창을 신경쓰자<br/>
                    - ios, android에 따른 차이를 조심하자<br/>
                    - Z폴더, Z플립등의 폰을 포기하지말고 최소한의 방식으로라도 고려하자<br/>
                </div>
                타블렛은 최대한 모바일 형식에 가깝게 하자.
            </div>
            
        </div>
    </Wrapper>
  )
};

export default ContentFour;