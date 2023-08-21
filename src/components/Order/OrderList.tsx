import { styled } from "styled-components";

function OrderList() {
  return (
    <Layout>
      <PuchaseProducts>
        <ProductWrap></ProductWrap>
      </PuchaseProducts>
      <ShippingWrap>
        <div>배송비</div>
        <div>3,000원</div>
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
`;

const ProductWrap = styled.li`
  display: flex;
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
