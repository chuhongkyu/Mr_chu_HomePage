import styled from "styled-components";
import { motion } from "framer-motion";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Container = styled(motion.div)`
  width: 300px;
  height: 100vh;
  background-color: ${(props) => props.theme.black.cloud};
  position: absolute;
  top: 0;
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
`;

const Variants = {
  initial: { opacity: 1 },
  animate: { scaleY: 1 },
};

const Menu = () => {
  return (
    <Container variants={Variants} initial="initial" animate="animate">
      <div className="left_side">
        <span>
          <img src={env.PUBLIC_URL + "/assets/img/folder.svg"} alt="folder" />
          <p>폴더</p>
        </span>
      </div>
      <div className="grid_side">
        <div className="grid_tom">
          <SpanItem
            href="https://mapo-project.github.io/SecondLife-frontend/"
            target="blank"
          >
            <img
              src={env.PUBLIC_URL + "/assets/works/3project.jpg"}
              alt="세컨드 라이프"
            />
            <div>
              <h2>SECOND_LIFE</h2>
              <p>협업, Git, 로그인, JWT, OAuth</p>
            </div>
          </SpanItem>
          <SpanItem
            href="https://chuhongkyu.github.io/Cafe_HomePage/"
            target="blank"
          >
            <img
              src={env.PUBLIC_URL + "/assets/works/1project.png"}
              alt="마포구 이쁜카페 10선"
            />
            <div>
              <h2>마포구 예쁜 카페 10선</h2>
              <p>순수 바닐라 자바스크립트</p>
            </div>
          </SpanItem>
          <SpanItem target="blank" href="https://chuhongkyu.github.io/bmw-car/">
            <img src={env.PUBLIC_URL + "/assets/works/bmw.gif"} alt="bmw" />
            <div>
              <h2>BMW</h2>
              <p>webgl, three.js,3D </p>
            </div>
          </SpanItem>
        </div>
      </div>
    </Container>
  );
};

export default Menu;
