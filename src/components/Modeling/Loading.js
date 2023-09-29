import React, { useContext } from "react";
import classes from "./Loading.module.css";
import ThemeContext from "../../context/ThemeContext";

function Loading() {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`${classes.loading} ${
        theme === "black" ? classes.loadingBlack : undefined
      } ${theme === "green" ? classes.loadingGreen : undefined} ${
        theme === "blue " ? classes.loadingBlue : undefined
      }`}
    ></div>
  );
}

export default Loading;
