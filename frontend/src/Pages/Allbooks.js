import React, { useEffect } from "react";
import "./Allbooks.css";
import { useSelector, useDispatch } from "react-redux";
import { FetchBooks } from "../redux/slices/app";
import { Link } from "react-router-dom";
function Allbooks() {
  const dispatch = useDispatch();
  const { books, searchBooks } = useSelector((state) => state.app);
  const filterBooks = searchBooks
    ? books.filter((book) => {
        return book.bookName.toLowerCase().includes(searchBooks.toLowerCase());
      })
    : books;
  useEffect(() => {
    dispatch(FetchBooks());
  }, []);

  return (
    <div className="books-page">
      <div className="books">
        {filterBooks.map((book) => {
          return (
            <Link to={`/books/${book._id}`}>
              <div
                key={book._id}
                className="book-card"
              >
                <img src={book.image[0].url} alt=""></img>
                <p className="bookcard-title">{book.bookName}</p>
                <p className="bookcard-author">{book.author}</p>
                <div className="bookcard-category">
                  <p>{book.categories[0].categoryName}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Allbooks;
