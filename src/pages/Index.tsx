import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  height: var(--100vh);
  font-family: sans-serif;
`;

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/home")
  }, []);

  return (
      <Wrapper></Wrapper>
  );
};

export default Index;
