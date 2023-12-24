import styled from "styled-components";
import WindowModal from "components/WindowModal";
import React, { Suspense } from "react";
import Loading from "components/Loading";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const OnePerson = styled.div`
  width: 100%;
  padding: 70px 50px 0px 50px;
  overflow-y: auto;
  font-size: 1.6rem;
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

const Game1 = React.lazy(()=> import ("components/others/Game1"))
const Game2 = React.lazy(()=> import ("components/others/Game2"))

const Others = () => {
  return (
    <WindowModal bgColor="white">
      <Suspense fallback={<Loading/>}>
        <OnePerson>
          <Game1/>
          <Game2/>
        </OnePerson>
      </Suspense>
    </WindowModal>
  );
};

export default Others;
