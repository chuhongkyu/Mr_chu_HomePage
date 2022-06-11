import { useState, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Bar = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.theme.black.cloud};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px 10px;
  position: fixed;
  bottom: 0;
  img {
    width: 30px;
    height: 30px;
  }
`;

const BarBox = styled.div`
  width: 10vw;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OpenItem = styled.div`
  background-color: ${(props) => props.theme.black.darker};
  color: ${(props) => props.theme.white.darker};
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  transition: 0.5s;
  &:hover {
    background-color: ${(props) => props.theme.white.darker};
    color: ${(props) => props.theme.black.darker};
    transition: 0.5s;
  }
`;

function WindowBar() {
  const navigate = useNavigate();
  const onExit = () => {
    navigate("/");
  };
  const resumeMatch = useMatch("/resume");
  const aboutMatch = useMatch("/about");
  const othersMatch = useMatch("/others");
  const githubMatch = useMatch("/github");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <Bar>
      <BarBox>
        <img src={env.PUBLIC_URL + "/assets/img/mrchu.jpeg"} alt="mr.chu" />
        {resumeMatch && <OpenItem onClick={onExit}>Resume</OpenItem>}
        {aboutMatch && <OpenItem onClick={onExit}>About</OpenItem>}
        {othersMatch && <OpenItem onClick={onExit}>Others</OpenItem>}
        {githubMatch && <OpenItem onClick={onExit}>GitHub</OpenItem>}
      </BarBox>

      <span>{time.toLocaleTimeString()}</span>
    </Bar>
  );
}

export default WindowBar;
