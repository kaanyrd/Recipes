import React, { useContext, useState } from "react";
import classes from "./App.module.css";
import Recipes from "./components/Recipes/Recipes";
import ThemeBar from "./components/Theme/ThemeBar";
import ThemeContext from "./context/ThemeContext";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import Bookmarks from "./components/Bookmarks/Bookmarks";
import ReactDOM from "react-dom";
// import AddRecipe from "./components/AddRecipe/AddRecipe";

function App() {
  const { theme } = useContext(ThemeContext);
  const [bookmarkModeling, setBookmarkModeling] = useState(false);

  let BookmarkModel = () => {
    return <Bookmarks setBookmarkModeling={setBookmarkModeling}></Bookmarks>;
  };

  return (
    <div
      className={`${classes.content} ${
        theme === "black" ? classes.contentBlack : undefined
      } ${theme === "blue" ? classes.contentBlue : undefined} ${
        theme === "green" ? classes.contentGreen : undefined
      }`}
    >
      <div className={classes.mainContent}>
        <Recipes
          bookmarkModeling={bookmarkModeling}
          setBookmarkModeling={setBookmarkModeling}
        />
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
        <BookmarkIcon fontSize="large" />
      </div>
      {bookmarkModeling &&
        ReactDOM.createPortal(
          <BookmarkModel />,
          document.getElementById("bookmarkModeling")
        )}
    </div>
  );
}

export default App;
