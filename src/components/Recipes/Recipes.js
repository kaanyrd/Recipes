import React, { useEffect, useState } from "react";

function Recipes() {
  const key = "c7f4236f-e4eb-494d-b195-a22e58455ebd";
  const [recipes, setRecipes] = useState([]);
  const [searchValidity, setSearchValidity] = useState(false);
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState("");
  const [inputValidity, setInputValidity] = useState(false);

  const onInputChangeHandler = (e) => {
    setRecipe(e.target.value);
  };

  const searchRecipe = async (e) => {
    e.preventDefault();
    if (recipe.trim().length === 0) {
      setInputValidity(true);
    } else {
      try {
        setLoading(true);
        const response = await fetch(
          `https://forkify-api.herokuapp.com/api/v2/recipes?search=${recipe.trim()}&key=${key}`
        );
        if (!response.status) {
          console.error("An error has occured !");
        }
        const data = await response.json();
        if (data.results === 0) {
          setSearchValidity(true);
        }
        setLoading(true);
        setRecipes(data.data.recipes);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setRecipe("");
        setInputValidity(false);
      }
    }
  };

  const onBlurHandler = () => {
    if (!recipes.length > 0) {
      setInputValidity(true);
    }
  };

  useEffect(() => {
    if (recipe.trim().length > 0) {
      setInputValidity(false);
      return;
    }
  }, [recipe]);

  return (
    <div>
      <form onSubmit={searchRecipe}>
        <label>Your Food</label>
        <p>{inputValidity && "Input can not be empty!"}</p>
        <input
          type="text"
          onBlur={onBlurHandler}
          onChange={onInputChangeHandler}
          value={recipe}
        />
        <button type="submit">Search!</button>
      </form>

      {recipes?.length === 0 && !searchValidity && !loading && (
        <h1>Search your food</h1>
      )}
      {recipes?.length === 0 && searchValidity && !loading && (
        <h1>Couldn't find your food</h1>
      )}
      {recipes?.length > 0 &&
        !searchValidity &&
        !loading &&
        recipes?.map((data) => <li key={data.id}>{data.title}</li>)}
      {loading && <h1>Loading...</h1>}
    </div>
  );
}

export default Recipes;
