import { configureStore } from "@reduxjs/toolkit";
import bookSlice from "./book-slice";
import uiSlice from "./ui-slice";

export const store = configureStore({
  reducer: { book: bookSlice, ui: uiSlice },
});


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch