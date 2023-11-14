import styled from "styled-components";
import WindowBar from "components/WindowBar";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"
import Resume from "./Resume";
import About from "./About";
import GitHub from "./GitHub";
import Others from "./Others";
import Project from "./Project";
import { getParam } from "utils/helper";
import { useEffect, useState } from "react";
import AppWrapper from "components/window/AppWrapper";
import { useMediaQuery } from "react-responsive";
import SearchForm from "components/window/SearchForm";
import Detail from "./Detail";

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: var(--100vh, 100vh);
`;

const Window = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 2rem;
  @media ${(props) => props.theme.device.tablet} {

  }
`;

const Home = () => {
  const [coach, setCoach] = useState<string|boolean|null>()
  const location  = useLocation()
  const isMoible = useMediaQuery({
    query: '(min-width: 681px)'
  })


  useEffect(() => {
    const state = getParam('test');
    setCoach(state)
    if(coach){
      window.document.body.classList.add('coach');
    }else{
      window.document.body.classList.remove('coach');
    }
  }, [coach])

  return (
      <Wrapper>
          <Window>
            <SearchForm/>
            <AppWrapper/>
          </Window>
          <AnimatePresence initial={false}>
            <Routes location={location} key={location.pathname}>
              <Route path="resume" element={<Resume />} />
              <Route path="about" element={<About />} />
              <Route path="github" element={<GitHub />} />
              <Route path="game_app" element={<Others />} />
              <Route path="project" element={<Project />} />
              <Route path="detail/:id" element={<Detail />} />
            </Routes>
          </AnimatePresence>
          {isMoible ? <WindowBar/> : null}
      </Wrapper>
  );
};

export default Home;
