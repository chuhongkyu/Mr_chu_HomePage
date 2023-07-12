import { useState, useEffect } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Calender from "./Calender";
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
  padding: 1px 10px 1px 0;
  position: fixed;
  bottom: 0;
  .main_icon{
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    padding-left: 10px;
    padding-right: 10px;
    background: #333;
    img {
      width: 30px;
      height: 30px;
      cursor: pointer;
      &:hover {
        transform: scale(1.2);
      }
    }
  }
  @media ${(props) => props.theme.device.mobile} {
    .main_icon{
      margin-right: 10px;
    }
  }
`;

const DateBox = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 10px;
  font-size: 15px;
  cursor: pointer;
  /* width: 30%; */
  min-width: 180px;
  height: 100%;
  .current_time{
    white-space: nowrap;
  }
  @media ${(props) => props.theme.device.mobile} {
    min-width: 150px;
    font-size: 12px;
  }
`;

const BarBox = styled.div`
  width: calc(100% - 180px);
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media ${(props) => props.theme.device.mobile} {
    width: calc(100% - 150px);
  }
`;

const OpenItem = styled.div`
  background-color: rgba(255,255,255,0.5);
  color: ${(props) => props.theme.white.darker};
  height: 100%;
  display: flex;
  align-items: center;
  padding: 0px 10px;
  transition: 0.5s;
  font-weight: 600;
  border-bottom: 2px solid rgb(46,142,214);
  &:hover {
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
  const [open, setOpen] = useState(false);

  const onHandleCalender = () =>{
    setOpen(!open)
  }

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
          <div className="main_icon" onClick={onHandleSlide}>
            <img
              loading="lazy"
              src={env.PUBLIC_URL + "/assets/img/mrchu.jpeg"}
              alt="mr.chu"
            />
          </div>
          {/* <SearchForm/> */}
          {resumeMatch && <OpenItem onClick={onExit}>Resume</OpenItem>}
          {aboutMatch && <OpenItem onClick={onExit}>About</OpenItem>}
          {othersMatch && <OpenItem onClick={onExit}>GameApp</OpenItem>}
          {githubMatch && <OpenItem onClick={onExit}>GitHub</OpenItem>}
          {projectMatch && <OpenItem onClick={onExit}>Project</OpenItem>}
        </BarBox>
        <DateBox>
          <span className="current_time" onClick={onHandleCalender}>{time.toLocaleTimeString()}</span> <Weather />
        </DateBox>
      </Bar>
      {open ? <Calender/> : null}
    </>
  );
}

export default WindowBar;
