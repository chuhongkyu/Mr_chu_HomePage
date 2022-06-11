import styled from "styled-components";
import WindowModal from "../components/WindowModal";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

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

const Others = () => {
  return (
    <WindowModal bgColor="white">
      <Icon>
        <img src={env.PUBLIC_URL + "/assets/app01.jpg"} alt="서랍속 슬라임" />
        <p>서랍속 슬라임</p>
      </Icon>
      <Icon>
        <img src={env.PUBLIC_URL + "/assets/app02.png"} alt="스티커 슬라임" />
        <p>스티커 슬라임</p>
      </Icon>
    </WindowModal>
  );
};

export default Others;
