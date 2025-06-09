import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { toDoState } from "./atoms";
import DroppableBoard from "./Components/DroppableBoard";

const Container = styled.div`
    display: flex;
`;

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const onDragEnd = ({draggableId, destination, source}: DropResult) => {
    if (!destination) return;
   
    if (source.droppableId === destination?.droppableId) {
      setToDos(allBoards => {
          const boardCopy = [...allBoards[source.droppableId]];
          const taskObj = boardCopy[source.index];
          console.log(taskObj);
          boardCopy.splice(source?.index, 1);
          boardCopy.splice(destination?.index, 0, taskObj);
          return {
            ...allBoards,
            [destination.droppableId]: boardCopy,
          };
        })
    }
    else {
      setToDos((allBoards) => {
        const sBoardCopy = [...allBoards[source.droppableId]];
        const taskObj = sBoardCopy[source.index];
        console.log(taskObj);
        sBoardCopy.splice(source?.index, 1);
        const dBoardCopy = [...allBoards[destination.droppableId]];
        dBoardCopy.splice(destination?.index, 0, taskObj);
        return {
          ...allBoards,
          [source.droppableId]: sBoardCopy,
          [destination.droppableId]: dBoardCopy,
        };
      })
    }     
  };

  return (
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
       { Object.keys(toDos).map(boardId => {
          return (
            <>
              <DroppableBoard 
                boardId={boardId} 
                toDos={toDos[boardId]}
              />
            </>
          )
          }) 
        }
      </DragDropContext>
    </Container>
  );
}

export default App;
