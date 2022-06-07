import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Position = styled.div`
  width: 99vw;
  height: 95vh;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 5;
  display: flex;
  justify-content: center;
`;

const Modal = styled(motion.div)`
  width: 99vw;
  height: 95vh;
  border-radius: 10px;
  background-color: ${(props) => props.theme.white.lighter};
  position: relative;
  z-index: 5;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px,
    rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TopNav = styled.div`
  width: 100%;
  height: 30px;
  background: ${(props) => props.theme.white.gradient};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
`;

const TopNavBtn = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 5px;
  font-size: 6px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RedBtn = styled(TopNavBtn)`
  background-color: rgb(239, 65, 42);
  &:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
  }
`;

const YellowBtn = styled(TopNavBtn)`
  background-color: rgb(255, 212, 71);
`;

const GreenBtn = styled(TopNavBtn)`
  background-color: rgb(23, 206, 95);
`;

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
  cursor: pointer;
  h5 {
    font-size: 25px;
    &:hover {
      font-weight: 600;
    }
    span {
      user-select: none;
    }
  }
`;

const SubText = styled(motion.div)`
  font-size: 20px;
  margin-top: 20px;
  div {
    margin-bottom: 20px;
    p {
      color: black;
      margin-bottom: 10px;
    }
    span {
      text-decoration: underline;
      margin-left: 10px;
    }
  }
`;

const ModalVariant = {
  inital: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 2,
    type: "spring",
  },
};

const About = () => {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState({
    firstCode: false,
    codeFeel: false,
    nowCode: false,
  });

  const { firstCode, codeFeel, nowCode } = open;
  const navigate = useNavigate();
  const onExit = () => {
    navigate("/");
  };

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
    <Position>
      <Modal
        variants={ModalVariant}
        initial="inital"
        animate="animate"
        transition="transition"
      >
        <TopNav>
          <RedBtn onClick={onExit}>x</RedBtn>
          <YellowBtn>-</YellowBtn>
          <GreenBtn></GreenBtn>
        </TopNav>
        <MainContainer>
          <h1>자기소개</h1>
          <div>
            <p>
              안녕하세요 저는 92년생 추홍규 입니다. 이제는 특별할 것도 없는
              비전공자 개발자입니다. <br /> 시간을 내여 저의 글을 읽어주셔서
              감사합니다.
            </p>
            <MainText>
              <h5 name={"firstCode"} onClick={onClick} value={firstCode}>
                <span>📌</span> 코딩을 처음 접하게 된 일
              </h5>
              {open.firstCode ? (
                <SubText
                  initial={{ translateY: -300, opacity: 0 }}
                  animate={{ translateY: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <p>
                      대학원에서 뉴미디어 아트 작품을 진행하면서 코딩을 처음
                      접하게 되었습니다. 비행선을 자동으로 돌아다니게 하기 위해
                      아두이노 센서를 활용하고 자바기반 미디어 아트 프로그램
                      프로세싱을 통해 인터렉티브한 디지털 화면을 구성했었습니다.
                      코딩은 제가 할수 없던 영역의 일을 할 수 있게 만들어주었고
                      점차 재미를 느끼게 되었습니다.
                    </p>
                  </div>
                  <div>
                    <p>
                      2021년 유니티라는 프로그램에 대해 알게 되었습니다.
                      유튜브를 통해 조금씩 유니티 공부를 하던 저는 결국 게임
                      앱을 만들어 보기로 결심했습니다. "서랍속 슬라임", "스티커
                      슬라임"이라는 캐쥬얼한 게임을 2개 만들고 안드로이드, 애플
                      스토어에 동시 배포하게 되었습니다. 이 게임들은 구글 애드몹
                      배너, 보상 광고, 유료 결제 시스템을 갖고 있습니다. 개발을
                      하면서 모르는 것들은 전부 구글에서 하나씩 찾아 공부하며
                      해결해 갔습니다. 예를 들어 애플스토어에서는 2021년도 부터
                      앱은 유저들에게
                      <span>앱추적 허용</span> 이라는 동의를 받아야 했습니다.
                      새로 생긴 플랫폼의 규정에 맞게 저 또한 개발자로서 빠르게
                      문제를 해결해야 했습니다. 다국어로 유저들에게 그것을
                      설명해 줘야하기 때문에 초보인 저는 굉장히 해결 하기
                      어려웠던 기억이 있습니다.
                    </p>
                  </div>
                  <div>
                    <p>
                      {" "}
                      눈이 너무 아프지만 디버그(.Logo)를 통해 하나씩 순차적으로
                      해결해 가며 밤을 샜던 기억들, 구글에서 영어로 모르는
                      것들을 찾아 갔던 경험들은 전반적으로 코딩에 자신감을
                      주었습니다.{" "}
                    </p>
                  </div>
                </SubText>
              ) : null}
            </MainText>
            <MainText>
              <h5 name={"codeFeel"} onClick={onClick} value={codeFeel}>
                <span>📌</span> 개발 공부를 처음 시작한 일
              </h5>
              {open.codeFeel ? (
                <SubText
                  initial={{ translateY: -300, opacity: 0 }}
                  animate={{ translateY: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <p>
                      개발 공부를 처음 본격적으로 배우기 시작한 것은 2021년
                      노마드 코드 인터넷 강의를 통해서 입니다. html,css,바닐라
                      자바스크립트, scss 순으로 챌린지를 진행하며
                      통과하였습니다. 사실 홈페이지를 디자인만하는 정도인
                      것이지만 스스로 코딩을 잘한다고 생각하며 신나 있었습니다.
                      그러다 리액트 챌린지를 시작하고 알게 되었습니다.
                      자바스크립트에 대해 전혀 모르고 있었다는 것을... 저는
                      처음으로 챌린지를 포기하고 말았습니다. 그리고 '내가
                      개발자를 할 수 있는 것일까?' 생각하게 되었습니다.
                    </p>
                  </div>
                </SubText>
              ) : null}
            </MainText>
            <MainText>
              <h5 name={"nowCode"} onClick={onClick} value={nowCode}>
                <span>📌</span> 개발 일을 하며 내가 부족한점
              </h5>
              {open.nowCode ? (
                <SubText
                  initial={{ translateY: -300, opacity: 0 }}
                  animate={{ translateY: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div>
                    <p>
                      2022년 마포구 일자리 사업단 앱 개발팀에서 일하게
                      되었습니다. 주요 업무는 마포구에서 마포구 캐릭터를
                      제작하는데 도움을 주는 것이였습니다. 저희 팀에는 14년차
                      개발자 PM님이 계셨습니다. PM님은 저희가 많이 부족하여 매일
                      1시간씩 자바스립트에 대한 연습과 문제를 내 주셨습니다.
                      비전공자인 저는 스스로 많이 부족하다고 느꼈고 열심히 예습,
                      복습을 하였습니다. 어느 순간 작년에 공부하던 js기반
                      프로젝트들도 이해가 되었고 스스로 자바스크립트만으로는
                      모든 만들수 있다는 자신감을 얻게 되었습니다.
                    </p>
                  </div>
                  <div>
                    <h3>잘하는 점</h3>
                    <p>
                      html/css의 기초가 잘 다져 있었습니다. 여기에
                      자바스크립트를 더하면 애니메이션 적으로 구현할수 없는 것은
                      없다고 생각이 들었습니다. CSS만큼은 팀원 전부의 코드를
                      봐줄 수 있었습니다.{" "}
                    </p>
                  </div>
                  <div>
                    <p>
                      팀에서 첫 프로젝트로 Html/Css와 바닐라 자바스크립트 만으로
                      각자 마포구 관련 사이트를 만들게 되었습니다. 5월에 발표를
                      하던 때에는 홈페이지를 10개 이상 만든 느낌을 받았습니다.
                      팀원들과 서로 조언을 주며 코드 리뷰를 해왔기 때문입니다.
                    </p>
                  </div>
                </SubText>
              ) : null}
            </MainText>
          </div>
        </MainContainer>
      </Modal>
    </Position>
  );
};

export default About;
