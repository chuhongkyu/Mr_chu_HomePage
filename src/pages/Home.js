import styled from "styled-components";
import AppLink from "../components/AppLink";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: relative;
  display: flex;
`;

const Container = styled.div`
  width: 100%;
  height: 100vh;
  position: absolute;
  z-index: 2;
`;

const Window = styled.div`
  width: 100%;
  height: 80vh;
  background-color: ${(props) => props.theme.glass};
`;

const Panel = styled.div`
  width: 30vw;
  height: 80vh;
  background-image: url("${env.PUBLIC_URL}/assets/img/photo1.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  &:nth-of-type(2) {
    background-image: url("${env.PUBLIC_URL}/assets/img/photo3.jpg");
  }
  &:last-of-type {
    background-image: url("${env.PUBLIC_URL}/assets/img/photo2.jpg");
  }
`;

const DownPlace = styled.div`
  width: 100%;
  height: 20vh;
  background-color: ${(props) => props.theme.brown.darker};
  div {
    height: 20px;
    background-color: ${(props) => props.theme.brown.lighter};
  }
`;

const Home = () => {
  return (
    <Wrapper>
      <Container>
        <Window>
          <AppLink title="App" img={env.PUBLIC_URL + "assets/img/photo1.jpg"} />
        </Window>
        <DownPlace>
          <div></div>
        </DownPlace>
      </Container>
      <Panel></Panel>
      <Panel></Panel>
      <Panel></Panel>
    </Wrapper>
  );
};

export default Home;
