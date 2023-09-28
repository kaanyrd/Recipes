import React, { useEffect, useState } from "react";
import classes from "./Recipe.module.css";
import TimerIcon from "@mui/icons-material/Timer";
import PeopleIcon from "@mui/icons-material/People";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import DoneIcon from "@mui/icons-material/Done";

function Recipe(props) {
  const [ingredients, setIngredients] = useState([]);
  const [star, setStar] = useState(false);

  useEffect(() => {
    setIngredients([]);
    for (let i = 0; i < props.recipe.ingredients?.length; i++) {
      setIngredients((prev) => [...prev, props.recipe.ingredients[i]]);
    }
  }, [props]);

  const onCloseHandler = () => {
    props.setRecipeSelf([]);
  };

  const onStarHandler = () => {
    setStar((prevState) => !prevState);
  };

  return (
    <div className={classes.recipeSelf}>
      <div onClick={onCloseHandler} className={classes.background}></div>
      <div className={classes.recipeSelfContent}>
        {props.recipe.length === 0 ? null : (
          <div>
            <div className={classes.imgSide}>
              <img
                className={classes.img}
                src={props.recipe.image_url}
                alt={props.recipe.title}
              />
              <button className={classes.closeBtn} onClick={onCloseHandler}>
                <CloseIcon />
              </button>
              <div className={classes.cookingInfo}>
                <p>
                  <TimerIcon />
                  {props.recipe.cooking_time} mins
                </p>
                <p> / </p>
                <p>
                  <PeopleIcon /> {props.recipe.servings}
                </p>
              </div>
              <div
                onClick={onStarHandler}
                className={`${classes.starIcon} ${
                  star && classes.starIconActive
                }`}
              >
                {star ? <BookmarkAddedIcon /> : <BookmarkIcon />}
              </div>
              <div className={classes.more}>
                <a target="blank" href={props.recipe.source_url}>
                  detail...
                </a>
              </div>
            </div>
            <div className={classes.cardBottom}>
              <div className={classes.aboutDish}>
                <strong>{props.recipe.title}</strong>
                <p>({props.recipe.publisher})</p>
              </div>
              <div>
                <h3 className={classes.ingredientsTitle}>Ingredients</h3>
                <ul className={classes.list}>
                  {ingredients.map((data, index) => (
                    <li className={`${classes.ingredient}`} key={index}>
                      <DoneIcon className={classes.doneIcon} />
                      <p>
                        {data.description ? data.description : "-"}(
                        {data.quantity ? data.quantity : null}
                        {data.unit ? data.unit : null})
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipe;
