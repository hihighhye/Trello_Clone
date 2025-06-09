import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IToDo, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";

const Board = styled.div<IBoardProps>`
    background-color: ${(props) => props.isDraggingOver ? "#e3fcef" : props.theme.boardColor};
    border-radius: 12px; 
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease-in-out;
    width: 250px;
    min-height: 300px;
    padding: 18px;
    margin: 15px 0 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`;

const Title = styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    display: block;
    padding-bottom: 18px;
`

const Form = styled.form`
    width: 100%;
    input {
        width: 100%;
    }
`;

interface IDroppableBoardProps {
    toDos: IToDo[];
    boardId: string;
}

interface IBoardProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
}

interface IForm {
    todo: string;
}

function DroppableBoard({toDos, boardId}:IDroppableBoardProps) {
    const setToDos = useSetRecoilState(toDoState);
    const {register, setValue, handleSubmit} = useForm<IForm>();
    const onValid = ({todo}:IForm) => {
        const newToDo = {
            id: Date.now(),
            text: todo
        };
        setToDos(allBoards => {
            return {
                ...allBoards,
                [boardId]: [
                    ...allBoards[boardId],
                    newToDo
                ]
            }
        })
        setValue("todo", "");
    }
    return (
        <Droppable droppableId={boardId}>
            {(provided, snapshot) => {
                return  (
                    <Board 
                        isDraggingOver={snapshot.isDraggingOver} 
                        isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                        ref={provided.innerRef} 
                        {...provided.droppableProps}
                    >
                        <Title>{boardId}</Title>
                        <Form onSubmit={handleSubmit(onValid)}>
                            <input 
                                {...register("todo", {required: true})}
                                type="text" 
                                placeholder={`Add task on ${boardId}`} 
                            />
                        </Form>
                        {toDos.map((toDo, index) => (
                            <DragabbleCard key={toDo.id} toDoId={toDo.id} toDoText={toDo.text} index={index} />
                        ))}
                        {provided.placeholder}
                    </Board>
                )
            }}
        </Droppable>
    );
}

export default DroppableBoard;