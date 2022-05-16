import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router-dom";
import BookList from "../components/books/BookList";
import { fetchBooksData } from "../store/api-actions";
import Paginate from "../components/util/Paginate";
import { bookActions } from "../store/book-slice";
import BookSearch from "../components/books/BookSearch";
import { uiActions } from "../store/ui-slice";
import { useAppDispatch, useAppSelector } from "../hooks";

const Books = () => {
  const books = useAppSelector((state) => state.book.books);
  const searchField = useAppSelector((state) => state.book.searchField);
  const pageCount = useAppSelector((state) => state.book.pageCount);
  const currentPage = useAppSelector((state) => state.book.currentPage);
  const loading = useAppSelector((state) => state.ui.loading);
  const error = useAppSelector((state) => state.ui.error);
  const dispatch = useDispatch();
  const appDispatch = useAppDispatch();

  const history = useHistory();
  const { page } = useParams<{ page: string }>();
  const [pageSize] = useState(20);

  function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  const searchParam = query.get("q") || "";

  useEffect(() => {
    appDispatch(bookActions.searchChange(searchParam));

    //check if the page param is a number. if not, dont send any request and redirect to /books/1
    if (isNaN(+page)) {
      appDispatch(uiActions.setLoading(false));
      history.push({ pathname: `/books/1/` });
      return;
    }

    dispatch(
      fetchBooksData({
        page: +page,
        filters: searchParam ? [{ type: "all", values: [searchParam] }] : null,
      })
    );
    appDispatch(bookActions.setCurrentPage(+page));
  }, [page, dispatch, appDispatch, searchParam, history]);

  const onPageChange = (pageNumber: number) => {
    appDispatch(bookActions.setCurrentPage(pageNumber));
    history.push({
      pathname: `/books/${pageNumber}/`,
      search: searchField ? `q=${searchField}` : undefined,
    });
  };

  if (loading) return <p>Loading...</p>;

  if (error) {
    return (
      <p style={{ color: "red" }}>Oop, error happened. Cannot fetch books.</p>
    );
  }

  return (
    <React.Fragment>
      <BookSearch />
      {(!books || books.length === 0) && (
        <p>No books found with these search parameters</p>
      )}
      {books.length > 0 && (
        <React.Fragment>
          <BookList books={books} />
          <Paginate
            pageSize={pageSize}
            totalCount={pageCount}
            onPageChange={onPageChange}
            currentPage={+currentPage}
          />
        </React.Fragment>
      )}
    </React.Fragment>
  );
};

export default Books;
