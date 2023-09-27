import React, { useEffect, useState } from "react";

function Recipe(props) {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    setIngredients([]);
    for (let i = 0; i < props.recipe.ingredients?.length; i++) {
      setIngredients((prev) => [...prev, props.recipe.ingredients[i]]);
    }
  }, [props]);

  return (
    <div>
      {props.loading && <h1>Loading...</h1>}
      {!props.loading && (
        <div>
          {props.recipe.length === 0 ? null : (
            <div>
              <div>Title: {props.recipe.title}</div>
              <div>Cooking Time: {props.recipe.cooking_time} mins</div>
              <div>Servings: {props.recipe.servings}</div>
              <div>Publisher: {props.recipe.publisher}</div>
              <div>Source: {props.recipe.source_url}</div>
              <img src={props.recipe.image_url} alt={props.recipe.title} />
              <hr />
              <div>
                <h1>Ingredients</h1>
                <ul>
                  {ingredients.map((data, index) => (
                    <li key={index}>
                      *** {data.quantity} / {data.unit} / {data.description}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Recipe;
