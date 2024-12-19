import React, { useEffect } from "react";
import "./PopularBooks.css";
import { useDispatch, useSelector } from "react-redux";
import { FetchPopularBooks } from "../redux/slices/app";
import { Link } from "react-router-dom";

function PopularBooks() {
  const dispatch = useDispatch();
  const { booksPopular } = useSelector((state) => state.app);
  console.log("booksRecent::",booksPopular);
  useEffect(() => {
      dispatch(FetchPopularBooks());
  }, []);
  return (
    <div className="popularbooks-container">
      <h className="popularbooks-title">Sách phổ biến </h>
      <div className="popularbooks">
        <div className="popularbook-images">
          {booksPopular.map((book) => {
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
            {booksPopular.map((book) => {
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
    </div>
  );
}

export default PopularBooks;
