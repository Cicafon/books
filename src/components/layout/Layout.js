import React from "react";
import Navigation from "./Navigation";
import styled from "styled-components";

const StyledMain = styled.main`
max-width: 80rem;
text-align: center;
margin: 10rem auto 2rem auto;
`;

const Layout = (props) => {
  return (
    <React.Fragment>
      <Navigation />
      <StyledMain>{props.children}</StyledMain>
    </React.Fragment>
  );
};

export default Layout;
