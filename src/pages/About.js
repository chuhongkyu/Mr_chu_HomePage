import { motion } from "framer-motion";
import styled from "styled-components";

const Modal = styled(motion.div)`
  width: 90vw;
  height: 90vh;
  border-radius: 5%;
  background-color: ${(props) => props.theme.white.lighter};
`;

const About = () => {
  return <Modal></Modal>;
};

export default About;
