import React, { useState } from "react";
import Recipe from "../Recipe/Recipe";

function Recipes() {
  const key = "c7f4236f-e4eb-494d-b195-a22e58455ebd";
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
    // console.log(recipeId);
    try {
      const response = await fetch(
        `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}`
      );
      const data = await response.json();
      // console.log(data.data.recipe);
      setRecipeSelf(data.data.recipe);
    } catch (error) {
      throw new Error("Could not reach [...Food Name...] Recipe !");
    } finally {
    }
  };

  return (
    <div>
      <form onSubmit={searchRecipe}>
        <label>Your Food</label>
        <input type="text" onChange={onInputChangeHandler} value={recipe} />
        <button type="submit">Search!</button>
      </form>

      {recipes?.length === 0 && !loading && <h1>Search your food</h1>}
      <ul>
        {recipes?.length > 0 &&
          !loading &&
          recipes?.map((data) => (
            <div onClick={() => handleId(data.id)}>
              <li key={data.id}>{data.title}</li>
              <img src={data.image_url} alt={data.title} />
              <li>{data.publisher}</li>
            </div>
          ))}
      </ul>
      {loading && <h1>Loading...</h1>}
      {/* ONE RECIPE */}
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <hr />
      <Recipe recipe={recipeSelf} />
    </div>
  );
}

export default Recipes;
