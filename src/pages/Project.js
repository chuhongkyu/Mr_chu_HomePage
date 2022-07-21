import { useState } from "react";
import styled from "styled-components";
import WindowModal from "../components/WindowModal";
import { motion } from "framer-motion";

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
  width: 50vw;
  height: 700px;
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 15px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 20px;
  h1 {
    font-size: 25px;
  }
  img {
    width: 500px;
  }
  p {
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
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
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
    img: "/assets/works/cube.jpg",
    description: "자바스크립트와 CSS만으로 만든 인터랙티브 작업",
  },
  {
    id: 1,
    name: "BMW",
    img: "/assets/works/bmw.jpg",
    description:
      "리액트와 Three 라이브러리를 활용하여 BMW모델을 인터랙티브하게 감상할 수 있게 하였다. ",
  },
  {
    id: 2,
    name: "넷플릭스",
    img: "/assets/works/chuflix.jpg",
    description: "리액트와 타입스크립트를 활용한 넷플릭스 클론코딩",
  },
  {
    id: 3,
    name: "댓글앱",
    img: "/assets/works/댓글.png",
    description: "리액트와 타입스크립트를 활용한 넷플릭스 클론코딩",
  },
  {
    id: 4,
    name: "댓글앱",
    img: "/assets/works/댓글.png",
    description: "리액트와 타입스크립트를 활용한 넷플릭스 클론코딩",
  },
  {
    id: 5,
    name: "댓글앱",
    img: "/assets/works/댓글.png",
    description: "리액트와 타입스크립트를 활용한 넷플릭스 클론코딩",
  },
  {
    id: 6,
    name: "댓글앱",
    img: "/assets/works/댓글.png",
    description: "리액트와 타입스크립트를 활용한 넷플릭스 클론코딩",
  },
  {
    id: 7,
    name: "댓글앱",
    img: "/assets/works/댓글.png",
    description: "리액트와 타입스크립트를 활용한 넷플릭스 클론코딩",
  },
  {
    id: 8,
    name: "마포 버디즈",
    img: "/assets/works/2project.png",
    description: "마포 버디즈 홈페이지",
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
          <Title>MY PROJECT</Title>
          <Modal>
            {worksData.map((data) => (
              <>
                {position === data.id ? (
                  <Works
                    initial={{ x: 0, opacity: 1 }}
                    animate={{
                      x: [-10, 0],
                      opacity: [0, 1],
                      transition: { duration: 0.5 },
                    }}
                    key={data.id}
                    id={data.id}
                  >
                    <h1>{data.name}</h1>
                    <img src={env.PUBLIC_URL + data.img} alt={data.name} />
                    <p>{data.description}</p>
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
              <SmallContainer></SmallContainer>
            </SmallContainer>
          </CircleContainer>
        </Accordion>
      </MainContainer>
    </WindowModal>
  );
};

export default Project;
