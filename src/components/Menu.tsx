import styled from "styled-components";
import { motion } from "framer-motion";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Container = styled(motion.div)`
  width: 300px;
  height: 100%;
  background-color: ${(props) => props.theme.black.cloud};
  position: absolute;
  top: 0;
  left: 0;
  transform-origin: bottom;
  padding-bottom: 40px;
  display: flex;
  overflow-x: hidden;
  .left_side {
    width: 20%;
    height: 100%;
    display: grid;
    gap: 5px;
    padding: 10px;
    grid-auto-flow: row;
    background-color: rgba(48, 48, 48, 0.7);
    span {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      img {
        width: 100%;
        height: auto;
      }
      p {
        font-size: 11px;
        color: white;
        text-align: center;
      }
    }
  }
  .grid_side {
    width: 80%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex-direction: column;
    .grid_tom {
      width: 100%;
      display: grid;
      gap: 10px;
      grid-auto-flow: row;
      margin-top: 20px;
      padding: 10px;
    }
  }
  @media ${(props) => props.theme.device.tablet} {
    width: 250px;
  }
`;

const SpanItem = styled.a`
  width: 100%;
  height: 100%;
  grid-column: span 1;
  background-color: rgba(255, 255, 255, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border-radius: 20px;
  overflow: hidden;
  img {
    width: 100%;
    height: max(6.6583vw, 120px);
  }
  div {
    width: 100%;
    text-align: center;
    background-color: rgb(4, 10, 10);
    color: white;
    padding: 5px;
    h2 {
      font-size: 20px;
    }
    p {
      font-size: 11px;
    }
  }
  &:hover {
    transform: translateY(-5px);
    transition: 0.5s;
  }
  @media ${(props) => props.theme.device.tablet} {
    div{
      h2 {
        font-size: 16px;
      }
    }
  }
`;

const Variants = {
  initial: { opacity: 1 },
  animate: { scaleY: 1 },
};

const Menu = () => {
  return (
    <Container variants={Variants} initial="initial" animate="animate">
      <div className="left_side">
        
      </div>
      <div className="grid_side">
        <div className="grid_tom">
          <SpanItem
            href="https://mapo-project.github.io/SecondLife-frontend/"
            target="blank"
          >
            <img
              src={env.PUBLIC_URL + "/assets/works/word-play.png"}
              alt="말장난 게임"
            />
            <div>
              <h2>말장난 게임</h2>
              <p>말장난 게임, Vercel 자동 배포</p>
            </div>
          </SpanItem>
          <SpanItem
            href="https://match-fruits-mrchu.vercel.app/"
            target="blank"
          >
            <img
              src={env.PUBLIC_URL + "/assets/works/match-landscape.png"}
              alt="Match-fruits"
            />
            <div>
              <h2>Match-fruits</h2>
              <p>NEXT.js, 카드 맞추기 게임</p>
            </div>
          </SpanItem>
          <SpanItem target="blank" href="https://chuhongkyu.github.io/interact_3D/">
            <img src={env.PUBLIC_URL + "/assets/img/about/01.png"} alt="mario" />
            <div>
              <h2>마리오 월드(개발자)</h2>
              <p>three.js, 3D </p>
            </div>
          </SpanItem>
        </div>
      </div>
    </Container>
  );
};

export default Menu;
