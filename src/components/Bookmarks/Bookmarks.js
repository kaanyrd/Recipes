import React from "react";
import classes from "./Bookmarks.module.css";

function Bookmarks(props) {
  const onCloseModeling = () => {
    props.setBookmarkModeling(false);
  };

  return (
    <div>
      <div onClick={onCloseModeling} className={classes.background}></div>
      <div className={classes.bookmarkContent}>
        <h2>Bookmarks</h2>
        <button onClick={onCloseModeling}>Close</button>
      </div>
    </div>
  );
}

export default Bookmarks;
