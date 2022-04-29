import { brown } from "@mui/material/colors";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledHeader = styled.header`
  z-index: 10;
  position: fixed;
  top: 0px;
  width: 100%;
  height: 5rem;
  padding: 0 10%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${brown[700]};

  h1 {
    color: white;
    font-style: italic;
    font-weight: 400;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
    color: white;
    cursor: pinter;
  }
`;

const Navigation:React.FC = () => {
  return (
    <StyledHeader>
      <h1>
        <Link to="/">Books</Link>
      </h1>
      <nav>
        <ul>
          <li></li>
          <li></li>
        </ul>
      </nav>
    </StyledHeader>
  );
};

export default Navigation;
