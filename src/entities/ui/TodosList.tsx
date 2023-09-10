import { useContext } from "react";
import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Box,
} from "@mui/material";
import { Button } from "components/Button";
import { TodoContext } from "store";

export const TodosList = () => {
    const { todos, deleteTodo, handleClickTodo } = useContext(TodoContext);
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell
                        sx={{ color: (theme) => theme.palette.primary.light }}
                    >
                        Name
                    </TableCell>
                    <TableCell
                        sx={{ color: (theme) => theme.palette.primary.light }}
                    >
                        Age
                    </TableCell>
                    <TableCell
                        sx={{ color: (theme) => theme.palette.primary.light }}
                    >
                        Subscription
                    </TableCell>
                    <TableCell
                        sx={{ color: (theme) => theme.palette.primary.light }}
                    >
                        Employment
                    </TableCell>
                    <TableCell
                        sx={{ color: (theme) => theme.palette.primary.light }}
                    >
                        Actions
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {todos.map((todo) => {
                    return (
                        <TableRow sx={{
                            height: '60px'
                        }} key={todo.id}>
                            <TableCell
                                sx={{
                                    color: (theme) =>
                                        theme.palette.primary.light,
                                }}
                            >
                                {todo.name}
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: (theme) =>
                                        theme.palette.primary.light,
                                }}
                            >
                                {todo.age}
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: (theme) =>
                                        theme.palette.primary.light,
                                }}
                            >
                                {todo.isSubscribed}
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: (theme) =>
                                        theme.palette.primary.light,
                                }}
                            >
                                {todo.isEmployed ? "Employed" : "Unemployed"}
                            </TableCell>
                            <TableCell
                                sx={{
                                    color: (theme) =>
                                        theme.palette.primary.light,
                                }}
                            >
                                <Box sx={{
                                    display: 'flex',
                                    gap: '10px'
                                }}>
                                    <Button
                                        onClick={() => handleClickTodo(todo)}
                                        variant={"contained"}
                                    >
                                        edit
                                    </Button>
                                    <Button
                                        color='warning'
                                        variant={"contained"}
                                        onClick={() => deleteTodo(todo)}
                                    >
                                        delete
                                    </Button>
                                </Box>
                            </TableCell>
                        </TableRow>
                    );
                })}
            </TableBody>
        </Table>
    );
};
