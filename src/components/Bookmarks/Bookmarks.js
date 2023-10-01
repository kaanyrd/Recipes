import React, { useContext } from "react";
import classes from "./Bookmarks.module.css";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import ThemeContext from "../../context/ThemeContext";

function Bookmarks(props) {
  const { theme } = useContext(ThemeContext);
  const localStorageData = localStorage.getItem("bookmarks");
  const data = JSON.parse(localStorageData);

  const onCloseModeling = () => {
    props.setBookmarkModeling(false);
  };

  return (
    <div>
      <div onClick={onCloseModeling} className={classes.background}></div>
      <div
        className={`${classes.bookmarkContent} ${
          theme === "black" ? classes.bookmarkContentBlack : undefined
        } ${theme === "blue" ? classes.bookmarkContentBlue : undefined} ${
          theme === "green" ? classes.bookmarkContentGreen : undefined
        }`}
      >
        <h3
          className={`${classes.bookmarkTitle} ${
            theme === "black" ? classes.bookmarkTitleBlack : undefined
          } ${theme === "green" ? classes.bookmarkTitleGreen : undefined} ${
            theme === "blue" ? classes.bookmarkTitleBlue : undefined
          }`}
        >
          Bookmarks
        </h3>
        <button className={classes.closeBtn} onClick={onCloseModeling}>
          <CloseIcon />
        </button>
        <ul className={classes.bookMarksList}>
          {data?.map((data, index) => (
            <div className={classes.bookmarkItem} key={index}>
              <div className={classes.imgSide}>
                <img
                  className={classes.img}
                  src={data.image_url}
                  alt={data.title}
                />
              </div>
              <div className={classes.bookMarkRightSide}>
                <div
                  className={`${classes.bookMarkRightBottom} ${
                    theme === "black"
                      ? classes.bookMarkRightBottomBlack
                      : undefined
                  } ${
                    theme === "blue"
                      ? classes.bookMarkRightBottomBlue
                      : undefined
                  } ${
                    theme === "green"
                      ? classes.bookMarkRightBottomGreen
                      : undefined
                  }`}
                >
                  <h4 className={classes.bookMarkRightTop}>
                    {index + 1}- {data.title} / ({data.publisher})
                  </h4>
                  <p>
                    ✔ {data.servings} serving - {data.cooking_time} mins -{" "}
                    <a
                      className={`${classes.link} ${
                        theme === "black" ? classes.linkBlack : undefined
                      } ${theme === "blue" ? classes.linkBlue : undefined} ${
                        theme === "green" ? classes.linkGreen : undefined
                      }`}
                      href={data.source_url}
                      target="blank"
                    >
                      For cooking Link
                    </a>
                  </p>
                </div>
                <div className={classes.removeBookmarkIcon}>
                  <BookmarkRemoveIcon />
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Bookmarks;
