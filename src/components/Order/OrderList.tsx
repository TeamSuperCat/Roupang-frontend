import { styled } from "styled-components";
import OrderProductList from "./OrderProductList";

function OrderList() {
  // order에서 불러와서 상품 상태 업데이트 하면 불러와서 그려주기

  return (
    <Layout>
      <PuchaseProducts>
        <OrderProductList />
        <OrderProductList />
      </PuchaseProducts>
      <ShippingWrap>
        <div>배송비 였던 것</div>
        <div>0원</div>
      </ShippingWrap>
    </Layout>
  );
}

export default OrderList;

const Layout = styled.div`
  display: grid;
`;

const PuchaseProducts = styled.ul`
  display: flex;
  flex-direction: column;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const ShippingWrap = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #f8f9fa;
  padding: 20px;
  font-size: 13px;
  font-weight: 600;
  color: #606060;

  & div:nth-child(2) {
    color: black;
    font-weight: bold;
    font-size: 15px;
  }
`;
