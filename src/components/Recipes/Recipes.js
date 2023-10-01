import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import Recipe from "../Recipe/Recipe";
import classes from "./Recipes.module.css";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ErrorModeling from "../Modeling/ErrorModeling";
import ThemeContext from "../../context/ThemeContext";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { Bookmarks } from "@mui/icons-material";

function Recipes(props) {
  const { theme } = useContext(ThemeContext);
  const key = "c7f4236f-e4eb-494d-b195-a22e58455ebd";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const getRecipesForCurrentPage = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return recipes.slice(startIndex, endIndex);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const [recipes, setRecipes] = useState([]);
  const [recipe, setRecipe] = useState("");
  const [errorModeling, setErrorModeling] = useState([]);
  const [activeListItem, setActiveListItem] = useState(undefined);

  const onInputChangeHandler = (e) => {
    setRecipe(e.target.value);
  };

  const searchRecipe = async (e) => {
    e.preventDefault();
    if (recipe.trim().length === 0) {
      setErrorModeling([
        { title: "Empty searching!", message: "Your input was empty" },
      ]);
      return;
    }
    try {
      setErrorModeling([]);
      setCurrentPage(1);
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipe.trim()}&key=${key}`
      );
      if (!response.status) {
        console.error("An error has occured !");
      }
      const data = await response.json();
      if (data.results === 0) {
        setErrorModeling([
          {
            title: "Invalid Searching!",
            message: "Your recipe could't find",
          },
        ]);
        return;
      }
      setRecipes(data.data.recipes);
    } catch (error) {
      console.log(error);
    } finally {
      setRecipe("");
    }
  };
  const [recipeSelf, setRecipeSelf] = useState([]);
  const [selfLoading, setSelfLoading] = useState(false);

  const handleId = async (recipeId) => {
    setActiveListItem(recipeId);
    try {
      setSelfLoading(true);
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
      );
      const data = await response.json();
      setRecipeSelf(data.data.recipe);
    } catch (error) {
      throw new Error("Could not reach [...Food Name...] Recipe !");
    } finally {
      setSelfLoading(false);
    }
  };

  let RecipeContent = () => {
    return (
      <div className={classes.mobil}>
        <Recipe
          setActiveListItem={setActiveListItem}
          loading={selfLoading}
          recipe={recipeSelf}
          setRecipeSelf={setRecipeSelf}
        />
        ;
      </div>
    );
  };
  let ErrorContent = () => {
    return (
      <div>
        <ErrorModeling
          error={errorModeling}
          setErrorModeling={setErrorModeling}
        />
      </div>
    );
  };

  const onBookmarkOpen = () => {
    props.setBookmarkModeling(true);
  };

  return (
    <div className={classes.main}>
      <div
        className={`${classes.formSide} ${
          theme === "green" ? classes.formSideGreen : undefined
        } ${theme === "black" ? classes.formSideBlack : undefined} ${
          theme === "blue" ? classes.formSideBlue : undefined
        }`}
      >
        <h3 style={{ color: "white" }}>Your Recipe</h3>
        <form className={classes.form} onSubmit={searchRecipe}>
          <input
            className={`${classes.input} ${
              theme === "black" ? classes.inputBlack : undefined
            } ${theme === "blue" ? classes.inputBlue : undefined} ${
              theme === "green" ? classes.inputGreen : undefined
            }`}
            placeholder="Over 1.000.000 recipes..."
            type="text"
            onChange={onInputChangeHandler}
            value={recipe}
          />
          <button
            className={`${classes.button} ${
              theme === "green" ? classes.buttonGreen : undefined
            } ${theme === "blue" ? classes.buttonBlue : undefined} ${
              theme === "black" ? classes.buttonBlack : undefined
            }`}
            type="submit"
          >
            <RestaurantIcon />
          </button>
        </form>
        <div
          onClick={onBookmarkOpen}
          className={`${classes.formBookmarkSide} ${
            theme === "black" ? classes.formBookmarkSideBlack : undefined
          } ${theme === "green" ? classes.formBookmarkSideGreen : undefined} ${
            theme === "blue" ? classes.formBookmarkSideBlue : undefined
          }`}
        >
          <BookmarkIcon />
        </div>
      </div>
      {recipes.length === 0 && (
        <h3
          className={`${classes.entryInfo} ${
            theme === "black" ? classes.entryInfoBlack : undefined
          } ${theme === "green" ? classes.entryInfoGreen : undefined} ${
            theme === "blue" ? classes.entryInfoBlue : undefined
          }`}
        >
          <em>Search your menu for today...</em>
        </h3>
      )}
      <div className={recipes.length !== 0 && classes.contentLayout}>
        {recipes.length !== 0 && (
          <div
            className={`${classes.list} ${
              theme === "green" ? classes.listGreen : undefined
            } ${theme === "blue" ? classes.listBlue : undefined} ${
              theme === "black" ? classes.listBlack : undefined
            }`}
          >
            <ul className={classes.listSelf}>
              {getRecipesForCurrentPage().map((data) => (
                <div
                  className={`${`${classes.card} ${
                    theme === "blue" ? classes.cardBlue : undefined
                  } ${theme === "black" ? classes.cardBlack : undefined} `} ${
                    activeListItem === data.id ? classes.activeCard : null
                  } ${theme === "green" ? classes.cardGreen : undefined}`}
                  key={data.id}
                  onClick={() => handleId(data.id)}
                >
                  <li className={classes.paragraph}>
                    <strong>{data.title}</strong>
                  </li>
                  <div className={classes.imgOverflow}>
                    <img
                      className={classes.img}
                      src={data.image_url}
                      alt={data.title}
                    />
                  </div>
                  <p className={classes.publisher}>
                    <strong>{data.publisher}</strong>
                  </p>
                </div>
              ))}
            </ul>

            <div className={classes.pagination}>
              {Array.from(
                { length: Math.ceil(recipes.length / itemsPerPage) },
                (_, index) => (
                  <button
                    key={index}
                    onClick={() => handlePageChange(index + 1)}
                    className={`${
                      index + 1 === currentPage
                        ? classes.activePage
                        : classes.nonactive
                    } ${classes.pagButton} ${
                      theme === "blue" ? classes.pagButtonBlue : undefined
                    } ${
                      theme === "black" ? classes.pagButtonBlack : undefined
                    } ${
                      theme === "green" ? classes.pagButtonGreen : undefined
                    }`}
                  >
                    {index + 1}
                  </button>
                )
              )}
            </div>
          </div>
        )}
        <div>
          {recipeSelf.length !== 0 &&
            ReactDOM.createPortal(
              <RecipeContent />,
              document.getElementById("recipe")
            )}
          {recipeSelf.length !== 0 && (
            <Recipe
              setActiveListItem={setActiveListItem}
              loading={selfLoading}
              recipe={recipeSelf}
              setRecipeSelf={setRecipeSelf}
            />
          )}
          {recipes.length !== 0 && recipeSelf.length === 0 && (
            <div className={classes.anyFood}>
              <h2
                className={`${classes.clickableInfo} ${
                  theme === "black" ? classes.clickableInfoBlack : undefined
                } ${theme === "blue" ? classes.clickableInfoBlue : undefined} ${
                  theme === "green" ? classes.clickableInfoGreen : undefined
                }`}
              >
                Click to any recipe...
              </h2>
            </div>
          )}
        </div>
      </div>
      {errorModeling.length !== 0 &&
        ReactDOM.createPortal(
          <ErrorContent />,
          document.getElementById("errorModeling")
        )}
      {props.bookmarkModeling &&
        ReactDOM.createPortal(
          <Bookmarks />,
          document.getElementById("bookmarkModeling")
        )}
    </div>
  );
}

export default Recipes;
