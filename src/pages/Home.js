import styled from "styled-components";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import WindowBar from "../components/WindowBar";
import { useRecoilState } from "recoil";
import { appList } from "../atoms";
import { Route, Routes } from "react-router-dom";
import DraggabbleCard from "../components/DraggabbleCard";
import Title from "../components/Title";
import Resume from "./Resume";
import About from "./About";
import GitHub from "./GitHub";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-repeat: no-repeat;
  background-size: cover;
`;

const Window = styled.div`
  width: 100%;
  height: 95vh;
  padding: 10px;
`;

const Boards = styled.div`
  padding: 20px 20px;
  display: flex;
  justify-content: center;
  width: 50%;
`;

const Home = () => {
  const [apps, setApp] = useRecoilState(appList);
  const onDragEnd = ({ draggableId, destination, source }) => {
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
                  <DraggabbleCard key={app} index={index} app={app} />
                ))}
                {magic.placeholder}
              </Boards>
            )}
          </Droppable>
        </DragDropContext>
        <Title />
      </Window>
      <Routes>
        <Route path="resume" element={<Resume />} />
        <Route path="about" element={<About />} />
        <Route path="github" element={<GitHub />} />
      </Routes>
      <WindowBar />
    </Wrapper>
  );
};

export default Home;
