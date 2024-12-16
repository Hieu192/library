import React, { useEffect } from "react";
import "./Allbooks.css";
import { useSelector, useDispatch } from "react-redux";
import { FetchBooks } from "../redux/slices/app";
function Allbooks() {
  const dispatch = useDispatch();
  const { books } = useSelector((state) => state.app);
  useEffect(() => {
    dispatch(FetchBooks());
  }, []);

  return (
    <div className="books-page">
      <div className="books">
        {books.map((book) => {
          return (
            <div key={book._id} className="book-card">
              <img src={book.image[0].url} alt=""></img>
              <p className="bookcard-title">{book.bookName}</p>
              <p className="bookcard-author">{book.author}</p>
              <div className="bookcard-category">
                <p>{book.categories[0].categoryName}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Allbooks;
