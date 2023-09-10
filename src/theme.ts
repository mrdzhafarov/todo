import { createTheme } from "@mui/material";

export type ThemeModeType = "dark" | "light";

const getColor = (mode: ThemeModeType) => mode === "dark" ? "#fff" : "#232323"
export const theme = ({ mode }: { mode: ThemeModeType }) =>
    createTheme({
        palette: {
            primary: {
                main: mode === "dark" ? "#121212" : "#fff",
                light: mode === 'dark' ? '#fff' : '#232323',
                dark: mode === 'dark' ? '#232323' : '#fff'
            },
        },
        components: {
            MuiInputBase: {
                styleOverrides: {
                    root: {
                        "&.MuiInputBase-root": {
                            color: getColor(mode),
                            '& .MuiOutlinedInput-notchedOutline': {
                                borderColor: getColor(mode)
                            },
                            "&.Mui-focused": {
                                "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#909090",
                                    borderWidth: "1px",
                                },
                            },
                        },
                    },
                },
            },
            MuiFormControl: {
                styleOverrides: {
                    root: {
                        '&.MuiFormControl-root': {
                            '& .MuiFormLabel-root': {
                                color: getColor(mode)
                            }
                        }
                    }
                }
            },
            MuiMenu: {
                styleOverrides: {
                    root: {
                        '& .MuiPaper-root': {
                            backgroundColor: mode === 'dark' ? '#232323' : '#fff',
                            '& .MuiMenuItem-root': {
                                color: mode === 'dark' ? '#fff' : '#121212'
                            }
                        }
                    }
                }
            }
        },
    });
