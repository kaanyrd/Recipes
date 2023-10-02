import { createContext, useState } from "react";

const BooksContext = createContext();

export const BooksContextProvider = ({ children }) => {
  const localData = localStorage.getItem("bookmarks");
  const storageData = JSON.parse(localData);

  const [bookmarks, setBookmarks] = useState(storageData || []);
  const data = {
    bookmarks,
    setBookmarks,
  };

  return <BooksContext.Provider value={data}>{children}</BooksContext.Provider>;
};

export default BooksContext;
