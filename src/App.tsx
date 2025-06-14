import { DragDropContext, Draggable, Droppable, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { IToDoState, saveTodos, TODOS_KEY, toDoState } from "./atoms";
import DroppableBoard from "./Components/DroppableBoard";
import { AddBoardText, AddBtn, BtnContainer, CancelBtn } from "./Components/Buttons";
import styles from "./css/Common.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";

const Header = styled.div`
    width: 100%;
    height: 55px;
    background-color: ${(props) => props.theme.headerBgColor};
    color: ${(props) => props.theme.accentColor};
    display: flex;
    align-items: center;
    padding-left: 18px;
    font-size: 14px;
    font-weight: 600;
`;

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-content: space-around;
    width: 100%;
`;

const Form = styled.form`
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 12px;
    padding: 10px;
    width: 250px;
    height: 83px;
    margin: 15px;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease-in-out;
    input {
        width: 100%;
        border: 1px solid rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        font-size: 12px;
        padding: 5px;
        color: ${(props) => props.theme.textColor};
        background-color: ${(props) => props.theme.cardBgColor};
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        &:focus {
            outline: 2px solid #0984e3;
        }
        margin-top: 3px;
        margin-bottom: 5px;
    }
`;

interface IForm {
    boardId: string;
}

function App() {
  const [toDos, setToDos] = useRecoilState(toDoState);
  const [addNew, setAddNew] = useState(false);
  const onClick = () => {
      setAddNew((prev) => !prev);
  }

  const onDragEnd = ({draggableId, destination, source}: DropResult) => {
    if (!destination) return;
   
    if (source.droppableId === destination?.droppableId) {
      setToDos(allBoards => {
        const boardCopy = [...allBoards[source.droppableId]];
        const taskObj = boardCopy[source.index];
        boardCopy.splice(source?.index, 1);
        boardCopy.splice(destination?.index, 0, taskObj);
        const updatedTodos = {
          ...allBoards,
          [destination.droppableId]: boardCopy,
        };
        saveTodos(updatedTodos);
        return updatedTodos;
      })
    }
    else {
      setToDos((allBoards) => {
        const sBoardCopy = [...allBoards[source.droppableId]];
        const taskObj = sBoardCopy[source.index];
        sBoardCopy.splice(source?.index, 1);
        const dBoardCopy = [...allBoards[destination.droppableId]];
        dBoardCopy.splice(destination?.index, 0, taskObj);
        const updatedTodos = {
          ...allBoards,
          [source.droppableId]: sBoardCopy,
          [destination.droppableId]: dBoardCopy,
        };
        saveTodos(updatedTodos);
        return updatedTodos;
      })
    }     
  };

  const {register, setValue, handleSubmit} = useForm<IForm>();
  const onValid = ({boardId}:IForm) => {
      setToDos(allBoards => {
        const updatedTodos = {
            ...allBoards,
            [boardId]: []
        }
        saveTodos(updatedTodos);
        return updatedTodos;
      })
      setAddNew(false);
  }

  return (
    <>
    <Header>Basic Board</Header>
    <Container>
      <DragDropContext onDragEnd={onDragEnd}>
       { Object.keys(toDos).map(boardId => {
          return (
            <DroppableBoard 
              boardId={boardId} 
              toDos={toDos[boardId]}
            />
          )
        }) 
        }
      </DragDropContext>
      <AddBoardText className={addNew ? styles.hidden : ""} onClick={onClick}>+ Add another list</AddBoardText>
      <Form className={addNew ? "" : styles.hidden} onSubmit={handleSubmit(onValid)}>
        <input 
          {...register("boardId", {required: true})}
          placeholder={`Enter new board name.`} 
        />
        <BtnContainer>
          <AddBtn type="submit">Add board</AddBtn>
          <CancelBtn onClick={onClick} />
        </BtnContainer>
      </Form>
    </Container>
    </>
  );
}

export default App;
