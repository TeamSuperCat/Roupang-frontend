import { styled } from "styled-components";
import useOrder from "../../hooks/useOrder";

interface Props {
  total: number;
}

function OrderInfo({ total }: Props) {
  // TODO 결제 금액 반영해서 넣기
  const {
    pointState: { point },
  } = useOrder();
  const message = "포인트 잔액 부족";
  const totalLocale = total.toLocaleString();

  return (
    <ContentsWrap>
      <PriceInfoWrap>
        <InfoWrap>
          <InfoTitle>보유 포인트</InfoTitle>
          <InfoPrice>{point.toLocaleString()}원</InfoPrice>
        </InfoWrap>
        <InfoWrap>
          <InfoTitle>주문상품</InfoTitle>
          <InfoPrice>{totalLocale}원</InfoPrice>
        </InfoWrap>
        <InfoWrap>
          <InfoTitle>사용 포인트</InfoTitle>
          <InfoPrice style={{ color: "red" }}>
            {total > point ? message : `-${totalLocale}원`}
          </InfoPrice>
        </InfoWrap>
        <InfoWrap>
          <InfoTitle>사용후 포인트잔액</InfoTitle>
          <InfoPrice>{(point - total).toLocaleString()}원</InfoPrice>
        </InfoWrap>
      </PriceInfoWrap>
      <AmountWrap>
        <AmountText>최종 결제 금액</AmountText>
        <Amount>{total > point ? message : `${totalLocale}원`}</Amount>
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
