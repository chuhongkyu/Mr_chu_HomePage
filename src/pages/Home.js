import styled from "styled-components";
import AppLink from "../components/AppLink";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import WindowBar from "../components/WindowBar";
import About from "./About";
import { useRecoilState } from "recoil";
import { appList } from "../atoms";

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
  ul {
    width: 30vw;
    height: 80vh;
    background-color: ${(props) => props.theme.glass};
    border: 2px solid ${(props) => props.theme.black.lighter};
    border-radius: 15px;
    padding: 0%;
    li {
      padding: 5px;
    }
  }
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
                <ul ref={magic.innerRef} {...magic.droppableProps}>
                  {apps.map((App, index) => (
                    <Draggable
                      key={App.name}
                      draggableId={App.name}
                      index={index}
                    >
                      {(magic) => (
                        <li
                          ref={magic.innerRef}
                          {...magic.dragHandleProps}
                          {...magic.draggableProps}
                        >
                          <AppLink
                            title={App.name}
                            img={App.logo}
                            path={"/about"}
                            element={<About />}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}
                </ul>
              )}
            </Droppable>
          </div>
        </DragDropContext>
      </Window>
      <WindowBar />
    </Wrapper>
  );
};

export default Home;
