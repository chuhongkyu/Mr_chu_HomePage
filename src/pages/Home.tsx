import styled from "styled-components";

import WindowBar from "components/WindowBar";
import { useRecoilState } from "recoil";
import { appList, loginAtom } from "../atoms";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"
import Resume from "./Resume";
import About from "./About";
import GitHub from "./GitHub";
import Others from "./Others";
import Project from "./Project";
import { getParam, setCookie } from "utils/helper";
import { useEffect } from "react";
import { useState } from "react";
import Enter from "./Enter";
import AppWrapper from "components/window/AppWrapper";
import { useMediaQuery } from "react-responsive";
import SearchForm from "components/SearchForm";

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
  const [login, setLogin] = useRecoilState<boolean>(loginAtom)
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

  useEffect(() => {
    const timeout = setTimeout(() => onHandleLogin(), 4500);
    return () => clearTimeout(timeout);
  }, []);

  const onHandleLogin = () => {
    setLogin(false);
    setCookie('login', 'false', 1);
  }

  return (
      <Wrapper>
        <AnimatePresence exitBeforeEnter>
        {login ? <Enter key="loading"/> 
        : (
            <>
              <Window>
                <SearchForm/>
                <AppWrapper/>
              </Window>
              <AnimatePresence initial={false}>
                <Routes location={location} key={location.pathname}>
                  <Route path="/resume" element={<Resume />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/github" element={<GitHub />} />
                  <Route path="/game_app" element={<Others />} />
                  <Route path="/project" element={<Project />} />
                </Routes>
              </AnimatePresence>
              {isMoible ? <WindowBar/> : null}
            </>
          ) 
        }
        </AnimatePresence>
      </Wrapper>
  );
};

export default Home;
