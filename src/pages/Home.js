import styled from "styled-components";
import AppLink from "../components/AppLink";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { AppList } from "../utils/AppList";
import WindowBar from "../components/WindowBar";
import { Link } from "react-router-dom";
import About from "./About";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url("${env.PUBLIC_URL}/assets/img/bg.jpg");
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
  const onDragEnd = () => {};
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
                  {AppList.map((App) => (
                    <Draggable draggableId={App.id + ""} index={App.id}>
                      {(magic) => (
                        <li
                          ref={magic.innerRef}
                          {...magic.dragHandleProps}
                          {...magic.draggableProps}
                        >
                          <Link to="/about" element={<About />}>
                            <AppLink title={App.name} img={App.logo} />
                          </Link>
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
