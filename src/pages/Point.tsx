import { styled } from "styled-components";
import { IoArrowBackOutline } from "react-icons/io5";
import { PiHandbagSimple } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { useRouter } from "../hooks/useRouter";
import OrderAccordion from "../components/Order/OrderAccordion";
import { useState } from "react";
import requestPay from "../api/requestPay";

function Point() {
  const { routeTo } = useRouter();
  const [currentPoint, setCurrentPoint] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentPoint(~~e.target.value);
  };

  const handleClick = () => {
    requestPay(currentPoint);
  };

  return (
    <OrderLayout>
      <OrderHeader>
        <OrderNav>
          <NavBtn onClick={() => routeTo(-1)}>
            <IoArrowBackOutline />
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
        <OrderNav>포인트 충전</OrderNav>
      </OrderHeader>
      <OrderAccordion title="포인트 충전">
        <Wrapper>
          <PointInput
            type="number"
            value={currentPoint}
            onChange={handleChange}
          />
        </Wrapper>
      </OrderAccordion>
      <BtnWrap>
        <PurchaseBtn onClick={() => handleClick()}>포인트 충전하기</PurchaseBtn>
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

export default Point;

const Wrapper = styled.div`
  display: grid;
  place-items: center;
`;

const PointInput = styled.input`
  height: 50px;
  text-align: right;
  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const OrderLayout = styled.div`
  max-width: 900px;
  margin: 0 auto;
  border: 1px solid #d7d7d7;
  background-color: #f0f0f0;
  position: relative;
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

  &:disabled {
    background-color: red;
    opacity: 0.2;
  }
`;
