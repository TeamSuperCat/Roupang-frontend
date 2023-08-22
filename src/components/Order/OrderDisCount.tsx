import { styled } from "styled-components";

function OrderDisCount() {
  //TODO 포인트 사용시 금액 변화 및 표시

  return (
    <ContentsWrap>
      <InputWrap>
        <InputInner>
          <InputText>적립금</InputText>
          <InputRight>
            <PointInput type="number" />
            <InputBtn>전액 사용</InputBtn>
          </InputRight>
        </InputInner>
      </InputWrap>
      <PointLeftWrap>
        <PointText>보유 잔액</PointText>
        <span>2,000원</span>
      </PointLeftWrap>
      <AmountWrap>
        <AmoutText>적용금액</AmoutText>
        <Amount>0원</Amount>
      </AmountWrap>
    </ContentsWrap>
  );
}

export default OrderDisCount;

const ContentsWrap = styled.div`
  display: grid;
  width: 100%;
`;

const InputWrap = styled.div`
  display: grid;
  grid-template-rows: 1fr;
`;

const InputInner = styled.div`
  display: grid;
  padding: 20px;
  grid-template-columns: 80px 1fr;
  align-items: center;
`;

const InputText = styled.p`
  font-size: 15px;
  color: #383838;
  font-weight: 600;
`;

const InputRight = styled.div`
  display: flex;
  width: 100%;
`;

const PointInput = styled.input`
  width: 100%;
  outline: none;
  text-align: right;
  color: #3971ff;
  font-weight: bold;
  border: 1px solid;
  border-color: #e1e1e1;

  &[type="number"]::-webkit-inner-spin-button,
  &[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

const InputBtn = styled.button`
  width: 90px;
  height: 42px;
  background: none;
  border-color: #e1e1e1;
  border: 1px solid;
  outline: none;

  &:hover {
    background-color: black;
    color: white;
  }
`;

const PointLeftWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 30px;
  font-size: 14px;
  font-weight: bold;
  height: 42px;

  & :nth-child(2) {
    color: var(--primary-color);
  }
`;

const PointText = styled.span`
  margin-right: 10px;
`;

const AmountWrap = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  background-color: #f7f7f7;
`;

const AmoutText = styled.div`
  font-size: 17px;
  font-weight: bold;
`;

const Amount = styled.div`
  font-size: 18px;
  font-weight: bold;
  color: var(--primary-color);
`;
