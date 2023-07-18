import styled from "styled-components";
import WindowModal from "components/WindowModal";
import Game1 from "components/others/Game1";
import Game2 from "components/others/Game2";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const OnePerson = styled.div`
  width: 100%;
  padding: 70px 50px 0px 50px;
  font-family: 'Noto Sans KR', sans-serif;
  overflow-y: auto;
  &::-webkit-scrollbar{
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #484848d5; /* 스크롤바의 색상 */
    background-clip: padding-box;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent /*스크롤바 뒷 배경 색상*/
  }

  @media ${(props) => props.theme.device.mobile} {
    padding: 50px 20px 0px 20px;
  }
`;


const Others = () => {
  return (
    <WindowModal bgColor="white">
      <OnePerson>
        <Game1></Game1>
        <Game2></Game2>
      </OnePerson>
    </WindowModal>
  );
};

export default Others;
