import React from "react";
import classes from "./ErrorModeling.module.css";

function ErrorModeling(props) {
  const closeErrorHandler = () => {
    props.setErrorModeling([]);
  };

  return (
    <div>
      <div onClick={closeErrorHandler} className={classes.background}></div>
      <div className={classes.error}>
        <div className={classes.errorContent}>
          <h2>{props.error[0].title}</h2>
          <h3>{props.error[0].message}</h3>
          <button onClick={closeErrorHandler}>OK</button>
        </div>
      </div>
    </div>
  );
}

export default ErrorModeling;
