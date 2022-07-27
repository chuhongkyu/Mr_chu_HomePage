import { useState } from "react";
import styled from "styled-components";
import WindowModal from "../components/WindowModal";
import { motion } from "framer-motion";
import { AiTwotoneCrown } from "react-icons/ai";
import { worksData } from "../utils/worksData";

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
  margin-bottom: 2rem;
  img {
    width: 25px;
    margin-right: 10px;
  }
  @media ${(props) => props.theme.device.mac} {
    margin-bottom: 1rem;
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
  @media ${(props) => props.theme.device.mac} {
    height: 500px;
  }
  @media ${(props) => props.theme.device.mobile} {
    height: 700px;
  }
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
    .icon {
      width: 30px;
    }
    h1 {
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    h6 {
      font-size: 20px;
      font-weight: 600;
      color: rgba(108, 117, 125, 0.8);
      margin-bottom: 40px;
      text-align: end;
    }
    h3 {
      font-size: 25px;
    }
    img {
      width: 600px;
      height: auto;
      border: 2px solid black;
      border-radius: 15px;
    }
    hr {
      margin-top: 5px;
      margin-bottom: 5px;
    }
    p {
    }
    table {
      width: 100%;
      white-space: nowrap;
      th {
        text-align: start;
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
  @media ${(props) => props.theme.device.mac} {
    height: 500px;
    .container {
      width: 100%;
      h1 {
        margin-bottom: 5px;
      }
      h6 {
        margin-bottom: 10px;
      }
      img {
        width: 500px;
      }
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    height: 700px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    padding: 2rem;
    .container {
      img {
        width: 300px;
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
  @media ${(props) => props.theme.device.mac} {
    width: 400px;
    height: 400px;
  }
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
  @media ${(props) => props.theme.device.mac} {
    width: 200px;
    height: 200px;
    .line {
      width: 400px;
      height: 400px;
      span {
        position: absolute;
        width: 100%;
        height: 3px;
        background: linear-gradient(to left, #d5d6d7 50%, transparent 50%);
      }
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
    font-size: 11px;
  }
  @media ${(props) => props.theme.device.mac} {
    border-bottom: 200px solid transparent;
    border-top: 200px solid #eef1f4;
    border-left: 68px solid transparent;
    border-right: 68px solid transparent;
    h5 {
      color: black;
      transform: translateY(-160px);
    }
  }
`;

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
            {worksData.map((data, index) => (
              <div key={index}>
                {position === data.id ? (
                  <Works
                    key={data.id}
                    id={data.id}
                    initial={{ opacity: 1 }}
                    animate={{
                      y: [500, 0],
                      x: [-500, 0],
                      rotate: [-80, 0],
                      opacity: [0, 1],
                      transition: { duration: 0.5, type: "spring" },
                    }}
                  >
                    <div className="container">
                      <h1>{data.name}</h1>
                      <h6>{data.date}</h6>
                      <img src={env.PUBLIC_URL + data.img} alt={data.name} />
                    </div>
                    <div className="container">
                      <p>{data.description}</p>
                      <hr />
                      <table>
                        <tbody>
                          <tr>
                            <td>
                              <AiTwotoneCrown style={{ marginRight: 5 }} />
                              주요 기능 :
                            </td>
                            <td>
                              {data.point.map((m, index) => (
                                <p key={index}>{m}</p>
                              ))}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <AiTwotoneCrown style={{ marginRight: 5 }} />깃
                              허브 :
                            </td>
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
                            <td>
                              <AiTwotoneCrown style={{ marginRight: 5 }} />
                              기술 :
                            </td>
                            <td>
                              {data.skills.map((m, index) => (
                                <p key={index}>{m}</p>
                              ))}
                            </td>
                          </tr>
                          <tr>
                            <td>
                              <AiTwotoneCrown style={{ marginRight: 5 }} />
                              개발 :
                            </td>
                            <td>
                              <p>{data.people}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Works>
                ) : null}
              </div>
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
