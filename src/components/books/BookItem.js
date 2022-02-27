import { brown } from "@mui/material/colors";
import { Component } from "react";
import styled from "styled-components";

const StyledListItem = styled.li`
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

class BookItem extends Component {
  render() {
    const { book } = this.props;
    return (
      <StyledListItem>
        <p>{`Author(s): ${book.author.join(", ")}`}</p>
        <h3>{book.title}</h3>
        <p>{`${book.year}  ${book.country}, ${book.city}, ${book.pages} pages`}</p>
      </StyledListItem>
    );
  }
}

export default BookItem;
