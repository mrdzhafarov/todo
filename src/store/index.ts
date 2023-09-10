import { Todo } from "entities/todo/types";
import { createContext } from "react";

interface Store {
    todos: Todo[];
    todoToEdit: Todo | null;
    addTodo: (newTodo: Todo) => void;
    deleteTodo: (todo: Todo) => void;
    editTodo: (todo?: Todo) => void;
    handleClickTodo: (todo: Todo) => void;
}
export const TodoContext = createContext<Store>({
    todos: [],
    todoToEdit: null,
    addTodo: (newTodo) => {},
    deleteTodo: (name) => {},
    editTodo: (todo) => {},
    handleClickTodo: (todo) => {}
})