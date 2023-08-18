import { styled } from "styled-components";

function ModalHeader() {
  return (
    <MyShopHeader>
      <div>내 쇼핑정보</div>
      <i></i>
      <HeaderEng>MY SHOP</HeaderEng>
      <MoreBtn>더보기</MoreBtn>
    </MyShopHeader>
  );
}

export default ModalHeader;

const MyShopHeader = styled.div`
  display: flex;
  padding-top: 25px;
  font: inherit;
  font-weight: bold;
  position: relative;

  &::before {
    content: "";
    height: 3px;
    position: absolute;
    top: 47.5px;
    left: 0;
    width: 240px;
    background-color: rgba(128, 128, 128, 0.2);
    text-size-adjust: none;
  }

  & > div:nth-child(1) {
    font-size: 15px;
    padding-bottom: 7px;
    border-bottom: 3.5px solid black;
    z-index: 2;
  }

  & > i::before {
    content: "";
    position: absolute;
    top: 28px;
    left: 90px;
    width: 1px;
    height: 9px;
    background-color: rgba(128, 128, 128, 0.3);
  }
`;

const HeaderEng = styled.div`
  font-size: 12px;
  margin-left: 25px;
  color: rgba(128, 128, 128, 0.5);
`;

const MoreBtn = styled.p`
  position: absolute;
  right: 10px;
  top: 27px;
  font-size: 12px;
  cursor: pointer;
`;
