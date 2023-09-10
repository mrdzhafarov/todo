import { Box, ThemeProvider, CssBaseline } from "@mui/material";
import HomePage from "pages/home";
import { createContext, useCallback, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeModeType, theme } from "theme";

export const ThemeContext = createContext<{
    mode: ThemeModeType;
    switchTheme: () => void;
}>({
    mode: "dark",
    switchTheme: () => {},
});

function App() {
    const [mode, setMode] = useState<ThemeModeType>("dark");

    const t = useMemo(() => {
        return theme({ mode });
    }, [mode]);

    const switchTheme = useCallback(() => {
        if (mode === "dark") setMode("light");
        else setMode("dark");
    }, [mode, setMode]);
    return (
        <ThemeProvider theme={t}>
            <ThemeContext.Provider
                value={{
                    switchTheme,
                    mode,
                }}
            >
                <Box
                    sx={{
                        backgroundColor: (theme) => theme.palette.primary.main,
                        height: '100vh'
                    }}
                >
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<HomePage />} />
                        </Routes>
                    </BrowserRouter>
                </Box>
            </ThemeContext.Provider>
            <CssBaseline />
        </ThemeProvider>
    );
}

export default App;
