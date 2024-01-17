import { motion } from "framer-motion";
import styled from "styled-components";

const Container = styled(motion.div)`
  height: 100px;
  border-radius: 5px;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: absolute;
  right: -70px;
  top: 20%;
  z-index: 12;
  div {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  img {
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }
  p {
    white-space: nowrap;
  }
`;

const Alert = () => {
  return (
    <Container
      key="modal"
      animate={{ scale: [0, 1], transition: { duration: 0.5 } }}
      exit={{ scale: 0 }}
    >
      <div>
        <img src={"/assets/img/memo.png"} alt="memo" />
        <p>이메일 복사 되었습니다.</p>
      </div>
    </Container>
  );
};

export default Alert;
