import { styled } from "styled-components";
import { IoArrowBackOutline } from "react-icons/io5";
import { PiHandbagSimple } from "react-icons/pi";
import { RxPerson } from "react-icons/rx";
import { Link } from "react-router-dom";
import { useRouter } from "../hooks/useRouter";
import OrderAccordion from "../components/Order/OrderAccordion";
import ShipInfo from "../components/Order/ShipInfo";
import OrderList from "../components/Order/OrderList";
import OrderDisCount from "../components/Order/OrderDisCount";
import OrderInfo from "../components/Order/OrderInfo";
import axiosClient from "../api/axios";
import { useQuery } from "@tanstack/react-query";
import useOrder from "../hooks/useOrder";

const requestOrderInfo = async (orderList = "구매할물품") => {
  const response = await axiosClient.post("/order", orderList);
  return response.data;
};

function Order() {
  const { routeTo } = useRouter();
  const { data, isLoading } = useQuery(["order"], () =>
    requestOrderInfo("구매할물품의 상태정보")
  );

  const {
    formState: { form },
    addressState: { updateAddress },
    phoneState: { updatePhone },
    emailState: { updateEmail },
    pointState: { handlePoint },
  } = useOrder();
  // 페이지 진입하면 useQuery로 구매할 상품정보 불러온다음
  // /order POST로 전역에 저장된 구매할 물품정보 받아서 보내준다
  // 거기서 포인트 정보를 뽑아서 orderslice 에 포인트 상태 저장
  // 사용자 정보도 상태 저장
  // 결제 버튼 눌렀을때 /order/payment에 formdata 보내줌

  const requestPayment = () => {
    axiosClient.post("/order/payment");
    // 성공 실패에 따라 행동정의 필요
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
        <OrderNav>주문/결제</OrderNav>
      </OrderHeader>
      <FormWrap>
        <OrderAccordion title={"배송지"}>
          <ShipInfo />
        </OrderAccordion>
        <OrderAccordion title={"주문상품"}>
          <OrderList />
        </OrderAccordion>
        <OrderAccordion title={"포인트 사용"}>
          <OrderDisCount />
        </OrderAccordion>
        <OrderAccordion title={"결제정보"}>
          <OrderInfo />
        </OrderAccordion>
        {/* <OrderAccordion title={"적립혜택"}>
          <OrderBenefit />
        </OrderAccordion> */}
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
