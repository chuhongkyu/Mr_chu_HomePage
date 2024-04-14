import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  width: 300px;
  height: 100vh;
  background-color: rgba(48, 48, 48, 0.7);
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 4;
  transform-origin: bottom;
  padding-bottom: 40px;
  display: flex;
  overflow: hidden;
  .left_side {
    width: 45px;
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
  .right_side {
    width: 100%;
    padding-bottom: 40px;
    overflow-y: scroll;
    &::-webkit-scrollbar {display: none;}
    -ms-overflow-style: none; /* IE and Edge */
    scrollbar-width: none; /* Firefox */
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
  initial: { y: "100%" },
  animate: { y: 0 , transition:{ duration: 0.3, ease: "linear" } },
  
};

const Menu = () => {
  return (
    <Container variants={Variants} initial="initial" animate="animate">
      <div className="left_side">
        
      </div>
      <motion.div className="right_side" initial={{y: 120}} animate={{y: 0}} transition={{duration: 0.9}}>
        <div className="grid_tom">
          <SpanItem
            href="https://match-fruits-mrchu.vercel.app/"
            target="blank"
          >
            <img
              src={"/assets/works/match-landscape.png"}
              alt="Match-fruits"
            />
            <div>
              <h2>Match-fruits</h2>
              <p>NEXT.js, 카드 맞추기 게임</p>
            </div>
          </SpanItem>
          <SpanItem target="blank" href="https://chuhongkyu.github.io/interact_3D/">
            <img src={"/assets/img/about/01.png"} alt="mario" />
            <div>
              <h2>마리오 월드(개발자)</h2>
              <p>three.js, 3D </p>
            </div>
          </SpanItem>
        </div>
      </motion.div>
    </Container>
  );
};

export default Menu;
