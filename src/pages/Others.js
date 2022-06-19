import styled from "styled-components";
import Item from "../components/Item";
import SliderContainer from "../components/SliderContainer";
import WindowModal from "../components/WindowModal";
import { icons } from "../utils/icons";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const OnePerson = styled.div`
  width: 100%;
  height: 100vh;
  padding: 70px 20px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
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
              Slimes are moving in the drawer. You should not let the slime bump
              into each other. Drag and drop~
            </p>
          </GameText>
        </TextBox>

        <IconDescription>
          <SliderContainer>
            {icons.map((icon, index) => (
              <Item key={index} imgSrc={icon.imgSrc} alt={icon.name} />
            ))}
          </SliderContainer>
        </IconDescription>
      </OnePerson>

      {/* <Icon>
        <img src={env.PUBLIC_URL + "/assets/app02.png"} alt="스티커 슬라임" />
        <p>스티커 슬라임</p>
      </Icon> */}
    </WindowModal>
  );
};

export default Others;
