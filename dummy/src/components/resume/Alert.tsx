import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
  padding: 8px 14px;
  border-radius: 16px;
  background-color: #f7f7f7;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  position: absolute;
  bottom: 100%;
  left: -10px;
  z-index: 12;
  display: flex;
  justify-content: center;
  img {
    display: block;
    width: 22px;
    height: 22px;
    object-fit: cover;
    margin-right: 5px;
  }
  p {
    white-space: nowrap;
    font-size: 14px;
  }
`;

const Alert = () => {
  return (
      <Container
        key="modal"
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.9,
          transition: {
            duration: 0.4,
            ease: [0.22, 1, 0.36, 1],
          },
        }}
      >
      <img src={"/assets/img/memo.png"} alt="memo" />
      <p>Copied to clipboard</p>
    </Container>
  );
};

export default Alert;
