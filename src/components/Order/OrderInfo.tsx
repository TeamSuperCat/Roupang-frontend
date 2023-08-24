import { styled } from "styled-components";

function OrderInfo() {
  // TODO 결제 금액 반영해서 넣기

  return (
    <ContentsWrap>
      <PriceInfoWrap>
        <InfoWrap>
          <InfoTitle>주문상품</InfoTitle>
          <InfoPrice>31,500원</InfoPrice>
        </InfoWrap>
        <InfoWrap>
          <InfoTitle>배송비</InfoTitle>
          <InfoPrice>+0원</InfoPrice>
        </InfoWrap>
        <InfoWrap>
          <InfoTitle>포인트사용</InfoTitle>
          <InfoPrice style={{ color: "red" }}>-2,000원</InfoPrice>
        </InfoWrap>
      </PriceInfoWrap>
      <AmountWrap>
        <AmountText>최종 결제 금액</AmountText>
        <Amount>29,500원</Amount>
      </AmountWrap>
    </ContentsWrap>
  );
}

export default OrderInfo;

const ContentsWrap = styled.div`
  display: grid;
  width: 100%;
  font-family: "Jost";
`;

const PriceInfoWrap = styled.div`
  display: grid;
  grid-template-rows: 1fr;
  margin-bottom: 20px;
`;

const InfoWrap = styled.div`
  display: flex;
  justify-content: space-between;
  color: #383838;
  padding: 10px 20px 5px 20px;
`;

const InfoTitle = styled.span`
  font-weight: 600;
`;

const InfoPrice = styled.span`
  font-weight: 600;
`;

const AmountWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  background-color: #f7f7f7;
`;

const AmountText = styled.div`
  font-size: 17px;
  font-weight: bold;
`;

const Amount = styled.div`
  font-size: 25px;
  font-weight: bold;
  color: var(--primary-color);
`;
