import { styled } from "styled-components";
import { IoArrowBackOutline } from "react-icons/io5";
import { PiHandbagSimple } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useRouter } from "../hooks/useRouter";
import OrderAccordion from "../components/Order/OrderAccordion";
// import { useState } from "react";
import ShipInfo from "../components/Order/ShipInfo";
import OrderList from "../components/Order/OrderList";
import OrderDisCount from "../components/Order/OrderDisCount";
import OrderInfo from "../components/Order/OrderInfo";
import OrderBenefit from "../components/Order/OrderBenefit";

// type InfoType = "member" | "new";

function Order() {
  // const [shipment, setShipment] = useState<InfoType>("member");
  const { routeTo } = useRouter();

  return (
    <OrderLayout>
      <OrderHeader>
        <OrderNav>
          <NavBtn onClick={() => routeTo(-1)}>
            <Link to="">
              <IoArrowBackOutline />
            </Link>
          </NavBtn>
          <NavTitle>roupang</NavTitle>
          <NavRightWrap>
            <NavBtn>
              <a>
                <PiHandbagSimple />
              </a>
            </NavBtn>
            <NavBtn>
              <a>
                <RxPerson />
              </a>
            </NavBtn>
          </NavRightWrap>
        </OrderNav>
        <OrderNav>주문/결제</OrderNav>
      </OrderHeader>
      <FormWrap>
        <OrderAccordion title={"배송지"}>
          <ShipInfo />
        </OrderAccordion>
        <OrderAccordion title={"주문상품"}>
          <OrderList />
        </OrderAccordion>
        <OrderAccordion title={"할인/부가결제"}>
          <OrderDisCount />
        </OrderAccordion>
        <OrderAccordion title={"결제정보"}>
          <OrderInfo />
        </OrderAccordion>
        <OrderAccordion title={"적립혜택"}>
          <OrderBenefit />
        </OrderAccordion>
      </FormWrap>
      <BtnWrap>
        <PurchaseBtn>32,500원 결제하기</PurchaseBtn>
        <span>
          무이자할부가 적용되지 않은 상품과 무이자할부가 가능한 상품을 동시에
          구매할 경우 전체 주문 상품 금액에 대해 무이자할부가 적용되지 않습니다.
          무이자할부를 원하시는 경우 장바구니에서 무이자할부 상품만 선택하여
          주문하여 주시기 바랍니다.
          <br />
          <br />
          <br />
          <br />
          최소 결제 가능 금액은 결제금액에서 배송비를 제외한 금액입니다.
        </span>
      </BtnWrap>
    </OrderLayout>
  );
}

export default Order;

const OrderLayout = styled.div`
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid #d7d7d7;
  background-color: #f0f0f0;
`;

const OrderHeader = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
  margin-bottom: 10px;
`;

const OrderNav = styled.nav`
  display: flex;
  height: 58px;
  align-items: center;
  box-sizing: border-box;

  &:nth-child(1) {
    padding: 17px;
    justify-content: space-between;
    background-color: white;
  }

  &:nth-child(2) {
    display: grid;
    place-items: center;
    height: 63px;
    background-color: #444;
    color: white;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -2px;
    font-family: "NotoSansKR";
  }

  & > :first-child {
    font-size: 30px;
  }
`;

const NavBtn = styled.span`
  font-size: 23px;
  line-height: 0.1;
  cursor: pointer;
`;

const NavTitle = styled.h1`
  transform: translateX(22px);
  font-size: 24px;
`;

const NavRightWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 70px;
`;

const FormWrap = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  background-color: #f0f0f0;
  font-family: "NotoSansKR";
  color: #383838;
`;

const BtnWrap = styled.div`
  display: grid;
  height: 200px;

  & span {
    font-size: 11px;
    color: #797979;
    margin-left: 20px;
    margin-right: 20px;
  }
`;

const PurchaseBtn = styled.button`
  width: 100%;
  height: 50px;
  background-color: var(--primary-color);
  border: none;
  color: white;
  font-size: 18px;

  &:hover {
    opacity: 0.8;
  }
`;
