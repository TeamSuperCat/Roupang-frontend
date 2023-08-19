import { styled } from "styled-components";

function ProductModalCard() {
  return (
    <ProductCardWrap>
      <ProductImg />
      <ProductDescWrap>
        <ProductTitle>D17 짜라 3종 혼합 120p 치킨 참치 연어와치킨</ProductTitle>
        <ProductPrice>{`26,400원 > 38,200원`}</ProductPrice>
      </ProductDescWrap>
    </ProductCardWrap>
  );
}

export default ProductModalCard;

const ProductCardWrap = styled.li`
  display: grid;
  grid-template-columns: 70px 1fr;
  border-bottom: 1px solid rgb(68, 68, 68, 0.1);
  padding-bottom: 20px;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ProductImg = styled.div`
  height: 100%;
  width: 60px;
  aspect-ratio: 1 / 1;
  background-image: url("https://puppydog.co.kr/web/product/medium/202307/ecfe1e3c09c794a0fad49d45cfe16d44.jpg");
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 10px;
`;

const ProductDescWrap = styled.div`
  display: grid;
  font-weight: 500;
  color: rgba(68, 68, 68, 0.95);
`;

const ProductTitle = styled.h1`
  display: flex;
  align-items: center;
  font-size: 13px;

  &:hover {
    color: var(--primary-color);
  }
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;
