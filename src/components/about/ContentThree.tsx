import { motion } from "framer-motion";
import styled from "styled-components";
import Pallarex1 from "components/about/Pallarex1";

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

const ContentThree = () => {
  return (
    <Wrapper>
        <div className="content type2">
            <div className="sub_title">
                카타르 월드컵 2022 카스 프로젝트
            </div>
            <div className="description">
                더즈에 처음 맡게 된 프로젝트 입니다. NEXT.js와 scss를 활용하여 6종의 게임 들어가 있습니다.
                담당하게 된 게임은 '카스 더 매치' 0~9의 넘버 카스 2페어를 뒤집어 놓고 같은 숫자를 맞추면 성공인 게임입니다.
                개발을 시작할때 게임의 알고리즘을 어떻게하면 성능적으로 좋게 만들 수 있을까 고민을 많이 했습니다.<br/>하지만 회사가 원하는 것은 
                빠르게 완성하는 것이고 큰 성능의 최적화가 없다면 이러한 고민에 별로 사람들은 관심이 없다는 것을 알게 되었습니다.
                <br></br>
                아래의 이미지는 프로젝트가 끝나고 다시한번 '카스 더 매치' 개발 하게 된다면 이렇게 작업하겠다고 생각하며 더미로 만든 게임입니다. 
            </div>
            <ParallaxImage
                target={"_blank"}
                href={"https://chuhongkyu.github.io/mapoCharacter/"}
                whileHover={{
                    scale: 1.1,
                    rotateX: 10,
                    rotateY: 10,
                    transition: { duration: 0.5 },
                }}
            >
                <img src={env.PUBLIC_URL + "/assets/img/about/02.png"} alt="Image 3"/>
            </ParallaxImage>
        </div>
    </Wrapper>
  )
};

export default ContentThree;