import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<ICardProps>`
    background-color: ${(props) => props.theme.cardBgColor};
    box-shadow: ${(props) => props.isDragging ? "0 4px 8px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0, 0, 0, 0.2)"};
    transition: box-shadow 0.2s ease-in-out;
    border-radius: 5px;
    padding: 8px;
    margin-bottom:5px;
    font-size: 12px;;
`;

interface ICardProps {
    isDragging: boolean;
}

interface IDragabbleCardProps {
    toDoId: number;
    toDoText: string;
    index: number;
}

function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
//   console.log(toDo, "has been rendered");
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {(magic, snapshot) => (
        <Card
          ref={magic.innerRef}
          {...magic.dragHandleProps}
          {...magic.draggableProps}
          isDragging={snapshot.isDragging}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);