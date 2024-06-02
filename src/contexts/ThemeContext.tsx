"use client";

import { createContext, useContext, ReactNode } from "react";

type Theme = {
    colors: {
        primary: string;
        secondary: string;
    };
};

const defaultTheme: Theme = {
    colors: {
        primary: "#007bff",
        secondary: "#6c757d",
    },
};

const ThemeContext = createContext<Theme>(defaultTheme);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    return (
        <ThemeContext.Provider value={defaultTheme}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => useContext(ThemeContext);
