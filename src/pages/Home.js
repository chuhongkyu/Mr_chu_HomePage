import styled from "styled-components";
import AppLink from "../components/AppLink";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import WindowBar from "../components/WindowBar";
import About from "./About";
import { useRecoilState } from "recoil";
import { appList } from "../atoms";
import { Route, Routes } from "react-router-dom";

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
  width: 30vw;
  height: 80vh;
  background-color: ${(props) => props.theme.glass};
  border: 2px solid ${(props) => props.theme.black.lighter};
  border-radius: 15px;
  padding: 0%;
`;

const Title = styled.h1`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-size: 30px;
  font-weight: 700;
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
          <Title>Developer</Title>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <Droppable droppableId="one">
              {(magic) => (
                <Boards ref={magic.innerRef} {...magic.droppableProps}>
                  {apps.map((app, index) => (
                    <Draggable key={app} draggableId={app} index={index}>
                      {(magic) => (
                        <div
                          ref={magic.innerRef}
                          {...magic.dragHandleProps}
                          {...magic.draggableProps}
                        >
                          <AppLink
                            title={app.toUpperCase()}
                            img={`${env.PUBLIC_URL}/assets/img/${index}.svg`}
                            pathUrl={`/${app}`}
                          ></AppLink>
                        </div>
                      )}
                    </Draggable>
                  ))}
                </Boards>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </Window>
      <Routes>
        <Route path="about" element={<About />} />
      </Routes>

      <WindowBar />
    </Wrapper>
  );
};

export default Home;
