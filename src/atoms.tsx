import { atom, selector } from "recoil";

export const TODOS_KEY = "todos";

export interface IToDo {
    id: number;
    text: string;
}

export interface IToDoState {
    [key:string]: IToDo[];
}

const savedTodos = localStorage.getItem(TODOS_KEY)
let defaultTodos:IToDoState;
if (savedTodos) {
    defaultTodos = JSON.parse(savedTodos);
}
else {
    defaultTodos = {
        To_Do: [
            {id: 1, text: "Invite collaborators to your board by selecting the menu to the right of the notifications bell."},
            {id: 2, text: "This is a card! 👋 Select it to see its card back."},
        ],
        Doing: [
               {id: 3, text: "Hold and drag to move this card to another list 👉"},
        ],
        Done: [
            {id: 4, text: "This card has a label and a checklist."},
        ]
    };
}

export const toDoState = atom<IToDoState>({
    key: "toDo",  
    default: defaultTodos,
});

export const saveTodos = (allboards:IToDoState) => {
  const updatedTodos = JSON.stringify(allboards);
  localStorage.setItem(TODOS_KEY, updatedTodos)
}
    


