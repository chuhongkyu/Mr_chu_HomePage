import styled from "styled-components";
import Item from "../components/Item";
import SliderContainer from "../components/SliderContainer";
import WindowModal from "../components/WindowModal";
import { drawers, stickers } from "../utils/icons";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const OnePerson = styled.div`
  font-family: roboto, Helvetica, Arial, sans-serif;
  width: 100%;
  padding: 50px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  overflow-y: scroll;
  h1 {
    font-size: 25px;
  }
`;

const TextBox = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  white-space: nowrap;
  img {
    border-radius: 15px;
    width: 60px;
    height: 60px;
    margin-bottom: 5px;
    box-shadow: ${(prop) => prop.theme.shadow};
  }
`;

const GameText = styled.div`
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
`;

const IconDescription = styled.div`
  width: 100%;
  margin-bottom: 50px;
`;

const Others = () => {
  return (
    <WindowModal bgColor="white">
      <OnePerson>
        <h1>
          1인 개발 프로젝트{" "}
          <img
            alt="Unity"
            src="https://img.shields.io/badge/Unity-5f5a5f?style=flat-square&logo=Unity&logoColor=white"
          />
        </h1>
        <TextBox>
          <GameText style={{ width: "20%" }}>
            <Icon>
              <img
                src={env.PUBLIC_URL + "/assets/app01.jpg"}
                alt="서랍속 슬라임"
              />
              <p>서랍속 슬라임</p>
            </Icon>
          </GameText>

          <GameText>
            <h5>배포: ios/android</h5>
            <p>형태: 2D 게임</p>
            <p>수익방식: 구글 애드몹</p>
          </GameText>
          <GameText>
            <p>내용: </p>
            <p>
              Slimes are moving in the drawer.
              <br /> You should not let the slime bump into each other. <br />{" "}
              Drag and drop~
            </p>
          </GameText>
        </TextBox>

        <IconDescription>
          <SliderContainer height="21vh">
            {drawers.map((drawer, index) => (
              <Item
                key={index}
                wSize={"20vw"}
                imgSrc={drawer.imgSrc}
                alt={drawer.name}
              />
            ))}
          </SliderContainer>
        </IconDescription>

        <TextBox>
          <GameText style={{ width: "20%" }}>
            <Icon>
              <img
                src={env.PUBLIC_URL + "/assets/app02.png"}
                alt="스티커 슬라임"
              />
              <p>스티커 슬라임</p>
            </Icon>
          </GameText>

          <GameText>
            <h5>배포: ios/android</h5>
            <p>형태: 3D 게임</p>
            <p>수익방식: 구글 애드몹, 부분 유료화</p>
          </GameText>
          <GameText>
            <p>내용: </p>
            <p>
              슬라임들이 스티커로 돌아 왔어요.
              <br /> 다양한 슬라임들과 함께 하늘에서 떨어지는 물건들을 피하세요.
            </p>
          </GameText>
        </TextBox>

        <IconDescription>
          <SliderContainer height="300px">
            {stickers.map((sticker, index) => (
              <Item
                key={index}
                wSize={"120px"}
                imgSrc={sticker.imgSrc}
                alt={sticker.name}
              />
            ))}
          </SliderContainer>
        </IconDescription>
      </OnePerson>
    </WindowModal>
  );
};

export default Others;
