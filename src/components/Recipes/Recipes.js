import React, { useState } from "react";
import ReactDOM from "react-dom";
import Recipe from "../Recipe/Recipe";
import classes from "./Recipes.module.css";
import RestaurantIcon from "@mui/icons-material/Restaurant";

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
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState("");

  const onInputChangeHandler = (e) => {
    setRecipe(e.target.value);
  };

  const searchRecipe = async (e) => {
    e.preventDefault();
    if (recipe.trim().length === 0) {
      return;
    }
    try {
      setCurrentPage(1);
      setLoading(true);
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipe.trim()}&key=${key}`
      );
      if (!response.status) {
        console.error("An error has occured !");
      }
      const data = await response.json();
      setLoading(true);
      setRecipes(data.data.recipes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setRecipe("");
    }
  };
  const [recipeSelf, setRecipeSelf] = useState([]);

  const handleId = async (recipeId) => {
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
      );
      const data = await response.json();
      setRecipeSelf(data.data.recipe);
    } catch (error) {
      throw new Error("Could not reach [...Food Name...] Recipe !");
    } finally {
    }
  };

  // <p>{recipes.length === 0 ? null : <div>Recipes: {recipes.length}</div>}</p>;
  let RecipeContent = () => {
    return <Recipe recipe={recipeSelf} setRecipeSelf={setRecipeSelf} />;
  };

  return (
    <div className={classes.main}>
      <div className={classes.formSide}>
        <form className={classes.form} onSubmit={searchRecipe}>
          <input type="text" onChange={onInputChangeHandler} value={recipe} />
          <button type="submit">
            <RestaurantIcon />
          </button>
        </form>
      </div>
      {loading ? <h3 className={classes.loadingText}>Loading...</h3> : null}
      {!loading && recipes.length === 0 && (
        <h3 className={classes.informationText}>Over 1.000.000 recipes...</h3>
      )}
      <div className={classes.list}>
        <ul className={classes.listSelf}>
          {getRecipesForCurrentPage().map((data) => (
            <div
              className={classes.card}
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
                className={index + 1 === currentPage ? classes.activePage : ""}
              >
                {index + 1}
              </button>
            )
          )}
        </div>
      </div>
      {recipeSelf.length !== 0 &&
        ReactDOM.createPortal(
          <RecipeContent />,
          document.getElementById("recipe")
        )}
    </div>
  );
}

export default Recipes;
