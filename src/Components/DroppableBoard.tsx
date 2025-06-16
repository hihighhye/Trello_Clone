import { Droppable } from "react-beautiful-dnd";
import DragabbleCard from "./DragabbleCard";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { IToDo, IToDoState, toDoState } from "../atoms";
import { useSetRecoilState } from "recoil";
import { useRef, useState } from "react";
import styles from "../css/Common.module.css";
import { AddBtn, AddCardText, BtnContainer, CancelBtn, CancelBtnSmall } from "./Buttons";

const Board = styled.div`
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.boardColor};
    border-radius: 12px; 
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    transition: box-shadow 0.2s ease-in-out;
    min-width: 250px;
    max-width: 250px;
    padding: 18px 10px;
    margin: 15px 0 0 15px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    position: relative;
`;

const Title = styled.span`
    color: ${(props) => props.theme.textColor};
    font-size: 14px;
    font-weight: 500;
    text-align: center;
    display: block;
    padding-bottom: 18px;
`;

const CardWrapper = styled.div<IBoardProps>`
    background-color: ${(props) => props.isDraggingOver ? "#e3fcef" : "transparent"};
`;

const Form = styled.form`
    width: 100%;
    textarea {
        width: 100%;
        height: 55px;
        border: none;
        border-radius: 5px;
        font-size: 12px;
        padding: 5px;
        line-height: 1.3;
        color: ${(props) => props.theme.textColor};
        background-color: ${(props) => props.theme.cardBgColor};
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
        &:focus {
            outline: 2px solid #0984e3;
        }
        margin-top: 3px;
        margin-bottom: 5px;
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

interface IDelProps {
    boardId: string;
}

function DroppableBoard({toDos, boardId}:IDroppableBoardProps) {
    const setToDos = useSetRecoilState(toDoState);
    const {register, setValue, handleSubmit} = useForm<IForm>();
    const onValid = ({todo}:IForm) => {
        const newToDo = {
            id: Date.now(),
            isChecked: false,
            text: todo
        };
        setToDos(allBoards => {
            const updatedTodos = {
                ...allBoards,
                [boardId]: [
                    ...allBoards[boardId],
                    newToDo
                ]
            }
            // saveTodos(updatedTodos);
            return updatedTodos;
        })
        setValue("todo", "");
    }
    
    const [addNew, setAddNew] = useState(false);
    const onClickAdd = () => {
        setAddNew((prev) => !prev);
    }

    const cancelBtnRef = useRef<SVGSVGElement>(null);
    const handleBoardMouseEnter = () => {
        cancelBtnRef.current?.classList.remove(styles.hidden);
    }
    const handleBoardMouseLeave = () => {
        cancelBtnRef.current?.classList.add(styles.hidden);
    }
    const onClickDel = ({boardId}: IDelProps) => {
        setToDos(allBoards => {
            const updatedTodos = Object.keys(allBoards)
                .filter(key => key !== boardId)
                .reduce((todostate:IToDoState, key) => {
                    todostate[key] = allBoards[key];
                    return todostate;
                }, {});
            // saveTodos(updatedTodos);
            return updatedTodos;
        })
    }

    return (
        <>
            <Droppable droppableId={boardId}>
                {(provided, snapshot) => {
                    return  (
                        <Board 
                            onMouseEnter={handleBoardMouseEnter}
                            onMouseLeave={handleBoardMouseLeave}
                        >
                            <Title>{boardId}</Title>
                            <CancelBtnSmall
                                ref={cancelBtnRef}
                                className={styles.hidden}
                                onClick={() => onClickDel({boardId})}
                            />
                            <CardWrapper
                                isDraggingOver={snapshot.isDraggingOver} 
                                isDraggingFromThis={Boolean(snapshot.draggingFromThisWith)}
                                ref={provided.innerRef} 
                                {...provided.droppableProps}
                            >
                                {toDos.map((toDo, index) => (
                                    <DragabbleCard key={toDo.id} toDoId={toDo.id} toDoIsChecked={toDo.isChecked} toDoText={toDo.text} index={index} />
                                ))}
                                {provided.placeholder}
                            </CardWrapper>
                            <AddCardText className={addNew ? styles.hidden : ""} boardId={boardId} onClick={onClickAdd}>+ Add a card</AddCardText>
                            <Form className={addNew ? "" : styles.hidden} onSubmit={handleSubmit(onValid)}>
                                <textarea 
                                    {...register("todo", {required: true})}
                                    placeholder={`Add task on ${boardId}`} 
                                />
                                <BtnContainer>
                                    <AddBtn type="submit">Add card</AddBtn>
                                    <CancelBtn onClick={onClickAdd} />
                                </BtnContainer>
                            </Form>
                        </Board>
                    )
                }}
            </Droppable>
        </>
    );
}

export default DroppableBoard;