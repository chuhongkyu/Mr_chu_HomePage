import { Draggable } from "react-beautiful-dnd";
import AppLink from "./AppLink";
import styled from "styled-components";
import React from "react";

const env = process.env;
env.PUBLIC_URL = env.PUBLIC_URL || "";

const Board = styled.div`
  margin: 0;
  display: inline-flex;
  flex: 1;
`;

function DraggabbleCard({ app, index }) {
  return (
    <Draggable key={app} draggableId={app} index={index}>
      {(magic) => (
        <Board
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
        >
          <AppLink
            title={app.toUpperCase()}
            img={`${env.PUBLIC_URL}/assets/img/${app}.svg`}
            pathUrl={`/${app}`}
          />
        </Board>
      )}
    </Draggable>
  );
}

export default React.memo(DraggabbleCard);
