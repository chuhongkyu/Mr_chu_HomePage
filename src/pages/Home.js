import styled from "styled-components";
import AppLink from "../components/AppLink";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

const Window = styled.div`
  width: 100%;
  height: 95vh;
  background-color: ${(props) => props.theme.glass};
`;

const Container = styled.div`
  width: 20vw;
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const WindowBar = styled.div`
  width: 100%;
  height: 5vh;
  background-color: ${(props) => props.theme.black.darker};
`;

const Home = () => {
  return (
    <Wrapper>
      <Window>
        <Container>
          <AppLink title="App" img={env.PUBLIC_URL + "assets/img/photo1.jpg"} />
        </Container>
      </Window>
      <WindowBar></WindowBar>
    </Wrapper>
  );
};

export default Home;
