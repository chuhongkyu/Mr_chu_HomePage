import styled from "styled-components";
import WindowModal from "components/WindowModal";
import Game1 from "components/others/Game1";
import Game2 from "components/others/Game2";

const OnePerson = styled.div`
  width: 100%;
  padding: 70px 50px 0px 50px;
  overflow-y: auto;
  font-size: 1.6rem;
  &::-webkit-scrollbar{
    width: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #484848d5;
    background-clip: padding-box;
    box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 50px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  @media ${(props) => props.theme.device.mobile} {
    padding: 50px 20px 0px 20px;
  }
`;

const Others = () => {
  return (
    <WindowModal bgColor="white">
      <OnePerson>
        <Game1/>
        <Game2/>
      </OnePerson>
    </WindowModal>
  );
};

export default Others;
