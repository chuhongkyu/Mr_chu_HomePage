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
                </div>
                <div>
                  <h2>{write.about[2].sub_title2}</h2>
                  <p>{write.about[2].sub_txt2}</p>
                </div>
                <div>
                  <h2>{write.about[2].sub_title3}</h2>
                  <p>{write.about[2].sub_txt3}</p>
                </div>
                <div>
                  <h2>{write.about[2].sub_title4}</h2>
                  <p>{write.about[2].sub_txt4}</p>
                  <div>
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
                      WBS,ASSAP등의 단어들을 PM님이 갈켜주셔서 공부했습니다.
                      <span data-for="book" data-tip="">
                        '비전공자를 위한 이해할 수 있는 it 지식 - 최원영'
                      </span>{" "}
                      책을 읽었습니다. 굉장히 재미있고 프론트엔드가 아닌 다른
                      분야 개발에 대해서도 조금 알게 되었습니다.
                    </p>
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
                      첫 프로젝트
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
                </div>
                <div>
                  <h2>두번쨰 프로젝트</h2>
                  <p>
                    캐릭터 팀과 협업하여 캐릭터를 소개하는 홈페이지를 만들기로
                    했습니다. 저와 함께할 팀원들이 굉장히 적극적인 팀이라
                    여러가지 저에게 요구를 한다면 힘들겠지만 최대한 들어주겠다는
                    생각으로 회의에 참여하였습니다. 하지만 IT에 대해 전혀 모르는
                    기획자와 회의를 하는 것은 굉장히 어려웠습니다. 캐릭터를
                    소개하는 홈페이지만이 아니라 구독 기능, 굿즈 페이지등 다양한
                    것을 요구했습니다. 회의는 그렇게 한번이 아니라 5번이 되어
                    3주를 남은 상태에서 개발을 할 수 있게 되었습니다.
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
