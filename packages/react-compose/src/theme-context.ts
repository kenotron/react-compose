import { createContext, useContext } from "react";

import { BlankTheme, Theme } from "./theme";

export const ThemeContext = createContext<Theme>(BlankTheme);
export const useTheme = () => useContext(ThemeContext);
