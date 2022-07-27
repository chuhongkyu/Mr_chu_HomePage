import { motion } from "framer-motion";
import styled from "styled-components";
import WindowModal from "../components/WindowModal";
import { write } from "../utils/write";
import ReactTooltip from "react-tooltip";
import { useState } from "react";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const MainContainer = styled.div`
  font-family: "Maple_story";
  width: 100%;
  height: 96%;
  padding: 50px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  .title {
    font-size: 40px;
    font-weight: 800;
    margin-bottom: 10px;
  }
  .description {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    white-space: nowrap;
    p {
      color: rgb(180, 180, 180);
      margin-bottom: 10px;
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    padding: 50px 30px;
  }
`;

const Introduction = styled(motion.div)`
  width: 100%;
`;

const MainText = styled(motion.div)`
  width: 100%;
  display: flex;
  font-size: 25px;
  margin-top: 30px;
  white-space: nowrap;
  font-weight: 700;
  span {
    margin-right: 10px;
    user-select: none;
  }
  h1 {
    color: rgb(180, 180, 180);
    cursor: pointer;
  }
  @media ${(props) => props.theme.device.mobile} {
    font-size: 19px;
  }
`;

const Description = styled(motion.div)`
  margin: 10px 30px;
  h2 {
    font-size: 20px;
    margin-bottom: 5px;
    margin-top: 10px;
  }
  p {
    color: rgba(50, 50, 50, 1);
    font-size: 18px;
    margin-bottom: 10px;
  }
  span {
    text-decoration: underline;
    margin-left: 10px;
    margin-right: 10px;
  }
  @media ${(props) => props.theme.device.mobile} {
    h2 {
      font-size: 18px;
    }
    p {
      color: rgba(50, 50, 50, 1);
      font-size: 13px;
      margin-bottom: 10px;
    }
  }
`;

const ReadMe = styled.a`
  padding: 5px 15px;
  background: linear-gradient(to right, black 50%, rgb(245, 220, 245) 50%);
  background-size: 200%;
  background-position: left center;
  color: white;
  &:hover {
    background-position: right center;
    color: black;
    transition: 0.5s;
  }
`;

const About = () => {
  const [first, setFirst] = useState(false);
  const [second, setSecond] = useState(false);
  const [third, setThird] = useState(true);
  const [fourth, setFourth] = useState(false);

  const onFirst = () => {
    setFirst(!first);
  };
  const onSecond = () => {
    setSecond(!second);
  };
  const onThird = () => {
    setThird(!third);
  };
  const onFourth = () => {
    setFourth(!fourth);
  };

  return (
    <WindowModal bgColor="white">
      <MainContainer>
        <h1 className="title">자기소개</h1>
        <div className="description">
          <p>
            {write.introduction.substring(0, 10)}
            <br />
            {write.introduction.substring(10, 46)}
            <br />
            {write.introduction.substring(46, 100)}
          </p>
        </div>

        <Introduction
          initial={{ y: 0 }}
          animate={{
            y: [50, 0],
            opacity: [0, 0.5, 1],
            transition: { duration: 0.5, delay: 0.8 },
          }}
        >
          <MainText onClick={onFirst}>
            <span>📌</span>
            <h1
              style={
                !first ? { color: "rgb(180, 180, 180)" } : { color: "black" }
              }
            >
              {write.about[0].main_txt}
            </h1>
          </MainText>
          {first ? (
            <Description
              animate={{
                opacity: [0, 1],
                y: [-50, 0],
                transition: { duration: 0.5 },
              }}
            >
              <ReactTooltip id="media">
                <img
                  style={{ width: 400 }}
                  src={env.PUBLIC_URL + "/assets/media.png"}
                  alt="미디어 작품"
                />
              </ReactTooltip>
              <p>
                &nbsp; 대학원에서 아두이노 센서를 활용해 자율 주행 비행선을
                제작하며 처음 코딩을 접하게 되었습니다. 그 후 자바 기반 미디어
                아트 프로그램 프로세싱 툴을 다루면서 본격적으로 코딩으로 아트를
                하게 되었습니다. {write.about[0].sub_txt1}
                <span data-for="media" data-tip="">
                  뉴미디어 아트
                </span>
              </p>

              <p>{write.about[0].sub_txt2}</p>
              <p>{write.about[0].sub_txt3}</p>
            </Description>
          ) : null}

          <MainText onClick={onSecond}>
            <span>📌</span>{" "}
            <h1
              style={
                !second ? { color: "rgb(180, 180, 180)" } : { color: "black" }
              }
            >
              {write.about[1].main_txt}
            </h1>
          </MainText>
          {second ? (
            <Description
              animate={{
                opacity: [0, 1],
                y: [-50, 0],
                transition: { duration: 0.5 },
              }}
            >
              <p>&nbsp; {write.about[1].sub_txt1}</p>
            </Description>
          ) : null}

          <MainText onClick={onThird}>
            <span>📌</span>{" "}
            <h1
              style={
                !third ? { color: "rgb(180, 180, 180)" } : { color: "black" }
              }
            >
              {write.about[2].main_txt}
            </h1>
          </MainText>
          {third ? (
            <Description
              animate={{
                opacity: [0, 1],
                y: [-50, 0],
                transition: { duration: 0.5 },
              }}
            >
              <ReactTooltip id="2project">
                <img
                  style={{ width: 400 }}
                  src={env.PUBLIC_URL + "/assets/2project.png"}
                  alt="캐릭터 소개"
                />
              </ReactTooltip>
              <a
                target="blank_"
                href="https://chuhongkyu.github.io/mapoCharacter/"
              >
                <h2 data-tip="" data-for="2project">
                  {write.about[2].sub_title1}
                </h2>
              </a>
              <p>{write.about[2].sub_txt1}</p>
              <p>{write.about[2].sub_txt2}</p>
              <p>{write.about[2].sub_txt3}</p>
              <p>{write.about[2].sub_txt4}</p>
              <p>
                <ReadMe
                  target="blank_"
                  href="https://github.com/chuhongkyu/mapoCharacter#readme"
                >
                  README.md
                </ReadMe>
              </p>
            </Description>
          ) : null}

          <MainText onClick={onFourth}>
            <span>📌</span>{" "}
            <h1
              style={
                !fourth ? { color: "rgb(180, 180, 180)" } : { color: "black" }
              }
            >
              {write.about[3].main_txt}
            </h1>
          </MainText>
          {fourth ? (
            <Description
              animate={{
                opacity: [0, 1],
                y: [-50, 0],
                transition: { duration: 0.5 },
              }}
            >
              <h2 style={{ marginTop: 15 }}>{write.about[3].sub_title1}</h2>
              <p>&nbsp;{write.about[3].sub_txt1}</p>
              <ReactTooltip id="book">
                <img
                  style={{ width: 150, height: 240 }}
                  src={
                    "http://image.kyobobook.co.kr/images/book/large/033/l9791196918033.jpg"
                  }
                  alt="비전공자를 위한"
                />
              </ReactTooltip>
              <p>
                'IT용어 정리' 지금의 회사에 들어와서 처음 했던 일입니다. 앞서
                말한 것처럼 개발자 간에 소통하는 데 있어서 용어를 모르면 안
                됩니다. 그러한 저에게 PM님께서 실무 단어 정리와 책을 추천해
                주셨습니다. WBS, ASAP등 회사에서 사용하는 단어들을 정리하며 표를
                만들었습니다. 또한
                <span data-for="book" data-tip="">
                  '비전공자를 위한 이해할 수 있는 it 지식 - 최원영'
                </span>{" "}
                을 읽었습니다. 이 책은 굉장히 재미있었고 프론트엔드가 아닌 다른
                분야 개발에 대해서도 조금 알게 되었습니다.
              </p>
              <ReactTooltip id="book2">
                <img
                  style={{ width: 150, height: 240 }}
                  src={"http://image.yes24.com/goods/92742567/XL"}
                  alt="모던 자바스크립트"
                />
              </ReactTooltip>
              <p>
                자바스크립트 원리에 대한 이해도를 높이고 다른 개발자가
                자바스크립트에 대해 질문을 한다면 멋지게 대답할 수 있는 사람이
                되고 싶었습니다. 많은 유튜버와 주변인들이 추천해준
                <span data-for="book2" data-tip="">
                  모던 자바스크립트 Deep Dive
                </span>
                를 사서 계속 읽기로 했습니다. 현재도 자주 반복해서 읽고 있는
                중일 것입니다.
              </p>
              <p>
                프론트 엔드 팀원 중에 욕심이 있는 사람(3명)끼리 리액트 스터디를
                하였습니다. 스터디는 벨로퍼트 리액트 docs를 통한 리액트 원리와
                개념에 대해 공부했습니다. 매번 발표 또는 질문을 서로에게 하고
                코딩 과제 리뷰를 해왔습니다. 스터디가 끝난 후에는 노션을 통해
                느낀 점과 스터디에 대한 피드백을 정리하고 코딩 과제를
                수행합니다. 스터디를 하다 보니 같은 문서를 보고 공부해도
                사람마다 관심이 생기는 곳이 달라서 공부를 3배나 더 하게
                되었습니다. 그리고 팀원들에 해주는 질문들 속에서 많이 성장할 수
                있었습니다. 한 달 반 동안 진행한 스터디는 힘들었지만 많은 것을
                배우고 느끼게 해주었습니다.
              </p>
            </Description>
          ) : null}
        </Introduction>
      </MainContainer>
    </WindowModal>
  );
};

export default About;
