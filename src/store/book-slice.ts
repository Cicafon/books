import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../models";

interface InitialBookStateType {
  books: Book[];
  searchField: string ;
  currentPage: number;
  pageCount: number;
}

const initialBookState: InitialBookStateType = {
  books: [],
  searchField: "",
  currentPage: 1,
  pageCount: 0,
};

const bookSlice = createSlice({
  name: "book",
  initialState: initialBookState,
  reducers: {
    searchChange(state, action: PayloadAction<string>) {
      state.searchField = action.payload;
    },
    replaceBooks(state, action:PayloadAction<Book[]>) {
      state.books = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setPageCount(state, action: PayloadAction<number>) {
      state.pageCount = action.payload;
    },
  },
});

export const bookActions = bookSlice.actions;

export default bookSlice.reducer;
