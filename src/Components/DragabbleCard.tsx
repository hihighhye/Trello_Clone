import React, { useRef, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";
import styles from "../css/Common.module.css";
import { CardDelBtn } from "./Buttons";
import { useRecoilState, useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { IToDo, toDoState, IToDoState } from "../atoms";
import { skipPartiallyEmittedExpressions } from "typescript";

const Card = styled.div<ICardProps>`
    color: ${(props) => props.theme.textColor};
    background-color: ${(props) => props.theme.cardBgColor};
    box-shadow: ${(props) => props.isDragging ? "0 4px 8px rgba(0,0,0,0.2)" : "0 1px 3px rgba(0, 0, 0, 0.2)"};
    transition: box-shadow 0.2s ease-in-out;
    border-radius: 5px;
    padding: 8px;
    margin-bottom:8px;
    font-size: 12px;
    line-height: 1.3;
    position: relative;
`;

interface ICardProps {
    isDragging: boolean;
}

interface IDragabbleCardProps {
    toDoId: number;
    toDoIsChecked: boolean;
    toDoText: string;
    index: number;
}

interface IDelProps {
    toDoId: number;
}

function DragabbleCard({ toDoId, toDoIsChecked, toDoText, index }: IDragabbleCardProps) {
//   console.log(toDo, "has been rendered"); 
    const setToDos = useSetRecoilState(toDoState);
    const [isChecked, setIsChecked] = useState(false);
    const cardDelBtnRef = useRef<HTMLButtonElement>(null);
    const handleCardMouseEnter = () => {
        cardDelBtnRef.current?.classList.remove(styles.hidden);
    }
    const handleCardMouseLeave = () => {
        cardDelBtnRef.current?.classList.add(styles.hidden);
    }
    const handleChecked = (event:React.ChangeEvent<HTMLInputElement>) => {
        if (!isChecked) {
            event.currentTarget.nextElementSibling?.classList.add(styles.canceled);
            
        }
        else {
            event.currentTarget.nextElementSibling?.classList.remove(styles.canceled);
        }
        setIsChecked((prev) => !prev);

        const toDoId = parseInt(event.currentTarget.name);
        setToDos(allBoards => {
            let newBoards:IToDoState = {};
            const boardIdList = Object.keys(allBoards);
            boardIdList.forEach((boardId:string) => {
                let newBoard:IToDo[] = [];
                allBoards[boardId].forEach(({id, isChecked, text}:IToDo) => {
                    if (id === toDoId) {
                        newBoard = [...newBoard, {id: id, isChecked: !isChecked, text: text}];
                    }
                    else {
                        newBoard = [...newBoard, {id: id, isChecked: isChecked, text: text}];
                    }
                });
                newBoards[boardId] = newBoard;
            })
            // saveTodos(newBoards);
            return newBoards;
        })
    }

    const onClickDel = ({toDoId}: IDelProps) => {
        setToDos(allBoards => {
            const allBoardsCopy = {...allBoards};
            let newBoards:IToDoState = {};
            const boardIdList = Object.keys(allBoardsCopy);
            boardIdList.forEach((boardId:string) => {
                let copiedBoard = [...allBoards[boardId]];
                copiedBoard = copiedBoard.filter(({id, text}:IToDo) => (id !== toDoId));
                newBoards[boardId] = copiedBoard;
            })
            // saveTodos(newBoards);
            return newBoards;
        })
    }

    return (
        <Draggable draggableId={toDoId + ""} index={index}>
        {(magic, snapshot) => (
            <Card
                ref={magic.innerRef}
                {...magic.dragHandleProps}
                {...magic.draggableProps}
                isDragging={snapshot.isDragging}
                onMouseEnter={handleCardMouseEnter}
                onMouseLeave={handleCardMouseLeave}
            >
                <input 
                    type="checkbox" 
                    name={toDoId + ""}
                    checked={toDoIsChecked} 
                    onChange={handleChecked}
                />
                <span className={toDoIsChecked ? styles.canceled : ""}>{toDoText}</span>
                <CardDelBtn
                    ref={cardDelBtnRef} 
                    className={styles.hidden}
                    onClick={() => onClickDel({toDoId})}
                >
                    Delete
                </CardDelBtn>
            </Card>
        )}
        </Draggable>
    );
}

export default React.memo(DragabbleCard);