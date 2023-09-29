import React, { useContext } from "react";
import classes from "./ErrorModeling.module.css";
import ThemeContext from "../../context/ThemeContext";

function ErrorModeling(props) {
  const { theme } = useContext(ThemeContext);

  const closeErrorHandler = () => {
    props.setErrorModeling([]);
  };

  return (
    <div>
      <div onClick={closeErrorHandler} className={classes.background}></div>
      <div className={classes.error}>
        <div
          className={`${classes.errorContent} ${
            theme === "green" ? classes.errorContentGreen : undefined
          } ${theme === "black" ? classes.errorContentBlack : undefined} ${
            theme === "blue" ? classes.errorContentBlue : undefined
          }`}
        >
          <div
            className={`${classes.borderLine} ${
              theme === "black" ? classes.borderLineBlack : undefined
            } ${theme === "green" ? classes.borderLineGreen : undefined} ${
              theme === "blue" ? classes.borderLineBlue : undefined
            }`}
          >
            <h2>{props.error[0].title}</h2>
            <h3>{props.error[0].message}</h3>
            <button
              className={`${classes.button} ${
                theme === "blue" ? classes.buttonBlue : undefined
              } ${theme === "black" ? classes.buttonBlack : undefined} ${
                theme === "green" ? classes.buttonGreen : undefined
              }`}
              onClick={closeErrorHandler}
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ErrorModeling;
