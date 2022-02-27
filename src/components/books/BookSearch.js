import { TextField, Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bookActions } from "../../store/book-slice";
import styled from "styled-components";

const BookSearchWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 2rem 1rem 1rem 1rem;
  button {
    margin: 1rem 0;
    width: auto;
  }
  input {
    width: 30rem;
    background-color:white;
  }
  
  @media (min-width: 600px) {
    flex-direction: row;
    margin: 2rem 1rem 3rem 1rem;
    button {
      margin: 0 1rem;
      width: 10rem;
    }
  }
`;

const BookSearch = () => {
  const searchField = useSelector((state) => state.book.searchField);
  const dispatch = useDispatch();
  const history = useHistory();

  const onSearchChange = (e) => {
    dispatch(bookActions.searchChange(e.target.value));
  };

  const searchHandler = () => {
    dispatch(bookActions.setCurrentPage(1));
    history.push({
      pathname: `/books/${1}`,
      search: searchField || null,
    });
  };
  return (
    <BookSearchWrapper>
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={searchField}
        onChange={onSearchChange}
      />
      <Button variant="contained" size="large" onClick={searchHandler}>
        Search
      </Button>
    </BookSearchWrapper>
  );
};

export default BookSearch;
