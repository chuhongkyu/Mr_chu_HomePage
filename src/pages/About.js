import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import WindowModal from "../components/WindowModal";
import { write } from "../utils/write";
import ReactTooltip from "react-tooltip";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const MainContainer = styled.div`
  width: 100%;
  height: 96%;
  padding: 50px;
  overflow-y: scroll;
  scroll-behavior: smooth;
  h1 {
    font-size: 40px;
    font-weight: 800;
    margin-bottom: 10px;
  }
  div {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    p {
      color: rgb(180, 180, 180);
      margin-bottom: 10px;
    }
  }
`;

const MainText = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 30px;
  padding: 5px;
  h5 {
    font-size: 25px;
    cursor: pointer;
    white-space: nowrap;
    &:hover {
      font-weight: 600;
    }
    span {
      user-select: none;
    }
  }
`;

const SubText = styled(motion.div)`
  margin-top: 20px;
  h2 {
    font-size: 20px;
    margin-bottom: 5px;
    font-weight: 600;
  }
  div {
    margin-bottom: 20px;
    p {
      color: rgba(50, 50, 50, 1);
      margin-bottom: 10px;
      font-size: 18px;
    }
    span {
      text-decoration: underline;
      margin-left: 10px;
    }
  }
`;

const ReadMe = styled.a`
  padding: 5px 15px;
  background-color: black;
  color: white;
  &:hover {
    background-color: white;
    color: black;
  }
`;

const About = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState({
    firstCode: false,
    codeFeel: false,
    nowCode: false,
  });

  const { firstCode, codeFeel, nowCode } = open;

  const onClick = (e) => {
    setShow(!show);
    setOpen({
      ...open,
      [e.target.getAttribute("name")]: !show,
    });
    console.log(open);
    console.log("show:" + show);
    e.stopPropagation();
  };
  return (
    <WindowModal bgColor="white">
      <MainContainer>
        <h1>자기소개</h1>
        <div>
          <p>
            {write.introduction.substring(0, 53)}
            <br />
            {write.introduction.substring(53)}
          </p>
          <MainText>
            <h5 name={"firstCode"} onClick={onClick} value={firstCode}>
              <span>📌</span> {write.about[0].main_txt}
            </h5>
            {open.firstCode ? (
              <SubText
                initial={{ translateY: -300, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <ReactTooltip id="media">
                    <img
                      style={{ width: 400 }}
                      src={env.PUBLIC_URL + "/assets/media.png"}
                      alt="미디어 작품"
                    />
                  </ReactTooltip>
                  <p>
                    대학원에서 아두이노 센서를 활용해 자동 주행 비행선을
                    제작하며 처음 코딩을 접하게 되었습니다. 그 후 자바 기반
                    미디어 아트 프로그램 프로세싱 툴을 다루면서 본격적으로
                    코딩으로 아트를 하게 되었습니다.
                    <span data-for="media" data-tip="">
                      뉴미디어 아트 작품
                    </span>
                    코딩은 제가 할 수 없던 영역의 일을 점점할 수 있게
                    만들어주었습니다. 결국 점차 재미를 느끼게 되었습니다.
                  </p>
                </div>
                <div>
                  <p>{write.about[0].sub_txt2}</p>
                </div>
                <div>
                  <p>{write.about[0].sub_txt3}</p>
                </div>
              </SubText>
            ) : null}
          </MainText>
          <MainText>
            <h5 name={"codeFeel"} onClick={onClick} value={codeFeel}>
              <span>📌</span> {write.about[1].main_txt}
            </h5>
            {open.codeFeel ? (
              <SubText
                initial={{ translateY: -300, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <p>{write.about[1].sub_txt1}</p>
                </div>
              </SubText>
            ) : null}
          </MainText>
          <MainText>
            <h5 name={"nowCode"} onClick={onClick} value={nowCode}>
              <span>📌</span> {write.about[2].main_txt}
            </h5>
            {open.nowCode ? (
              <SubText
                initial={{ translateY: -300, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <h2>{write.about[2].sub_title1}</h2>
                  <p>{write.about[2].sub_txt1}</p>
                  <div>
                    <h2>책</h2>
                    <ReactTooltip id="book">
                      <img
                        src={
                          "http://image.kyobobook.co.kr/images/book/large/033/l9791196918033.jpg"
                        }
                        alt="비전공자를 위한"
                      />
                    </ReactTooltip>
                    <p>
                      'IT용어 정리' 지금의 회사에 들어와서 처음 했던 일 입니다.
                      PM님께서 실무 단어 정리를 해주셨습니다. WBS,ASSAP등의
                      단어들이 무엇인지 공부했습니다. 그리고
                      <span data-for="book" data-tip="">
                        '비전공자를 위한 이해할 수 있는 it 지식 - 최원영'
                      </span>{" "}
                      책을 추천 받게 되었습니다. 굉장히 재미있고 프론트엔드가
                      아닌 다른 분야 개발에 대해서도 조금 알게 되었습니다.
                    </p>
                    <p>모던 자바스크립트 Deep Dive</p>
                  </div>
                  <div>
                    <p>
                      프론트 엔드 팀원중에 욕심이 있는 사람(3명)끼리 리액트
                      스터디를 하였습니다. 스터디는 벨로퍼트 리액트 docs를 통한
                      리액트 원리와 개념에 대해 공부했습니다. 매번 발표 또는
                      질문을 서로에게 하고 코딩 과제 리뷰를 해왔습니다. 스터디가
                      끝난 후에는 노션을 통해 느낀점과 스터디에 대한 피드백을
                      정리하고 코딩 과제를 수행 합니다. 팀원들에 해주는 질문들
                      속에서 저는 성장할 수 있었습니다.
                    </p>
                  </div>
                </div>
                <div>
                  <ReactTooltip id="1project">
                    <img
                      style={{ width: 400 }}
                      src={env.PUBLIC_URL + "/assets/1project.png"}
                      alt="카페 소개"
                    />
                  </ReactTooltip>
                  <a target="blank_" href="https://mapocafe.netlify.app/">
                    <h2 data-tip="" data-for="1project">
                      첫 프로젝트 - (마포구 이쁜 카페 소개 10선)
                    </h2>
                  </a>
                  <p>
                    팀의 첫 프로젝트는 개개인마다 Html/Css와 바닐라 자바스크립트
                    만으로 마포구 관련 사이트를 만드는 것이었습니다. 기획의도,
                    와이어프레임, 스토리보드 등을 제작하여 중간 발표를 하고
                    개발을 하는 형식이였습니다. 5월에는 완성된 홈페이지를
                    배포하고 홈페이지를 만들면서 겪은 애로사항들과 그것을
                    해결했던 점과 못했던 점을 발표했습니다.
                  </p>
                  <p>
                    <ReadMe
                      target="blank_"
                      href="https://github.com/chuhongkyu/Cafe_HomePage#readme"
                    >
                      README.md
                    </ReadMe>
                  </p>
                </div>
                <div>
                  <ReactTooltip id="2project">
                    <img
                      style={{ width: 400 }}
                      src={env.PUBLIC_URL + "/assets/2project.png"}
                      alt="카페 소개"
                    />
                  </ReactTooltip>
                  <a
                    target="blank_"
                    href="https://chuhongkyu.github.io/mapoCharacter/"
                  >
                    <h2 data-tip="" data-for="2project">
                      두번째 프로젝트 - (마포 버디즈)
                    </h2>
                  </a>
                  <p>
                    2022년 마포구 일자리 사업단의 주요 과업은 마포구를 대표하는
                    캐릭터를 만드는 것입니다. 웹 개발 팀은 그 캐릭터와 함께
                    관련된 사이트와 게임 등으로 캐릭터 홍보에 도움을 주는
                    것입니다. 저는 캐릭터 팀 중 가장 적극적인 팀이였던 '마포
                    버디즈'라는 캐릭터 팀과 함께 협업을 하기로 하였습니다.
                  </p>
                  <p>
                    마포 버디즈는 마포에 소식을 전하는 캐릭터들 입니다.
                    캐릭터들의 컨셉과 맞게 홈페이지의 주요 기능에는 유저가
                    자신의 메일과 이름을 입력하면 이쁜 캐릭터 소개 메일을 받을
                    수 있습니다.
                  </p>
                  <p>
                    <ReadMe
                      target="blank_"
                      href="https://github.com/chuhongkyu/mapoCharacter#readme"
                    >
                      README.md
                    </ReadMe>
                  </p>
                </div>
              </SubText>
            ) : null}
          </MainText>
        </div>
      </MainContainer>
    </WindowModal>
  );
};

export default About;
