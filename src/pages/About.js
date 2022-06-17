import { motion } from "framer-motion";
import { useState } from "react";
import styled from "styled-components";
import WindowModal from "../components/WindowModal";
import { write } from "../utils/write";

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
              <span>📌</span> {write.about.main_txt}
            </h5>
            {open.firstCode ? (
              <SubText
                initial={{ translateY: -300, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <p>{write.about.sub_txt1}</p>
                </div>
                <div>
                  <p>{write.about.sub_txt2}</p>
                </div>
                <div>
                  <p>{write.about.sub_txt3}</p>
                </div>
              </SubText>
            ) : null}
          </MainText>
          <MainText>
            <h5 name={"codeFeel"} onClick={onClick} value={codeFeel}>
              <span>📌</span> 진지하게 개발 공부를 하며 부딪힌 벽
            </h5>
            {open.codeFeel ? (
              <SubText
                initial={{ translateY: -300, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <p>
                    개발 공부를 처음 본격적으로 배우기 시작한 것은 2021년 노마드
                    코드 인터넷 강의를 통해서 입니다. html,css,바닐라
                    자바스크립트, scss 순으로 챌린지를 진행하며 통과하였습니다.
                    사실 홈페이지를 디자인만하는 정도인 것이지만 스스로 코딩을
                    잘한다고 생각하며 신나 있었습니다. 그러다 리액트 챌린지를
                    시작하고 알게 되었습니다. 자바스크립트에 대해 전혀 모르고
                    있었다는 것을... 저는 처음으로 챌린지를 포기하고 말았습니다.
                    그리고 '내가 개발자를 할 수 있는 것일까?' 생각하게
                    되었습니다.
                  </p>
                </div>
              </SubText>
            ) : null}
          </MainText>
          <MainText>
            <h5 name={"nowCode"} onClick={onClick} value={nowCode}>
              <span>📌</span> 개발 일을 하며 내가 느낀점
            </h5>
            {open.nowCode ? (
              <SubText
                initial={{ translateY: -300, opacity: 0 }}
                animate={{ translateY: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div>
                  <h2>전반적인 업무</h2>
                  <p>
                    2022년 마포구 일자리 사업단 앱 개발팀에서 일하게 되었습니다.
                    주요 업무는 마포구에서 마포구 캐릭터를 제작하는데 도움을
                    주는 것이였습니다.
                  </p>
                </div>
                <div>
                  <h2>회사를 다니며 js 공부를 한 방법</h2>
                  <p>
                    저희 팀에는 14년차 개발자 PM님이 계셨습니다. PM님은 저희가
                    많이 부족하여 매일 1시간씩 자바스립트에 대한 연습과 문제를
                    내 주셨습니다. 비전공자인 저는 스스로 많이 부족하다고 느꼈고
                    열심히 예습, 복습을 하였습니다. 어느 순간 작년에 공부하던
                    js기반 프로젝트들도 이해가 되었고 스스로
                    자바스크립트만으로는 모든 만들수 있다는 자신감을 얻게
                    되었습니다.
                  </p>
                </div>
                <div>
                  <h2>자바스크립트를 이해한 후 다시 해본 리액트</h2>
                  <p>
                    노마드코더 리액트 마스터 클래스를 다시 챌린지 했습니다. 퇴근
                    후 공부하는 것은 쉽지 않았지만 작년에는 이해가 안되었던
                    것들이 이해가 되어 너무 재미가 있었습니다. 다행히도 무사히
                    챌린지에 합격하였습니다.
                  </p>
                </div>
                <div>
                  <h2>비전공자로서 부족한 점, 해결하기 위한 노력</h2>
                  <p>
                    확실히 현대미술을 해왔던 저는 디자인 적인 부분이나 만드는
                    부분에서 개발 이해가 쉬웠습니다. 모달 창이나 슬라이드
                    컨테이너를 만들어도 다른 팀원들에 비해 어떻게 하면 유저에게
                    좋은 경험을 남길수 있을지 본능적으로 알고 있었던 것
                    같습니다. 하지만 전공자들에 비해 컴퓨터 지식, 웹엔진,
                    자바스크립트 원리에 대해 떨어진다고 생각하게 되었습니다.
                    회사에 가면 상사가 일을 시켜도 시킨 일이 뭔지 몰라서 일을
                    못한다는 말을 들었습니다. 이것을 해결하기 위해 노력을 많이
                    하고 지금도 하는 중일 것입니다.
                  </p>
                  <div>
                    <p>
                      'IT용어 정리' 지금의 회사에 들어와서 처음 했던 일 입니다.
                      WBS,ASSAP등의 단어들을 PM님이 갈켜주셔서 공부했습니다.
                      '비전공자를 위한 이해할 수 있는 it 지식 - 최원영' 책을
                      읽었습니다. 굉장히 재미있고 프론트엔드가 아닌 다른 분야
                      개발에 대해서도 조금 알게 되었습니다.
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
                  <h2>첫 프로젝트</h2>
                  <p>
                    팀의 첫 프로젝트는 개개인마다 Html/Css와 바닐라 자바스크립트
                    만으로 마포구 관련 사이트를 만드는 것이었습니다.
                    스토리보드를 제작하여 중간발표를 했습니다. 5월에는 완성된
                    홈페이지와 홈페이지를 만들면서 겪은 애로사항들을 해결했던
                    점과 못했던 점을 발표했습니다. 이러한 계획을 짜고 개발을
                    진행하고 결과를 보고하는 과정은 좋은 경험이 되었습니다.
                  </p>
                </div>
                <div>
                  <h2>두번쨰 프로젝트</h2>
                  <p>
                    캐릭터 팀과 협업하여 캐릭터를 소개하는 홈페이지를 만들기로
                    했습니다. 저와 함께할 팀원들이 굉장히 적극적인 팀이라
                    여러가지 저에게 요구를 한다면 힘들겠지만 최대한 들어주겠다는
                    생각으로 회의에 참여하였습니다. 캐릭터 팀은 이메일 발송
                    컨텐츠도 추가해달라고 하였습니다....
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
