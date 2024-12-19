import { createSlice } from "@reduxjs/toolkit";
import axios from "../../service/axios"

import { v4 } from "uuid";
// ----------------------------------------------------------------------
const initialState = {
  user: {},
  isLoading: false,
  books:[],
  searchBooks:"",
  booksRecent:[],
  booksPopular:[]
};

const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchUser(state, action) {
      state.user = action.payload.user;
    },
    fetchBooks(state, action) {
      state.books = action.payload.books;
    },
    fetchRecentBooks(state, action) {
      state.booksRecent = action.payload.booksRecent;
    },
    fetchPopularBooks(state, action) {
      state.booksPopular = action.payload.booksPopular;
    },
    updateUser(state, action) {
      state.user = action.payload.user;
    },
    updateLoading(state, action) {
      state.isLoading = action.payload;
    },
    updateSearchBooks(state, action) {
      state.searchBooks = action.payload;
    },

 
  },
});

// Reducer
export default slice.reducer;
export const {
  fetchUser,
  updateUser,
  updateLoading,
  updateSearchBooks
} = slice.actions;
// ----------------------------------------------------------------------



export function FetchBooks() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/books/allbooks"
      )
      .then((response) => {
        dispatch(slice.actions.fetchBooks({ books: response.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function FetchRecentBooks() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/books/recent"
      )
      .then((response) => {
        dispatch(slice.actions.fetchRecentBooks({ booksRecent: response.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function FetchPopularBooks() {
  return async (dispatch, getState) => {
    await axios
      .get(
        "/books/popular"
      )
      .then((response) => {
        dispatch(slice.actions.fetchPopularBooks({ booksPopular: response.data }));
      })
      .catch((err) => {
        console.log(err);
      });
  };
}



