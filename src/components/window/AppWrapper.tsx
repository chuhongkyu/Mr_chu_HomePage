import { appList } from "atoms";
import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import AppLink from "components/window/AppLink";

const Boards = styled.div`
    margin-top: 5rem;
    width: 45vw;
    font-family: "Montserrat", sans-serif;
    display: grid;
    grid-template-columns: repeat(5,1fr);
    @media ${(props) => props.theme.device.tablet} {
    }
    @media ${(props) => props.theme.device.mobile} {
    }
`;

const Board = styled.div`
    grid-column: span;
    @media ${(props) => props.theme.device.tablet} {

    }
`;

const AppWrapper = ()=> {
    const [apps, setApp] = useRecoilState(appList);
    const onDragEnd = ({ draggableId, destination, source }: DropResult) => {
        if (!destination) return;
        setApp((oldApps) => {
          const copyAppList = [...oldApps];
          copyAppList.splice(source.index, 1);
          copyAppList.splice(destination.index, 0, draggableId);
          return copyAppList;
        });
      };
    return(
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(magic) => (
                <Boards ref={magic.innerRef} {...magic.droppableProps}>
                  {apps.map((app, index) => (
                    <Draggable key={app} draggableId={app} index={index}>
                      {(magic) => (
                        <Board ref={magic.innerRef} {...magic.dragHandleProps}{...magic.draggableProps}>
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
    )
}

export default AppWrapper;