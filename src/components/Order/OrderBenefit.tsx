import { styled } from "styled-components";

function OrderBenefit() {
  // TODO 결제 금액에 따라서 적립금 반영

  return (
    <ContentsWrap>
      <PriceInfoWrap>
        <InfoWrap>
          <InfoTitle>상품별 적립금</InfoTitle>
          <InfoPrice>320원</InfoPrice>
        </InfoWrap>
        <InfoWrap>
          <InfoTitle>회원 적립금</InfoTitle>
          <InfoPrice>300원</InfoPrice>
        </InfoWrap>
        <InfoWrap>
          <InfoTitle>쿠폰 적립금</InfoTitle>
          <InfoPrice>0원</InfoPrice>
        </InfoWrap>
      </PriceInfoWrap>
      <AmountWrap>
        <AmountText>적립 예정금액</AmountText>
        <Amount>620원</Amount>
      </AmountWrap>
    </ContentsWrap>
  );
}

export default OrderBenefit;

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
  font-size: 20px;
  font-weight: bold;
  color: var(--primary-color);
`;
