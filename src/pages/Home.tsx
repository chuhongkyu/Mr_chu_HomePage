import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
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
import AppLink from "components/AppLink";
import { getParam, setCookie } from "utils/helper";
import { useEffect } from "react";
import { useState } from "react";
import AddFolder from "components/AddFolder";
import Enter from "./Enter";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  font-family: sans-serif;
`;

const Window = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  @media ${(props) => props.theme.device.mac} {
    padding: 30px;
  }
  @media ${(props) => props.theme.device.tablet} {
    padding: 20px 0 20px 20px;
    display: flex;
    justify-content: flex-end;
  }
`;

const Boards = styled.div`
  max-width: 80vw;
  font-family: "Montserrat", sans-serif;
  display: flex;
  justify-content: flex-start;
  font-weight: 600;
  @media ${(props) => props.theme.device.tablet} {
    width: 30vw;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  @media ${(props) => props.theme.device.mobile} {
  }
`;

const Board = styled.div`
  flex: left;
  margin-right: 60px;
  @media ${(props) => props.theme.device.mac} {
    margin-right: 40px;
  }
  @media ${(props) => props.theme.device.tablet} {
    flex: right;
    margin-right: 0;
    margin-bottom: 20px;
  }
`;

const Home = () => {
  const [apps, setApp] = useRecoilState(appList);
  const [coach, setCoach] = useState<string|boolean|null>()
  const [login, setLogin] = useRecoilState<boolean>(loginAtom)
  const location  = useLocation()

  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setApp((oldApps) => {
      const copyAppList = [...oldApps];
      copyAppList.splice(source.index, 1);
      copyAppList.splice(destination.index, 0, draggableId);
      return copyAppList;
    });
  };

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
    setCookie('login', 'false', 30);
  }

  return (
    <AnimatePresence exitBeforeEnter>
      <Wrapper>
        <AnimatePresence exitBeforeEnter>
        {login ? <Enter key="loading"/> 
        : (
            <>
              <Window>
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId="droppable" direction="horizontal">
                    {(magic) => (
                      <Boards ref={magic.innerRef} {...magic.droppableProps}>
                        {apps.map((app, index) => (
                          <Draggable key={app} draggableId={app} index={index}>
                            {(magic) => (
                              <Board
                                ref={magic.innerRef}
                                {...magic.dragHandleProps}
                                {...magic.draggableProps}
                              >
                                <AppLink title={app} pathUrl={`${app}`} type={app} />
                              </Board>
                            )}
                          </Draggable>
                        ))}
                        {magic.placeholder}
                      </Boards>
                    )}
                  </Droppable>
                </DragDropContext>
                <AddFolder/>
              </Window>
              <AnimatePresence initial={false}>
                <Routes location={location} key={location.pathname}>
                  <Route path="resume" element={<Resume />} />
                  <Route path="about" element={<About />} />
                  <Route path="github" element={<GitHub />} />
                  <Route path="game_app" element={<Others />} />
                  <Route path="project" element={<Project />} />
                </Routes>
              </AnimatePresence>
              <WindowBar />
            </>
          ) 
        }
        </AnimatePresence>
      </Wrapper>
    </AnimatePresence>
  );
};

export default Home;
