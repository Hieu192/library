import React, { useEffect } from 'react'
import './RecentAddedBooks.css'
import { FetchRecentBooks } from '../redux/slices/app';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from "react-router-dom";

function RecentAddedBooks() {
    const dispatch = useDispatch();
    const { booksRecent } = useSelector((state) => state.app);
    useEffect(() => {
        dispatch(FetchRecentBooks());
    }, []);
    return (
        <div className='recentaddedbooks-container'>
            <h className='recentbooks-title'>Sách mới thêm gần đây </h>
            <div className='recentbooks'>
                <div className='images'>
                    {booksRecent.map((book) => {
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
                        {booksRecent.map((book) => {
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
    )
}

export default RecentAddedBooks