import React from "react";
import classes from "./App.module.css";
import Recipes from "./components/Recipes/Recipes";
import ThemeBar from "./components/Theme/ThemeBar";
// import Bookmarks from "./components/Bookmarks/Bookmarks";
// import AddRecipe from "./components/AddRecipe/AddRecipe";

function App() {
  return (
    <div className={classes.content}>
      <div className={classes.mainContent}>
        <h3 className={classes.title}>Search Your Dishes</h3>
        <Recipes />
        <ThemeBar className={classes.themeBar} />
        {/* <hr />
        <Bookmarks />
        <hr />
        <AddRecipe /> */}
      </div>
    </div>
  );
}

export default App;
