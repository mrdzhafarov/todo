import { useContext, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Box, TextField, Checkbox, Button } from "@mui/material";

import Select from "components/Select";
import ThemeSwitcher from "components/ThemeSwitcher";

import { Todo } from "entities/todo/types";

import { TodoContext } from "store";

const options = [
    { name: "Subscribert", value: "Subscribert" },
    { name: "Not Subscribert", value: "Not Subscribert" },
    { name: "Other", value: "Other" },
];

export const CreateTodoForm = () => {
    const { todoToEdit, addTodo, editTodo } = useContext(TodoContext);
    const {
        handleSubmit,
        formState: { errors },
        control,
        setValue,
        reset
    } = useForm<Todo>();

    const submit = (data: Todo) => {
        if (todoToEdit) {
            editTodo({...data, id: todoToEdit.id});
        } else addTodo(data);
    };

    useEffect(() => {
        if (todoToEdit) {
            setValue("age", todoToEdit.age);
            setValue("name", todoToEdit.name);
            setValue("isSubscribed", todoToEdit.isSubscribed);
            setValue("isEmployed", todoToEdit.isEmployed);
        }else reset()
    }, [todoToEdit]);
    return (
        <Box
            component={"form"}
            onSubmit={handleSubmit(submit)}
            sx={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                minWidth: "350px",
                backgroundColor: (theme) => theme.palette.primary.dark,
                borderRadius: "5px",
                boxShadow: "1px 1px 20px #121212",
            }}
        >
            <Controller
                control={control}
                name="name"
                rules={{
                    required: true,
                }}
                render={({ field: { value, ...rest } }) => {
                    return (
                        <TextField
                            {...rest}
                            value={value || ""}
                            label="Name"
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                        />
                    );
                }}
            />

            <Controller
                control={control}
                name="age"
                rules={{
                    required: true,
                }}
                render={({ field: { value, ...rest } }) => {
                    return (
                        <TextField
                            {...rest}
                            value={value || ""}
                            label="Age"
                            type="number"
                            error={Boolean(errors.name)}
                            helperText={errors.name?.message}
                        />
                    );
                }}
            />
            <Controller
                control={control}
                name="isSubscribed"
                rules={{
                    required: true,
                }}
                render={({ field: { onChange, onBlur, value } }) => {
                    return (
                        <Select
                            label="isSubscribed"
                            options={options}
                            onChange={(v) => onChange(v)}
                            value={value || ""}
                            onBlur={onBlur}
                            helperText={errors.isSubscribed?.message}
                            error={Boolean(errors.isSubscribed)}
                        />
                    );
                }}
            />
            <Box
                sx={{ color: (theme) => theme.palette.primary.light }}
                component={"label"}
            >
                <Controller
                    control={control}
                    name={"isEmployed"}
                    render={({ field: { onChange, value } }) => (
                        <Checkbox
                            onChange={(e) => onChange(e.currentTarget.checked)}
                            checked={Boolean(value)}
                            color="success"
                        />
                    )}
                />
                Employed
            </Box>
            <Button type="submit" size="large" variant="contained">
                Insert
            </Button>
            <Box
                sx={{
                    width: "80%",
                    height: "2px",
                    backgroundColor: "#909090",
                    margin: "20px auto",
                }}
            ></Box>

            <ThemeSwitcher />

            <Button onClick={() => {
                reset()
                editTodo()
            }} size="large" variant="contained">
                Delete
            </Button>
        </Box>
    );
};
