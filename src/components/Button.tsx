import { ButtonProps } from "@mui/material";
import { Button as MuiButton } from "@mui/material";
import React from "react";
export const Button = (props: ButtonProps) => {
    return <MuiButton sx={{
        backgroundColor: theme => theme.palette.primary.dark,
        padding: '10px'
    }} {...props}></MuiButton>;
};
