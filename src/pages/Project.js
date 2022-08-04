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
  display: flex;
  justify-content: center;
  overflow: hidden;
  position: relative;
  border-radius: 15px;
  background-color: rgb(242, 242, 242);
  font-family: "Montserrat", sans-serif;
  .left {
    left: 30px;
    top: 50%;
    transform: rotateZ(180deg);
  }
  .right {
    right: 30px;
    top: 50%;
  }
  @media ${(props) => props.theme.device.mobile} {
    .left {
      left: 30px;
      top: 50px;
      transform: rotateZ(180deg);
    }
    .right {
      right: 30px;
      top: 50px;
    }
  }
`;

const ArrowBtn = styled(motion.svg)`
  position: absolute;
  width: 50px;
  height: 50px;
  z-index: 40;
`;

const Title = styled.h1`
  width: 100%;
  text-align: center;
  white-space: nowrap;
  font-size: 35px;
  font-weight: 800;
  margin-bottom: 70px;
  img {
    width: 25px;
    margin-right: 10px;
  }
  @media ${(props) => props.theme.device.mac} {
    margin-bottom: 1rem;
  }
`;

const MyStory = styled.div`
  width: 80%;
  padding: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  border-radius: 15px;
  @media ${(props) => props.theme.device.mobile} {
    width: 100%;
  }
`;

const Modal = styled(motion.div)`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Works = styled(motion.div)`
  width: 1000px;
  background-color: white;
  box-shadow: rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(60, 64, 67, 0.15) 0px 1px 3px 1px;
  border-radius: 15px;
  padding: 50px;
  transform-origin: center;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  .wcontainer {
    width: 100%;
    display: flex;
    justify-content: center;
    align-content: flex-start;
    flex-direction: column;
    h1 {
      font-size: 25px;
      white-space: nowrap;
      margin-bottom: 10px;
    }
    img {
      width: 100%;
      height: auto;
      border: 2px solid black;
      border-radius: 15px;
    }
  }
  .container {
    width: 50%;
    display: flex;
    justify-content: flex-start;
    align-content: center;
    flex-direction: column;
    margin-right: 50px;
    &:last-of-type {
      margin-right: 0px;
    }
    .icon {
      width: 30px;
    }
    h1 {
      font-size: 30px;
      font-weight: 700;
      margin-bottom: 10px;
      white-space: nowrap;
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
      width: 100%;
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
      .point {
        white-space: nowrap;
        font-weight: 700;
        padding-right: 10px;
      }
      th {
        text-align: start;
        font-size: 20px;
        font-weight: 600;
      }
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    width: 390px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .wcontainer {
      h1 {
        font-size: 15px;
        margin-bottom: 10px;
      }
    }
    .container {
      width: 100%;
      display: flex;
      justify-content: center;
      align-content: center;
      flex-direction: column;
      margin-bottom: 10px;
      margin-right: 10px;
      &:last-of-type {
        margin-bottom: 0px;
      }
      .icon {
        width: 20px;
      }
      h1 {
        font-size: 15px;
        font-weight: 700;
        margin-bottom: 10px;
      }
      h6 {
        font-size: 12px;
        font-weight: 600;
        color: rgba(108, 117, 125, 0.8);
        margin-bottom: 20px;
        text-align: end;
      }
      h3 {
        font-size: 13px;
      }
      img {
        width: 100%;
        height: auto;
        border: 2px solid black;
        border-radius: 15px;
      }
      p {
        font-size: 11px;
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
  z-index: 60;
`;

const CircleContainer = styled(motion.div)`
  width: 500px;
  height: 500px;
  background-color: rgb(249, 197, 30);
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
  background-color: #2f2f2f;
  border-radius: 50%;
  border: 2px solid #181818;
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
      background: linear-gradient(to left, #181818 50%, transparent 50%);
    }
  }
  @media ${(props) => props.theme.device.mac} {
    width: 200px;
    height: 200px;
    .line {
      width: 400px;
      height: 400px;
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
    font-size: 15px;
    font-weight: bold;
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
  const onMinusRotate = () => {
    setDeg(degreed - 40);
    setPosition(position - 1);
    if (degreed === 360 || position <= 0) {
      setDeg(0);
      setPosition(0);
    }
  };
  return (
    <WindowModal bgColor="white">
      <MainContainer>
        <ArrowBtn
          onClick={onMinusRotate}
          className="left"
          viewBox="0 0 17 16"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#434343"
          whileHover={{ opacity: 1, fill: "#434343" }}
          initial={{ opacity: 0.6 }}
          fill="none"
        >
          <motion.path d="M6.077,1.162 C6.077,1.387 6.139,1.612 6.273,1.812 L10.429,8.041 L6.232,14.078 C5.873,14.619 6.019,15.348 6.56,15.707 C7.099,16.068 7.831,15.922 8.19,15.382 L12.82,8.694 C13.084,8.3 13.086,7.786 12.822,7.39 L8.233,0.51 C7.873,-0.032 7.141,-0.178 6.601,0.181 C6.26,0.409 6.077,0.782 6.077,1.162 L6.077,1.162 Z"></motion.path>
        </ArrowBtn>
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
                    key={data.id}
                    id={data.id}
                    initial={{ x: 100 }}
                    animate={{ position: "absolute", zIndex: 1, x: 0 }}
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
                            <td className="point">
                              <AiTwotoneCrown style={{ marginRight: 5 }} />
                              주요 기능
                            </td>
                            <td>
                              {data.point.map((m, index) => (
                                <p key={index}>{m}</p>
                              ))}
                            </td>
                          </tr>
                          <tr>
                            <td className="point">
                              <AiTwotoneCrown style={{ marginRight: 5 }} />깃
                              허브
                            </td>
                            <td>
                              <a
                                href={data.github}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {data.github.length < 40
                                  ? data.github
                                  : data.github.substring(0, 40) + "..."}
                              </a>
                            </td>
                          </tr>
                          <tr>
                            <td className="point">
                              <AiTwotoneCrown style={{ marginRight: 5 }} />
                              기술
                            </td>
                            <td>
                              {data.skills.map((m, index) => (
                                <p key={index}>{m}</p>
                              ))}
                            </td>
                          </tr>
                          <tr>
                            <td className="point">
                              <AiTwotoneCrown style={{ marginRight: 5 }} />
                              개발
                            </td>
                            <td>
                              <p>{data.people}</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </Works>
                ) : (
                  <Works
                    initial={{
                      scaleY: 0.7,
                      scaleX: 0.7,
                      x: 0,
                      opacity: 0.5,
                    }}
                    animate={{
                      x: 5,
                    }}
                  >
                    <div className="wcontainer">
                      <h1>{data.name}</h1>
                      <img src={env.PUBLIC_URL + data.img} alt={data.name} />
                    </div>
                  </Works>
                )}
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
              <SmallContainer whileHover={{ backgroundColor: "#141414" }}>
                <h3 style={{ fontSize: "1.5rem", color: "white" }}>
                  Click Me!
                  <br /> Click Me!
                  <br /> Click Me!
                </h3>
              </SmallContainer>
            </SmallContainer>
          </CircleContainer>
        </Accordion>
        <ArrowBtn
          onClick={onRotate}
          className="right"
          viewBox="0 0 17 16"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          stroke="#434343"
          whileHover={{ opacity: 1, fill: "#434343" }}
          initial={{ opacity: 0.6 }}
          fill="none"
        >
          <motion.path d="M6.077,1.162 C6.077,1.387 6.139,1.612 6.273,1.812 L10.429,8.041 L6.232,14.078 C5.873,14.619 6.019,15.348 6.56,15.707 C7.099,16.068 7.831,15.922 8.19,15.382 L12.82,8.694 C13.084,8.3 13.086,7.786 12.822,7.39 L8.233,0.51 C7.873,-0.032 7.141,-0.178 6.601,0.181 C6.26,0.409 6.077,0.782 6.077,1.162 L6.077,1.162 Z"></motion.path>
        </ArrowBtn>
      </MainContainer>
    </WindowModal>
  );
};

export default Project;
