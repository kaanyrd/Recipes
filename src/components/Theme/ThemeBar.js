import React, { useContext, useState } from "react";
import classes from "./ThemeBar.module.css";
import PaletteIcon from "@mui/icons-material/Palette";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ThemeContext from "../../context/ThemeContext";

function ThemeBar(props) {
  const { theme, setTheme } = useContext(ThemeContext);
  const [themeBar, setThemeBar] = useState(false);

  const onChangeTheme = (theme) => {
    setTheme(theme);
  };

  const onOpenHandler = () => {
    setThemeBar(true);
  };

  const onCloseHandler = () => {
    setThemeBar(false);
  };

  return (
    <div className={props.className}>
      {!themeBar && (
        <PaletteIcon
          fontSize="large"
          onClick={onOpenHandler}
          className={`${classes.paletteIcon} ${
            theme === "blue" ? classes.paletteIconBlue : undefined
          } ${theme === "green" ? classes.paletteIconGreen : undefined} ${
            theme === "black" ? classes.paletteIconBlack : undefined
          }`}
        />
      )}
      {themeBar && (
        <div
          className={`${classes.colors} ${
            theme === "green" ? classes.colorsGreen : undefined
          } ${theme === "blue" ? classes.colorsBlue : undefined} ${
            theme === "black" ? classes.colorsBlack : undefined
          }`}
        >
          <ArrowRightIcon
            className={`${classes.icon} ${
              theme === "black" ? classes.iconBlack : undefined
            } ${theme === "blue" ? classes.iconBlue : undefined} ${
              theme === "green" ? classes.iconGreen : undefined
            }`}
            onClick={onCloseHandler}
          />
          <div className={classes.colorButtons}>
            <span
              onClick={() => onChangeTheme("black")}
              className={classes.black}
            ></span>
            <span
              onClick={() => onChangeTheme("tomato")}
              className={classes.red}
            ></span>
            <span
              onClick={() => onChangeTheme("blue")}
              className={classes.blue}
            ></span>
            <span
              onClick={() => onChangeTheme("green")}
              className={classes.green}
            ></span>
          </div>
        </div>
      )}
    </div>
  );
}

export default ThemeBar;
