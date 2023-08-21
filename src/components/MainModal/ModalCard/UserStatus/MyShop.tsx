import { useState } from "react";
import { css, styled } from "styled-components";
import InfoBlock from "./InfoBlock";
import { GoClock } from "react-icons/go";
import { RxPerson } from "react-icons/rx";
import CategoryBtn from "./CategoryBtn";

interface IActiveProps {
  $active: boolean;
}

const CardInfo = [
  { id: 0, name: "입금전", path: "", value: 0 },
  { id: 1, name: "배송준비중", path: "", value: 0 },
  { id: 2, name: "배송중", path: "", value: 0 },
  { id: 3, name: "배송완료", path: "", value: 0 },
  { id: 4, name: "취소", path: "", value: 0, solid: true },
  { id: 5, name: "교환", path: "", value: 0, solid: true },
  { id: 6, name: "반품", path: "", value: 0, solid: true },
];
const CardInfo2 = [
  { id: 0, name: "쿠폰", path: "", value: 0, unit: "개" },
  { id: 1, name: "적립금", path: "", value: 0, unit: "원" },
  { id: 2, name: "가용", path: "", value: 0, unit: "원" },
  { id: 3, name: "사용", path: "", value: 0, unit: "원" },
  { id: 4, name: "주문", path: "", value: 0, unit: "회" },
  { id: 5, name: "금액", path: "", value: 0, unit: "원", solid: true },
];

const Category = [
  { id: 0, name: "주문내역 조회", iconEl: <GoClock />, path: "" },
  { id: 1, name: "회원 정보", iconEl: <RxPerson />, path: "" },
];

function MyShop() {
  const [isActive, setIsActive] = useState(true);

  return (
    <>
      <TapWrap>
        <Tapli $active={isActive} onClick={() => setIsActive(true)}>
          주문 / 배송
        </Tapli>
        <Tapli $active={!isActive} onClick={() => setIsActive(false)}>
          포인트 / 적립금
        </Tapli>
      </TapWrap>
      <UserStatus>
        {isActive
          ? CardInfo.map((props) => <InfoBlock key={props.id} {...props} />)
          : CardInfo2.map((props) => <InfoBlock key={props.id} {...props} />)}
      </UserStatus>
      <Divider />
      <CategoryWrap>
        {Category.map((props) => (
          <CategoryBtn key={props.id} {...props}>
            {props.iconEl}
          </CategoryBtn>
        ))}
      </CategoryWrap>
    </>
  );
}

export default MyShop;

const TapWrap = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 10px;
  margin-bottom: 10px;
  height: 35px;
  border: 1px solid black;
  border-bottom: none;
  font-size: 12px;
  font-weight: 500;
`;

const Tapli = styled.li<IActiveProps>`
  display: grid;
  place-items: center;
  cursor: pointer;
  color: white;
  background-color: #444444;

  ${({ $active }) =>
    $active &&
    css`
      background-color: white;
      color: #444444;
    `}
`;

const UserStatus = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: repeat(10, 1fr);
  height: 128px;
  margin-bottom: 30px;
`;

const Divider = styled.hr`
  border: 0.2px solid rgba(68, 68, 68, 0.08);
  margin-bottom: 30px;
  &::after {
    content: "";
    left: 50%;
    top: 389px;
    width: 7px;
    height: 7px;
    background-color: black;
    position: absolute;
    transform: rotate(45deg);
  }
`;

const CategoryWrap = styled.ul`
  display: grid;
`;
