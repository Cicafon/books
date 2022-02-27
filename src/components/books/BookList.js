import styled from "styled-components";
import BookItem from "./BookItem";

const BookListWrapper = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0;
`;

const BookList = ({ books }) => {
  return (
    <BookListWrapper>
      {books && books.map((book) => <BookItem key={book.id} book={book} />)}
    </BookListWrapper>
  );
};

export default BookList;
