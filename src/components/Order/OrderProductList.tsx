import { styled } from "styled-components";
// import { RiCloseFill } from "react-icons/ri";

interface OrderProductListProps {
  allPrice: any;
  amount: any;
  description: any;
  productImg: any;
  productName: any;
  option: any;
}

function OrderProductList({ allPrice, amount, description, productImg, productName, option }: OrderProductListProps) {
  //TODO: 물품삭제 버튼에 클릭시 장바구니에서 삭제 및 주문에서 삭제
  //TODO: 아이템 타이틀 이미지 누르면 해당 상품 상세페이지로

  return (
    <ProductWrap>
      <ProductImg src={productImg} />
      <ProductDesc>
        <ProductTitle>{`${productName} ${description}`}</ProductTitle>
        {option !== "" && <ProductOption>[옵션: {option}]</ProductOption>}
        <ProductAmount>수량: {amount}개</ProductAmount>
        <ProductPrice>{allPrice}원</ProductPrice>
      </ProductDesc>
      {/* <ProductBtnWrap>
        <ProductBtn>
          <RiCloseFill />
        </ProductBtn>
      </ProductBtnWrap> */}
    </ProductWrap>
  );
}

export default OrderProductList;

const ProductWrap = styled.li`
  box-sizing: border-box;
  display: grid;
  width: 100%;
  padding: 20px;
  grid-template-columns: 90px 1fr 25px;
`;

const ProductImg = styled.img`
  height: 100px;
  width: 100%;
  border: 1px solid #999;
`;

const ProductDesc = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  margin-left: 20px;
  font-size: 13px;
`;

const ProductTitle = styled.h2`
  font-weight: 600;
`;

const ProductOption = styled.div`
  font-weight: 600;
  color: #606060;
`;

const ProductAmount = styled.div`
  color: #606060;
`;

const ProductPrice = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

// const ProductBtnWrap = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const ProductBtn = styled.button`
//   width: 25px;
//   height: 25px;
//   background-color: white;
//   outline: none;
//   border: 1px solid #999999;
//   cursor: pointer;
//   font-size: 20px;
//   display: grid;
//   place-content: center;

//   &:hover {
//     background-color: black;
//     color: white;
//   }
// `;
