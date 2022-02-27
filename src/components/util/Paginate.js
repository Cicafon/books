import React from "react";
import { Pagination } from "@mui/material";
import styled from "styled-components";

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

const Paginate = (props) => {
  const totalPageCount = Math.ceil(props.totalCount / props.pageSize);
  const pageNumbers = [];
  for (let i = 1; i <= totalPageCount; i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationWrapper>
      <Pagination
        page={props.currentPage}
        count={totalPageCount}
        onChange={(e, value) => props.onPageChange(value)}
      />
    </PaginationWrapper>
  );
};

export default Paginate;
