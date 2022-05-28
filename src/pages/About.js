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
      ></Modal>
      <WindowBar />
    </Wrapper>
  );
};

export default About;
