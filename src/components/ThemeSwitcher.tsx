import React from "react";
import MuiToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import MuiToggleButton from "@mui/material/ToggleButton";
import { styled } from "@mui/material";
import { ThemeContext } from "App";

const ToggleButtonGroup = styled(MuiToggleButtonGroup)(({ theme }) => ({
    width: "min-content",
    borderRadius: 30,
    padding: 2,
    position: "relative",
    transition: "all 300ms ease",
    backgroundColor: theme.palette.success.dark,
    border: "1px solid #cacaca",
    marginTop: "auto",

    "&::before": {
        content: '""',
        position: "absolute",
        width: 33,
        height: 26,
        borderRadius: 30,
        top: 2,
        transition: "all 300ms ease",
        left: theme.palette.mode === "light" ? 2.5 : 33.5,
    },
}));

const ToggleButton = styled(MuiToggleButton)(({ theme }) => ({
    padding: "0px",
    width: 33,
    height: 26,
    borderRadius: "30px!important",
    border: 0,
    // backgroundColor: 'transparent',

    "&.Mui-selected": {
        backgroundColor: "#121212",
        "&:hover": {
            backgroundColor: "#121212",
        },
    },
}));

const DarkModeButton = styled(ToggleButton)({});

export default React.forwardRef((props, ref) => {
    const { mode, switchTheme } = React.useContext(ThemeContext);

    return (
        <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={(event, value) => switchTheme()}
            ref={ref}
        >
            <ToggleButton value="light"></ToggleButton>
            <DarkModeButton value="dark"></DarkModeButton>
        </ToggleButtonGroup>
    );
});
