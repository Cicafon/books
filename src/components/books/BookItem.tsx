import { brown } from "@mui/material/colors";

import styled from "styled-components";
import { Book } from "../../models";

const BookItemWrapper = styled.li`
  box-shadow: 0 0 0.25rem 0 ${brown[700]};
  background-color: white;
  padding: 1rem;
  margin: 2rem 0.5rem;
  max-width: 15rem;
  height: 20rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: ${brown[700]};
  p {
    margin: 0.2rem 0;
  }
`;

const BookItem: React.FC<{book: Book}> = ({book}) => {
    return (
      <BookItemWrapper>
        <p>{`Author(s): ${book.author.join(", ")}`}</p>
        <h3>{book.title}</h3>
        <p>{`${book.year}  ${book.country}, ${book.city}, ${book.pages} pages`}</p>
      </BookItemWrapper>
    );
  }


export default BookItem;
