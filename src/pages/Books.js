import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory, useParams, useLocation } from "react-router-dom";
import BookList from "../components/books/BookList";
import { fetchBooksData } from "../store/api-actions";
import Paginate from "../components/util/Paginate";
import { useSelector } from "react-redux";
import { bookActions } from "../store/book-slice";
import BookSearch from "../components/books/BookSearch";

const Books = () => {
  const books = useSelector((state) => state.book.books);
  const searchField = useSelector((state) => state.book.searchField);
  const pageCount = useSelector((state) => state.book.pageCount);
  const currentPage = useSelector((state) => state.book.currentPage);
  const loading = useSelector((state) => state.ui.loading);
  const error = useSelector((state) => state.ui.error);
  const dispatch = useDispatch();

  const history = useHistory();
  const params = useParams();
  const location = useLocation();
  const { search } = location;
  const { page } = params;
  const [pageSize] = useState(20);

  useEffect(() => {
    dispatch(bookActions.searchChange(search.slice(1)));
    dispatch(
      fetchBooksData({
        page: page,
        filters: search ? [{ type: "all", values: [search.slice(1)] }] : null,
      })
    );
    dispatch(bookActions.setCurrentPage(page));
  }, [page, dispatch, search]);

  const onPageChange = (pageNumber) => {
    dispatch(bookActions.setCurrentPage(pageNumber));
    history.push({
      pathname: `/books/${pageNumber}`,
      search: searchField || null,
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
      {!loading && !error && (!books || books.length === 0) && (
        <p>No books found with these search parameters</p>
      )}
      {!loading && !error && books.length > 0 && (
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
