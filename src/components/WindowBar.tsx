import { useState, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Menu from "./Menu";
import Weather from "./Weather";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Bar = styled.div`
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.theme.black.good};
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px 10px;
  position: fixed;
  bottom: 0;
  img {
    width: 30px;
    height: 30px;
    cursor: pointer;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const DateBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  @media ${(props) => props.theme.device.mobile} {
    font-size: 11px;
  }
`;

const BarBox = styled.div`
  width: 200px;
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
  const [slide, setSlide] = useState(false);
  const navigate = useNavigate();
  const onExit = () => {
    navigate("/home");
  };
  const onHandleSlide = () => {
    setSlide(!slide);
  };
  const resumeMatch = useMatch("/home/resume");
  const aboutMatch = useMatch("/home/about");
  const othersMatch = useMatch("/home/game_app");
  const projectMatch = useMatch("/home/project");
  const githubMatch = useMatch("/home/github");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <>
      {slide ? <Menu /> : null}
      <Bar>
        <BarBox>
          <img
            onClick={onHandleSlide}
            src={env.PUBLIC_URL + "/assets/img/mrchu.jpeg"}
            alt="mr.chu"
          />
          {resumeMatch && <OpenItem onClick={onExit}>Resume</OpenItem>}
          {aboutMatch && <OpenItem onClick={onExit}>About</OpenItem>}
          {othersMatch && <OpenItem onClick={onExit}>GameApp</OpenItem>}
          {githubMatch && <OpenItem onClick={onExit}>GitHub</OpenItem>}
          {projectMatch && <OpenItem onClick={onExit}>Project</OpenItem>}
        </BarBox>
        <DateBox>
          <span>{time.toLocaleTimeString()}</span> <Weather />
        </DateBox>
      </Bar>
    </>
  );
}

export default WindowBar;
