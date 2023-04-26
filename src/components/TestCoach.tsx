import styled from "styled-components";

const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: calc(100% - 20px);
  height: 100%;
  margin: 10px;
  z-index: 999;
  border: 1px solid rgba(0,0,0,0.4); 
`;

const TestCoach = () => {
  return (
    <Container>
      
    </Container>
  );
};

export default TestCoach;