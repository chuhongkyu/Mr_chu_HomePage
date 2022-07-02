import styled from "styled-components";
import { motion } from "framer-motion";

const Container = styled(motion.div)`
  width: 20vw;
  height: 100vh;
  background-color: ${(props) => props.theme.black.cloud};
  position: absolute;
  top: 0;
  transform-origin: bottom;
`;

const Variants = {
  initial: { opacity: 1 },
  animate: { scaleY: [0, 1] },
};

const Menu = () => {
  return (
    <Container
      variants={Variants}
      initial="initial"
      animate="animate"
    ></Container>
  );
};

export default Menu;
