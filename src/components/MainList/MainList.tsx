import React from "react";
import styled from "styled-components";
import ProductCard from "../Home/ProductCard";

const MainList = () => {
  return (
    <ListWrapper>
      <ProductCard title="어흥" />
      <ProductCard title="어흥" />
      <ProductCard title="어흥" />
      <ProductCard title="어흥" />
      <ProductCard title="어흥" />
      <ProductCard title="어흥" />
      <ProductCard title="어흥" />
      <ProductCard title="어흥" />
      <ProductCard title="어흥" />
      <ProductCard title="어흥" />
      <ProductCard title="어흥" />
      <ProductCard title="어흥" />
      <ProductCard title="어흥" />
    </ListWrapper>
  );
};

export default MainList;

const ListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  grid-row-gap: 30px;
  grid-column-gap: 5px;
  margin-top: 10px;
`;
