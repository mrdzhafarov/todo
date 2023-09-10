import { Todo } from "entities/todo/types";

type ActionTypes =
    | "SET-NEW-TODO"
    | "DELETE-TODO"
    | "EDIT-TODO"
    | "SELECT-TO-EDIT";

type InitState = {
    todos: Todo[];
    todoToEdit: null | Todo;
};
export const initialState: InitState = {
    todos: [],
    todoToEdit: null,
};

export const getInitialState = () => {
    const storage = localStorage.getItem("store");
    if (storage) {
        try {
            const init = JSON.parse(storage) as InitState;
            return init;
        } catch {
            return initialState;
        }
    }

    return initialState;
};

const sendToStorage = (data: InitState) => {
    localStorage.setItem("store", JSON.stringify(data));
};

export const todoReducer = (
    store: typeof initialState,
    action: { type: ActionTypes; payload?: Todo }
): InitState => {
    switch (action.type) {
        case "DELETE-TODO": {
            const newStore = {
                ...store,
                todos: store.todos.filter(
                    (todo) => todo.id !== action.payload?.id
                ),
            };
            sendToStorage(newStore);
            return newStore;
        }
        case "SET-NEW-TODO": {
            if (!action.payload) {
                return store;
            }

            const newStore = {
                ...store,
                todos: [...store.todos, action.payload],
            };
            sendToStorage(newStore);
            return newStore;
        }
        case "EDIT-TODO": {
            if (!action.payload) {
                return { ...store, todoToEdit: null };
            }
            const toEdit = store.todos.find(
                (todo) => todo.id === action.payload?.id
            );

            if (!toEdit) {
                return store;
            }

            const filtered = store.todos.filter(
                (todo) => todo.id !== toEdit.id
            );

            const newStore = {
                ...store,
                todos: [...filtered, { ...action.payload, id: toEdit?.id }],
                todoToEdit: null,
            };
            sendToStorage(newStore);
            return newStore;
        }
        case "SELECT-TO-EDIT": {
            if (!action.payload) {
                return store;
            }
            const newStore = { ...store, todoToEdit: action.payload };
            sendToStorage(newStore);
            return newStore;
        }
        default:
            return store;
    }
};
