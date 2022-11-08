import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import WindowBar from "components/WindowBar";
import { useRecoilState } from "recoil";
import { appList } from "../atoms";
import { Route, Routes } from "react-router-dom";
import Resume from "./Resume";
import About from "./About";
import GitHub from "./GitHub";
import Others from "./Others";
import Project from "./Project";
import AppLink from "components/AppLink";

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
  const [apps, setApp] = useRecoilState(appList);
  const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
    if (!destination) return;
    setApp((oldApps) => {
      const copyAppList = [...oldApps];
      // Delete source.index
      copyAppList.splice(source.index, 1);
      // put back the item on the destination.index
      copyAppList.splice(destination.index, 0, draggableId);
      return copyAppList;
    });
  };
  return (
    <Wrapper>
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
                        <AppLink title={app} pathUrl={`/${app}`} type={app} />
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
      <Routes>
        <Route path="resume" element={<Resume />} />
        <Route path="about" element={<About />} />
        <Route path="github" element={<GitHub />} />
        <Route path="game_app" element={<Others />} />
        <Route path="project" element={<Project />} />
      </Routes>
      <WindowBar />
    </Wrapper>
  );
};

export default Home;
