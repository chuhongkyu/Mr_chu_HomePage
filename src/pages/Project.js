import { useState } from "react";
import styled from "styled-components";
import WindowModal from "../components/WindowModal";
import { motion } from "framer-motion";
import { AiTwotoneCrown } from "react-icons/ai";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  font-family: "Gill Sans", "Gill Sans MT", "Trebuchet MS", sans-serif;
`;

const Title = styled.h1`
  white-space: nowrap;
  font-size: 35px;
  font-weight: 800;
  margin-bottom: 20px;
  img {
    width: 25px;
    margin-right: 10px;
  }
`;

const MyStory = styled.div`
  width: 100%;
  height: 100%;
  padding: 50px;
  background-color: rgb(242, 242, 242);
`;

const Modal = styled(motion.div)`
  width: 100%;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Works = styled(motion.div)`
  width: 100%;
  height: 700px;
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 15px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 3rem;
  .container {
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-direction: column;
    margin-right: 50px;
    h1 {
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 40px;
    }
    img {
      width: 100%;
      height: auto;
      border: 2px solid black;
    }
    p {
    }
    table {
      width: 100%;
      th {
        text-align: start;
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
`;

const Accordion = styled.div`
  position: absolute;
  bottom: -250px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CircleContainer = styled(motion.div)`
  width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  position: relative;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

const SmallContainer = styled(motion.div)`
  width: 300px;
  height: 300px;
  background-color: #eef2f5;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 60;
  .line {
    width: 500px;
    height: 500px;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      position: absolute;
      width: 100%;
      height: 3px;
      background: linear-gradient(to left, #d5d6d7 50%, transparent 50%);
    }
  }
`;

const PathPosition = styled.div`
  position: absolute;
  top: 0px;
  border-bottom: 270px solid transparent;
  border-top: 220px solid #eef1f4;
  border-left: 90px solid transparent;
  border-right: 90px solid transparent;
  transition: 0.5s;
  transform: rotateZ(-10deg);
  h5 {
    color: black;
    transform: translateY(-170px);
  }
`;

const worksData = [
  {
    id: 0,
    name: "인터랙티브 코딩 취미",
    date: "2022.06",
    img: "/assets/works/cube.jpg",
    description: "자바스크립트와 CSS만으로 만든 인터랙티브 작업",
    point: ["마우스에 따라 돌아다니는 고스트", "회전하는 3D박스"],
    github: "https://chuhongkyu.github.io/Workspace_MaPo/",
    skills: ["바닐라 JS", "Html,css"],
    people: "개인 프로젝트",
  },
  {
    id: 1,
    name: "BMW",
    date: "2022.04",
    img: "/assets/works/bmw.jpg",
    description:
      "리액트와 Three 라이브러리를 활용하여 BMW모델을 인터랙티브하게 감상할 수 있게 하였다. ",
    point: ["모델 파츠 별로 색깔 변경 기능", "모델 회전"],
    github: "https://chuhongkyu.github.io/bmw-car/",
    skills: ["React", "three 라이브러리", "Blender"],
    people: "개인 프로젝트",
  },
  {
    id: 2,
    name: "넷플릭스",
    date: "2022.05",
    img: "/assets/works/chuflix.jpg",
    description: "리액트와 타입스크립트를 활용한 넷플릭스 클론코딩",
    point: ["영화,드라마 검색", "콘텐츠 상세 보기"],
    github: "https://chuhongkyu.github.io/chuflix/",
    skills: ["React", "TypeScript"],
    people: "(개인 프로젝트)",
  },
  {
    id: 3,
    name: "댓글앱",
    date: "2022.05",
    img: "/assets/works/comments.jpg",
    description: "리액트로 만든 댓글 앱",
    point: ["댓글 작성, 수정, 삭제, 체크"],
    github: "https://chuhongkyu.github.io/Comments_app/",
    skills: ["React"],
    people: "(개인 프로젝트)",
  },
  {
    id: 4,
    name: "댓글앱",
    date: "2022.06",
    img: "/assets/works/comments.jpg",
    description: "리액트로 만든 댓글 앱",
    point: ["댓글 작성, 수정, 삭제, 체크"],
    github: "https://chuhongkyu.github.io/Comments_app/",
    skills: ["React"],
    people: "(개인 프로젝트)",
  },
  {
    id: 5,
    name: "댓글앱",
    date: "2022.06",
    people: "2022.03 (개인 프로젝트)",
    img: "/assets/works/comments.jpg",
    description: "리액트로 만든 댓글 앱",
    point: ["댓글 작성, 수정, 삭제, 체크"],
    github: "https://chuhongkyu.github.io/Comments_app/",
    skills: ["React"],
  },
  {
    id: 6,
    name: "댓글앱",
    date: "2022.06",
    img: "/assets/works/comments.jpg",
    description: "리액트로 만든 댓글 앱",
    point: ["댓글 작성, 수정, 삭제, 체크"],
    github: "https://chuhongkyu.github.io/Comments_app/",
    skills: ["React"],
    people: "(개인 프로젝트)",
  },
  {
    id: 7,
    name: "댓글앱",
    img: "/assets/works/comments.jpg",
    description: "리액트로 만든 댓글 앱",
    point: ["댓글 작성, 수정, 삭제, 체크"],
    github: "https://chuhongkyu.github.io/Comments_app/",
    skills: ["React"],
  },
  {
    id: 8,
    name: "마포 버디즈",
    date: "2022.06 ~ 2022.07",
    img: "/assets/works/2project.png",
    description: "마포 버디즈 홈페이지",
    point: ["영화,드라마 검색", "콘텐츠 상세 보기"],
    github: "https://chuhongkyu.github.io/chuflix/",
    skills: ["React"],
    people: "캐릭터 디자인 5명, 프론트 엔드 1 (1인 개발)",
  },
];

const Project = () => {
  const [position, setPosition] = useState(0);
  const [degreed, setDeg] = useState(0);
  const onRotate = () => {
    setDeg(degreed + 40);
    setPosition(position + 1);
    if (degreed === 360 || position === 8) {
      setDeg(0);
      setPosition(0);
    }
  };
  return (
    <WindowModal bgColor="white">
      <MainContainer>
        <MyStory>
          <Title>
            <img
              src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f4a1.svg"
              alt="아이디어"
            />
            MY PROJECT
          </Title>
          <Modal>
            {worksData.map((data) => (
              <>
                {position === data.id ? (
                  <Works
                    initial={{ opacity: 1 }}
                    animate={{
                      y: [500, 0],
                      x: [-500, 0],
                      rotate: [-80, 0],
                      opacity: [0, 1],
                      transition: { duration: 0.5, type: "spring" },
                    }}
                    key={data.id}
                    id={data.id}
                  >
                    <div className="container">
                      <h1>{data.name}</h1>
                      <img src={env.PUBLIC_URL + data.img} alt={data.name} />
                    </div>
                    <div className="container">
                      <p>{data.description}</p>
                      <table>
                        <tr>
                          <th>
                            <AiTwotoneCrown style={{ marginRight: 5 }} />
                            주요 기능 :
                          </th>
                          <td>
                            {data.point.map((m, index) => (
                              <p key={index}>{m}</p>
                            ))}
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <AiTwotoneCrown style={{ marginRight: 5 }} />깃 허브
                            :
                          </th>
                          <td>
                            <a
                              href={data.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {data.github}
                            </a>
                          </td>
                        </tr>
                        <tr>
                          <th>
                            <AiTwotoneCrown style={{ marginRight: 5 }} />
                            기술 :
                          </th>
                          <td>
                            <tr>
                              {data.skills.map((m, index) => (
                                <p key={index}>{m}</p>
                              ))}
                            </tr>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </Works>
                ) : null}
              </>
            ))}
          </Modal>
        </MyStory>
        <Accordion>
          <CircleContainer>
            <PathPosition>
              <h5>{position}</h5>
            </PathPosition>
            <SmallContainer
              onClick={onRotate}
              animate={{ transform: `rotateZ(${degreed}deg)` }}
            >
              <div className="line">
                <span style={{ transform: "rotateZ(40deg)" }}></span>
                <span style={{ transform: "rotateZ(80deg)" }}></span>
                <span style={{ transform: "rotateZ(120deg)" }}></span>
                <span style={{ transform: "rotateZ(160deg)" }}></span>
                <span style={{ transform: "rotateZ(200deg)" }}></span>
                <span style={{ transform: "rotateZ(240deg)" }}></span>
                <span style={{ transform: "rotateZ(280deg)" }}></span>
                <span style={{ transform: "rotateZ(320deg)" }}></span>
                <span style={{ transform: "rotateZ(360deg)" }}></span>
              </div>
              <SmallContainer
                whileHover={{ backgroundColor: "#98aec4" }}
              ></SmallContainer>
            </SmallContainer>
          </CircleContainer>
        </Accordion>
      </MainContainer>
    </WindowModal>
  );
};

export default Project;
