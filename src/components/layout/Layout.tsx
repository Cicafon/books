import Navigation from "./Navigation";
import styled from "styled-components";

const StyledMain = styled.main`
  max-width: 80rem;
  text-align: center;
  margin: 10rem auto 2rem auto;
`;

const Layout: React.FC<{children: React.ReactNode}> = (props) => {
  return (
    <>
      <Navigation />
      <StyledMain>{props.children}</StyledMain>
    </>
  );
};

export default Layout;
