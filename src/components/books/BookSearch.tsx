import { TextField, Button } from "@mui/material";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../hooks";
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
    background-color: white;
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

const BookSearch: React.FC = () => {
  const searchField = useAppSelector((state) => state.book.searchField);
  const dispatch = useAppDispatch();
  const history = useHistory();

  const onSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(bookActions.searchChange(e.target.value));
  };

  const searchHandler = () => {
    dispatch(bookActions.setCurrentPage(1));
    history.push({
      pathname: `/books/${1}`,
      search: searchField ? `q=${searchField}` : undefined,
    });
  };
  return (
    <BookSearchWrapper
      onKeyPress={({ key }) => {
        if (key === "Enter") searchHandler();
      }}
    >
      <TextField
        id="outlined-basic"
        label="Search"
        variant="outlined"
        value={searchField || ""}
        onChange={onSearchChange}
      />
      <Button variant="contained" size="large" onClick={searchHandler}>
        Search
      </Button>
    </BookSearchWrapper>
  );
};

export default BookSearch;
