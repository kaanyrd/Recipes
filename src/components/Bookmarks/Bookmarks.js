import React, { useContext, useEffect } from "react";
import classes from "./Bookmarks.module.css";
import CloseIcon from "@mui/icons-material/Close";
import BookmarkRemoveIcon from "@mui/icons-material/BookmarkRemove";
import ThemeContext from "../../context/ThemeContext";
import BooksContext from "../../context/BooksContext";

function Bookmarks(props) {
  const { theme } = useContext(ThemeContext);
  const { bookmarks, setBookmarks } = useContext(BooksContext);

  const onCloseModeling = () => {
    props.setBookmarkModeling(false);
  };

  const onDeleteHandler = (comingId) => {
    setBookmarks(bookmarks.filter((item) => item.id !== comingId));
  };

  useEffect(() => {
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

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
          {(bookmarks === null && (
            <h4 className={classes.info}>There are no bookmarks...</h4>
          )) ||
            (bookmarks.length === 0 && (
              <h4
                className={`${classes.info} ${
                  theme === "black" ? classes.infoBlack : undefined
                } ${theme === "blue" ? classes.infoBlue : undefined} ${
                  theme === "green" ? classes.infoGreen : undefined
                }`}
              >
                There aren't any bookmkars
              </h4>
            ))}
          {bookmarks?.map((data, index) => (
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
                <div onClick={() => onDeleteHandler(data.id)}>
                  <BookmarkRemoveIcon
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
