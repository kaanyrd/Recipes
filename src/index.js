import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./context/ThemeContext";
import { BooksContextProvider } from "./context/BooksContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <BooksContextProvider>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </BooksContextProvider>
);
