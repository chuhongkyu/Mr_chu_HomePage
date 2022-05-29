import { motion } from "framer-motion";
import styled from "styled-components";
import WindowBar from "../components/WindowBar";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const Modal = styled(motion.div)`
  width: 99vw;
  height: 95vh;
  border-radius: 10px;
  background-color: ${(props) => props.theme.white.lighter};
  position: relative;
  z-index: 5;
`;

const TopNav = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.theme.white.darker};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 5px;
  display: flex;
  align-items: center;
`;

const TopNavBtn = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  margin-right: 5px;
  font-size: 6px;
  font-weight: 800;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RedBtn = styled(TopNavBtn)`
  background-color: rgb(239, 65, 42);
`;

const YellowBtn = styled(TopNavBtn)`
  background-color: rgb(255, 212, 71);
`;

const GreenBtn = styled(TopNavBtn)`
  background-color: rgb(23, 206, 95);
`;

const ModalVariant = {
  inital: {
    opacity: 0,
    scale: 0,
  },
  animate: {
    opacity: 1,
    scale: 1,
  },
  transition: {
    duration: 2,
    type: "spring",
  },
};

const About = () => {
  return (
    <Wrapper>
      <Modal
        variants={ModalVariant}
        initial="inital"
        animate="animate"
        transition="transition"
      >
        <TopNav>
          <RedBtn>x</RedBtn>
          <YellowBtn>-</YellowBtn>
          <GreenBtn></GreenBtn>
        </TopNav>
      </Modal>
      <WindowBar />
    </Wrapper>
  );
};

export default About;
