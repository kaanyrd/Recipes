import React, { useState } from "react";
import classes from "./ThemeBar.module.css";
import PaletteIcon from "@mui/icons-material/Palette";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

function ThemeBar(props) {
  const [themeBar, setThemeBar] = useState(false);

  const onOpenHandler = () => {
    setThemeBar(true);
  };

  const onCloseHandler = () => {
    setThemeBar(false);
  };

  return (
    <div className={props.className}>
      {!themeBar && (
        <PaletteIcon onClick={onOpenHandler} className={classes.paletteIcon} />
      )}
      {themeBar && (
        <div className={classes.colors}>
          <ArrowRightIcon onClick={onCloseHandler} />
          <div className={classes.colorButtons}>
            <span className={classes.black}></span>
            <span className={classes.red}></span>
            <span className={classes.yellow}></span>
            <span className={classes.green}></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeBar;
