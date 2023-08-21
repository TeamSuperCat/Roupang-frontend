import { styled } from "styled-components";

function OrderList() {
  return (
    <Layout>
      <ShippingWrap></ShippingWrap>
    </Layout>
  );
}

export default OrderList;

const Layout = styled.div`
  display: grid;
`;

const ShippingWrap = styled.div`
  display: flex;
`;
