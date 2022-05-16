import { AppDispatch } from ".";
import { sendRequestBooks } from "../axios/sendRequestBooks";
import { bookActions } from "./book-slice";
import { uiActions } from "./ui-slice";
import { FetchBookParamType } from "../models";

export const fetchBooksData = (params: FetchBookParamType) => {
  return async (dispatch: AppDispatch) => {
    dispatch(uiActions.setLoading(true));
    try {
      const booksData = await sendRequestBooks(params);
      const pageCount = booksData.data.count;
      let convertedBooksData = booksData.data.books.map((i: any) => ({
        id: i.id,
        author: i.book_author,
        title: i.book_title,
        year: i.book_publication_year,
        country: i.book_publication_country,
        city: i.book_publication_city,
        pages: i.book_pages,
      }));

      dispatch(bookActions.replaceBooks(convertedBooksData));
      dispatch(bookActions.setPageCount(pageCount));
      dispatch(uiActions.setError(""));
      dispatch(uiActions.setLoading(false));
    } catch (err) {
      dispatch(uiActions.setLoading(false));
      if (err instanceof Error) {
        dispatch(uiActions.setError(err.message));
      } else {
        dispatch(uiActions.setError("Something went wrong!"));
      }
    }
  };
};
