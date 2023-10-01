import React, { useContext, useEffect, useState } from "react";
import classes from "./Bookmarks.module.css";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import ThemeContext from "../../context/ThemeContext";

function Bookmarks(props) {
  const { theme } = useContext(ThemeContext);
  const localStorageData = localStorage.getItem("bookmarks");
  const data = JSON.parse(localStorageData);
  const [books, setBooks] = useState(data);

  const onCloseModeling = () => {
    props.setBookmarkModeling(false);
  };

  const onDeleteHandler = (data) => {
    setBooks(books.filter((item) => item.id !== data));
    localStorage.setItem("bookmarks", JSON.stringify(books));
  };

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(books));
  }, [books]);

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

        <ul
          className={`${classes.bookMarksList} ${
            theme === "black" ? classes.bookMarksListBlack : undefined
          } ${theme === "blue" ? classes.bookMarksListBlue : undefined} ${
            theme === "green" ? classes.bookMarksListGreen : undefined
          }`}
        >
          {(books === null && (
            <h5 className={classes.info}>There aren't any bookmkars</h5>
          )) ||
            (books.length === 0 && (
              <h5
                className={`${classes.info} ${
                  theme === "black" ? classes.infoBlack : undefined
                } ${theme === "blue" ? classes.infoBlue : undefined} ${
                  theme === "green" ? classes.infoGreen : undefined
                }`}
              >
                There aren't any bookmkars
              </h5>
            ))}
          {books?.map((data, index) => (
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
                  <h5 className={classes.bookMarkRightTop}>
                    {index + 1}- {data.title}
                  </h5>
                  <small>
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
                      Cooking Link
                    </a>
                  </small>
                </div>
                <div>
                  <BookmarkRemoveIcon
                    onClick={() => onDeleteHandler(data.id)}
                    className={`${classes.removeBookmarkIcon} ${
                      theme === "black"
                        ? classes.removeBookmarkIconBlack
                        : undefined
                    } ${
                      theme === "blue"
                        ? classes.removeBookmarkIconBlue
                        : undefined
                    } ${
                      theme === "green"
                        ? classes.removeBookmarkIconGreen
                        : undefined
                    }`}
                  />
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
