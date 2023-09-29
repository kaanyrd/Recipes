import { createContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const initialTheme = localStorage.getItem("theme");

  const [theme, setTheme] = useState(initialTheme || "tomato");

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const data = {
    theme,
    setTheme,
  };

  return <ThemeContext.Provider value={data}>{children}</ThemeContext.Provider>;
};

export default ThemeContext;
