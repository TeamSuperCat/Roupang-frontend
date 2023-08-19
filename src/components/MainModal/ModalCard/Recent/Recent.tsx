import { styled } from "styled-components";
import ProductModalCard from "./ProductModalCard";

const products = [];

function Recent() {
  return (
    <ProductCardUl>
      <ProductModalCard />
      <ProductModalCard />
      <ProductModalCard />
      <ProductModalCard />
      <ProductModalCard />
      <ProductModalCard />
    </ProductCardUl>
  );
}

export default Recent;

const ProductCardUl = styled.ul`
  display: flex;
  flex-direction: column;
`;
