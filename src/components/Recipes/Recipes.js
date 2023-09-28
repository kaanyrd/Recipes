import React, { useState } from "react";
import ReactDOM from "react-dom";
import Recipe from "../Recipe/Recipe";
import classes from "./Recipes.module.css";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import ErrorModeling from "../Modeling/ErrorModeling";

function Recipes(props) {
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
      // console.log(data);
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

  // <p>{recipes.length === 0 ? null : <div>Recipes: {recipes.length}</div>}</p>;
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

  return (
    <div className={classes.main}>
      <div className={classes.formSide}>
        <form className={classes.form} onSubmit={searchRecipe}>
          <input
            placeholder="Over 1.000.000 recipes..."
            type="text"
            onChange={onInputChangeHandler}
            value={recipe}
          />
          <button type="submit">
            <RestaurantIcon />
          </button>
        </form>
      </div>
      <div className={classes.contentLayout}>
        <div className={classes.list}>
          <ul className={classes.listSelf}>
            {getRecipesForCurrentPage().map((data) => (
              <div
                className={`${classes.card} ${
                  activeListItem === data.id ? classes.activeCard : null
                }`}
                key={data.id}
                onClick={() => handleId(data.id)}
              >
                <li className={classes.paragraph}>
                  <strong>{data.title}</strong>
                </li>
                <img
                  className={classes.img}
                  src={data.image_url}
                  alt={data.title}
                />
                <p className={classes.publisher}>{data.publisher}</p>
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
                  className={
                    index + 1 === currentPage ? classes.activePage : ""
                  }
                >
                  {index + 1}
                </button>
              )
            )}
          </div>
        </div>
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
        </div>
      </div>
      {errorModeling.length !== 0 &&
        ReactDOM.createPortal(
          <ErrorContent />,
          document.getElementById("errorModeling")
        )}
    </div>
  );
}

export default Recipes;
