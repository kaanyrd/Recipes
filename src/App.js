import React, { useContext, useState } from "react";
import classes from "./App.module.css";
import Recipes from "./components/Recipes/Recipes";
import ThemeBar from "./components/Theme/ThemeBar";
import ThemeContext from "./context/ThemeContext";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Bookmarks from "./components/Bookmarks/Bookmarks";
// import Bookmarks from "./components/Bookmarks/Bookmarks";
// import AddRecipe from "./components/AddRecipe/AddRecipe";

function App() {
  const { theme } = useContext(ThemeContext);
  const [bookmarkModeling, setBookmarkModeling] = useState(false);

  return (
    <div
      className={`${classes.content} ${
        theme === "black" ? classes.contentBlack : undefined
      } ${theme === "blue" ? classes.contentBlue : undefined} ${
        theme === "green" ? classes.contentGreen : undefined
      }`}
    >
      <div className={classes.mainContent}>
        <h3
          className={`${classes.title} ${
            theme === "black" ? classes.titleBlack : undefined
          } ${theme === "green" ? classes.titleGreen : undefined} ${
            theme === "blue" ? classes.titleBlue : undefined
          }`}
        >
          Search Your Dishes
        </h3>
        <Recipes />
        <ThemeBar className={classes.themeBar} />
        {/*
        <hr />
        <AddRecipe /> */}
      </div>
      <div
        onClick={setBookmarkModeling}
        className={`${classes.bookmark} ${
          theme === "black" ? classes.bookmarkBlack : undefined
        } ${theme === "blue" ? classes.bookmarkBlue : undefined} ${
          theme === "green" ? classes.bookmarkGreen : undefined
        }`}
      >
        <BookmarkIcon />
      </div>
      {bookmarkModeling && (
        <Bookmarks setBookmarkModeling={setBookmarkModeling} />
      )}
    </div>
  );
}

export default App;
