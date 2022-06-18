import styled from "styled-components";
import SliderContainer from "../components/SliderContainer";
import WindowModal from "../components/WindowModal";

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

const IconDescription = styled.div`
  width: 100%;
  background-color: gray;
`;

const Others = () => {
  return (
    <WindowModal bgColor="white">
      <OnePerson>
        <h1>1인 개발 프로젝트</h1>
        <Icon>
          <img src={env.PUBLIC_URL + "/assets/app01.jpg"} alt="서랍속 슬라임" />
          <p>서랍속 슬라임</p>
        </Icon>
        <IconDescription>
          <SliderContainer />
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
