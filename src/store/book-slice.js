import { createSlice } from "@reduxjs/toolkit";

const initialBookState = {
  books: [],
  searchField: "",
  currentPage: 1,
  pageCount: 0
};

const bookSlice = createSlice({
  name: "book",
  initialState: initialBookState,
  reducers: {
    searchChange(state, action) {
      state.searchField = action.payload;
    },
    replaceBooks(state, action) {
      state.books = action.payload;
    },
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setPageCount(state, action) {
      state.pageCount = action.payload;
    }
   
  },
});

export const bookActions = bookSlice.actions;

export default bookSlice.reducer;
