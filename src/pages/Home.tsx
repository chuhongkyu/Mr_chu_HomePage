import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import WindowBar from "components/WindowBar";
import { useRecoilState, useRecoilValue } from "recoil";
import { appList, stateType } from "../atoms";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion"
import Resume from "./Resume";
import About from "./About";
import GitHub from "./GitHub";
import Others from "./Others";
import Project from "./Project";
import AppLink from "components/AppLink";
import TestCoach from "components/TestCoach";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  font-family: sans-serif;
`;

const Window = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
`;

const Boards = styled.div`
  font-family: "Montserrat", sans-serif;
  padding: 30px 30px;
  display: flex;
  justify-content: center;
  width: 50%;
  @media ${(props) => props.theme.device.tablet} {
    width: 70%;
  }
  @media ${(props) => props.theme.device.mobile} {
    align-items: flex-end;
    flex-direction: column;
    padding: 10px 10px;
    width: 100%;
    height: 70%;
  }
`;

const Board = styled.div`
  width: 70px;
  height: 70px;
  margin: 0;
  display: inline-flex;
  flex: 1;
`;

const Home = () => {
  const keyValue = useRecoilValue(stateType)
  const [apps, setApp] = useRecoilState(appList);

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
  return (
    <AnimatePresence exitBeforeEnter>
    <Wrapper>
      {keyValue ? <TestCoach /> : null}
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
    </Wrapper>
    </AnimatePresence>
  );
};

export default Home;