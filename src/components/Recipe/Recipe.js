import React, { useContext, useEffect, useState } from "react";
import classes from "./Recipe.module.css";
import TimerIcon from "@mui/icons-material/Timer";
import PeopleIcon from "@mui/icons-material/People";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import DoneIcon from "@mui/icons-material/Done";
import Loading from "../Modeling/Loading";
import ThemeContext from "../../context/ThemeContext";
import BooksContext from "../../context/BooksContext";

function Recipe(props) {
  const { theme } = useContext(ThemeContext);
  const { bookmarks, setBookmarks } = useContext(BooksContext);
  const [ingredients, setIngredients] = useState([]);
  const [star, setStar] = useState(false);
  const [initialStar, setInitialStar] = useState(undefined);

  useEffect(() => {
    setIngredients([]);
    for (let i = 0; i < props.recipe.ingredients?.length; i++) {
      setIngredients((prev) => [...prev, props.recipe.ingredients[i]]);
    }
  }, [props]);

  const onCloseHandler = () => {
    props.setRecipeSelf([]);
    props.setActiveListItem([]);
  };

  const addBookmarkHandler = (data) => {
    const control = bookmarks.find((item) => item.id === data.id);
    if (control === undefined) {
      setBookmarks((prevState) => [...prevState, data]);
      setStar(true);
    } else {
      setBookmarks(bookmarks.filter((item) => item.id !== data.id));
      setStar(false);
    }
  };

  useEffect(() => {
    const control = bookmarks.find((item) => item.id === props.recipe.id);
    if (control === undefined) {
      setInitialStar(false);
    } else {
      setInitialStar(true);
    }
  }, [bookmarks, props.recipe.id]);

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  console.log(`Star: ${star}  / / InitialStar: ${initialStar}`);

  return (
    <div
      className={`${classes.content} ${
        theme === "black" ? classes.contentBlack : undefined
      } ${theme === "blue" ? classes.contentBlue : undefined} ${
        theme === "green" ? classes.contentGreen : undefined
      }`}
    >
      {props.loading && (
        <div className={classes.loading}>
          <Loading />
        </div>
      )}
      {!props.loading && props.recipe && (
        <div className={classes.recipeSelf}>
          <div onClick={onCloseHandler} className={classes.background}></div>
          {/* <div
            className={`${classes.recipeSelfContent} ${
              theme === "blue" ? classes.recipeSelfContentBlue : undefined
            } ${
              theme === "green" ? classes.recipeSelfContentGreen : undefined
            } ${
              theme === "black" ? classes.recipeSelfContentBlack : undefined
            }`}
          > */}
          {props.recipe.length === 0 ? null : (
            <div
              className={`${classes.recipeSelfContent} ${
                theme === "blue" ? classes.recipeSelfContentBlue : undefined
              } ${
                theme === "green" ? classes.recipeSelfContentGreen : undefined
              } ${
                theme === "black" ? classes.recipeSelfContentBlack : undefined
              }`}
            >
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
                  onClick={() => addBookmarkHandler(props.recipe)}
                  className={`${classes.starIcon} ${
                    initialStar && classes.starIconActive
                  }`}
                >
                  {initialStar && <BookmarkAddedIcon fontSize="large" />}
                  {!initialStar && <BookmarkIcon fontSize="large" />}
                </div>
                <div className={classes.more}>
                  <a target="blank" href={props.recipe.source_url}>
                    for cooking...
                  </a>
                </div>
              </div>
              <div className={classes.cardBottom}>
                <div className={classes.bottomTop}>
                  <div
                    className={`${classes.aboutDish} ${
                      theme === "black" ? classes.aboutDishBlack : undefined
                    } ${
                      theme === "green" ? classes.aboutDishGreen : undefined
                    } ${theme === "blue" ? classes.aboutDishBlue : undefined}`}
                  >
                    <strong>{props.recipe.title}</strong>
                    <p>({props.recipe.publisher})</p>
                  </div>
                  <h4
                    className={`${classes.ingredientsTitle} ${
                      theme === "black"
                        ? classes.ingredientsTitleBlack
                        : undefined
                    } ${
                      theme === "green"
                        ? classes.ingredientsTitleGreen
                        : undefined
                    } ${
                      theme === "blue"
                        ? classes.ingredientsTitleBlue
                        : undefined
                    }`}
                  >
                    Ingredients
                  </h4>
                </div>
                <div className={classes.overflow}>
                  <ul
                    className={`${classes.list} ${
                      theme === "black" ? classes.listBlack : undefined
                    } ${theme === "green" ? classes.listGreen : undefined} ${
                      theme === "blue" ? classes.listBlue : undefined
                    }`}
                  >
                    {ingredients.map((data, index) => (
                      <li
                        className={`${classes.ingredient} ${
                          theme === "black"
                            ? classes.ingredientBlack
                            : undefined
                        } ${
                          theme === "green"
                            ? classes.ingredientGreen
                            : undefined
                        } ${
                          theme === "blue" ? classes.ingredientBlue : undefined
                        }`}
                        key={index}
                      >
                        <DoneIcon
                          className={`${classes.doneIcon} ${
                            theme === "black"
                              ? classes.doneIconBlack
                              : undefined
                          } ${
                            theme === "blue" ? classes.doneIconBlue : undefined
                          } ${
                            theme === "green"
                              ? classes.doneIconGreen
                              : undefined
                          }`}
                        />
                        <p>
                          {index + 1}-+
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
          {/* </div> */}
        </div>
      )}
    </div>
  );
}

export default Recipe;
