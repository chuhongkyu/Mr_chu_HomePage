import { motion } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Calender from "./Calender";
import Menu from "./Menu";
import Weather from "./Weather";
import Clock from "./Clock";

const Bar = styled(motion.div)`
  width: 100%;
  height: 40px;
  background-color: ${(props) => props.theme.black.good};
  color: ${(props) => props.theme.white.lighter};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1px 10px 1px 0;
  position: fixed;
  z-index: 5;
  bottom: 0;
  .logo-icon{
    width: 40px;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    padding-left: 10px;
    padding-right: 10px;
    background: #333;
    transition: 300ms opacity;
    &:hover {
      opacity: 0.8;
      transition: 300ms opacity;
    }
    picture{
      display: block;
      width: 30px;
      height: 30px;
      cursor: pointer;
    }
    img {
      display: block;
      width: 30px;
      height: 30px;
      cursor: pointer;
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
  .current-time{
    white-space: nowrap;
  }
`;

const BarBox = styled.div`
  width: calc(100% - 180px);
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
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

  const [open, setOpen] = useState(false);

  const onHandleCalender = () =>{
    setOpen(!open)
  }

  return (
    <>
      {slide ? <Menu /> : null}
      <Bar initial={{y:50}} animate={{y: 0}} transition={{ease: "linear"}}>
        <BarBox>
          <div className="logo-icon" onClick={onHandleSlide}>
            <picture>
              <source type="image/webp" srcSet={"/assets/img/mrchu.webp"}/>
              <source type="image/jpeg" srcSet={"/assets/img/mrchu.jpeg"}/>
              <img src={"/assets/img/mrchu.webp"} alt="3"/>
            </picture>
          </div>
          {resumeMatch && <OpenItem onClick={onExit}>Resume</OpenItem>}
          {aboutMatch && <OpenItem onClick={onExit}>About</OpenItem>}
          {othersMatch && <OpenItem onClick={onExit}>GameApp</OpenItem>}
          {githubMatch && <OpenItem onClick={onExit}>GitHub</OpenItem>}
          {projectMatch && <OpenItem onClick={onExit}>Project</OpenItem>}
        </BarBox>
        <DateBox onClick={onHandleCalender}>
          <Clock/>
          <Weather />
        </DateBox>
      </Bar>
      {open ? <Calender/> : null}
    </>
  );
}

export default WindowBar;
