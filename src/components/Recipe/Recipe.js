import React, { useEffect, useState } from "react";

function Recipe(props) {
  const [index, setIndex] = useState(0);
  const [maxIndex, setMaxIndex] = useState(null);

  useEffect(() => {
    for (let i = 0; i < props.recipe.ingredients?.length; i++) {
      // console.log(props.recipe.ingredients[i]);
      // console.log(i);
      setMaxIndex(props.recipe.ingredients.length);
    }
  }, [props]);

  console.log(maxIndex);

  const decrementIndex = () => {
    if (index === 0) {
      return;
    } else {
      setIndex(index - 1);
    }
  };

  const incrementIndex = () => {
    setIndex(index + 1);
  };
  console.log(index);

  return (
    <div>
      <hr />
      <ul>
        <h1>
          {props.recipe.title?.length !== 0 && (
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
                  <li>
                    Description:{props.recipe.ingredients?.[index]?.description}
                  </li>
                  <li>
                    Quantity: {props.recipe.ingredients?.[index].quantity}
                  </li>
                  <li>Unit: {props.recipe.ingredients?.[index].unit}</li>
                </ul>
                <button disabled={index === 0} onClick={decrementIndex}>
                  Decrement
                </button>
                <button
                  disabled={index === maxIndex - 1}
                  onClick={incrementIndex}
                >
                  Increment
                </button>
              </div>
            </div>
          )}
        </h1>
      </ul>
    </div>
  );
}

export default Recipe;
