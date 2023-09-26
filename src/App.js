import React from "react";
import classes from "./App.module.css";
import Recipes from "./components/Recipes/Recipes";
import ThemeBar from "./components/Theme/ThemeBar";
// import Bookmarks from "./components/Bookmarks/Bookmarks";
// import AddRecipe from "./components/AddRecipe/AddRecipe";
import Recipe from "./components/Recipe/Recipe";

function App() {
  return (
    <div className={classes.content}>
      <div className={classes.mainContent}>
        <h1>Search Your Dishes</h1>
        <hr />
        <Recipes />
        <hr />
        <Recipe />
        <hr />
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
