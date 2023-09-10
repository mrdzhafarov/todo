import { Container, Box } from "@mui/material";
import { Todo } from "entities/todo/types";

import { CreateTodoForm } from "entities/ui";
import { TodosList } from "entities/ui/TodosList";
import { useCallback, useReducer } from "react";
import { TodoContext } from "store";
import { getInitialState, todoReducer } from "store/reducer";

function HomePage() {
    const [state, dispatch] = useReducer(todoReducer, getInitialState());

    const createNew = useCallback(
        (todo: Todo) => {
            dispatch({
                type: "SET-NEW-TODO",
                payload: {
                    ...todo,
                    id: state.todos.length,
                },
            });
        },
        [state.todos]
    );

    const deleteTodo = useCallback((todo: Todo) => {
        dispatch({
            type: "DELETE-TODO",
            payload: todo,
        });
    }, []);

    const editTodo = useCallback((todo: Todo | undefined) => {
        dispatch({
            type: "EDIT-TODO",
            payload: todo,
        });
    }, []);

    const handleEditTodo = useCallback((todo: Todo) => {
        dispatch({
            type: "SELECT-TO-EDIT",
            payload: todo,
        });
    }, []);

    return (
        <TodoContext.Provider
            value={{
                todos: state.todos,
                todoToEdit: state.todoToEdit,
                deleteTodo,
                editTodo,
                addTodo: createNew,
                handleClickTodo: handleEditTodo,
            }}
        >
            <Container>
                <Box
                    sx={{ paddingBlock: "40px", display: "flex", gap: "20px" }}
                >
                    <CreateTodoForm />
                    <Box sx={{ flex: "1" }}>
                        <TodosList />
                    </Box>
                </Box>
            </Container>
        </TodoContext.Provider>
    );
}

export default HomePage;
