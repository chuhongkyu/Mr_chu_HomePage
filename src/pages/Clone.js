import { useState } from "react";
import styled from "styled-components";
import WindowModal from "../components/WindowModal";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const MainContainer = styled.div`
  width: 100%;
  height: 96%;
  padding: 50px;
  overflow-y: scroll;
  scroll-behavior: smooth;
`;

const Handle = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  h1 {
    font-size: 25px;
    margin-right: 10px;
    padding: 7px 15px;
    background-color: rgb(23, 206, 95);
    border-radius: 20px;
    color: white;
    transition: 0.5s;
  }
  .put {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px inset,
      rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset;
    color: rgb(230, 220, 220);
    transition: 0.5s;
  }
`;

const Title = styled.h1`
  font-size: 25px;
`;
const SubTitle = styled.p`
  font-size: 15px;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 10px;
`;
const LinkDiv = styled.div`
  margin-left: 20px;
  img {
    margin-right: 50px;
  }
  :hover {
    transform: translateY(-5px);
  }
`;

const Clone = () => {
  const [works, setWorks] = useState(false);
  const onClick = () => {
    setWorks(!works);
  };
  return (
    <WindowModal bgColor="white">
      <MainContainer>
        <Handle>
          <h1 className={works ? null : "put"} onClick={onClick}>
            강의와 함께
          </h1>
          <h1 className={!works ? null : "put"} onClick={onClick}>
            그냥 작품
          </h1>
        </Handle>
        {!works ? (
          <>
            <Title>CSS 챌린지 13기 졸업작품</Title>
            <SubTitle>우수작 - 오징어 게임</SubTitle>
            <LinkDiv>
              <a
                target="blank_"
                href="https://nomadcoders.co/community/thread/1323"
              >
                <img
                  style={{ width: 200, height: 100 }}
                  src="https://i.imgur.com/yF0dhZT.jpg"
                  alt="오징어게임"
                />
              </a>
              <a
                target="blank_"
                href="https://replit.com/@chuhongkyu/Bluprint-6#style.css3"
              >
                Link
              </a>
            </LinkDiv>
            <hr />
            <Title>React JS 챌린지 19기 졸업작품</Title>
            <SubTitle>우수작 - 투두리스트</SubTitle>
            <LinkDiv>
              <a target="blank_" href="https://chuhongkyu.github.io/todolist/">
                ✅ ToDo_list
              </a>
            </LinkDiv>
            <LinkDiv>
              <a
                target="blank_"
                href="https://chuhongkyu.github.io/Coin-tickers/"
              >
                ✅ Coin
              </a>
            </LinkDiv>
            <LinkDiv>
              <a target="blank_" href="https://chuhongkyu.github.io/chuflix/">
                ✅ Neflix
              </a>
            </LinkDiv>
            <hr />
            <Title>한입 리액트</Title>
            <SubTitle>감정 일기장</SubTitle>
            <LinkDiv>
              <a target="blank_" href="https://emotion-diary2022.web.app/">
                ✅ 감정 일기장
              </a>
            </LinkDiv>
          </>
        ) : (
          ""
        )}
      </MainContainer>
    </WindowModal>
  );
};

export default Clone;
