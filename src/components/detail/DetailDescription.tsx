import React, { useState } from "react";
import image from "../../assets/test/carousel04.jpg";
import styled from "styled-components";
import icons from "../../assets/test/icons.png";

let optionData = [
  { option: "이건 개" },
  { option: "이건 고양이" },
  { option: "이건 닭" },
  { option: "이건 토끼" },
];

const DetailDescription = () => {
  const [isOption, setIsOption] = useState(false);
  const [isCheck, setIsCheck] = useState(false);
  const [OptionValue, setOptionValue] = useState("옵션선택");
  const [productAmount, setProductAmount] = useState(0);

  const optionClcikHandler = () => {
    console.log(isOption);
    setIsOption((prev) => !prev);
  };
  const optionCheckHandler = (
    event: React.MouseEvent<HTMLDivElement>,
    data: string
  ) => {
    setIsCheck((prev) => !prev);
    setOptionValue(data);
    setIsOption((prev) => !prev);
  };
  return (
    <>
      <Container>
        <Imagemox>
          <img src={image} alt="dd" />
        </Imagemox>
        <DescriptionBox>
          <ProductTitleDiv>
            <DivFlex className="설명제목">
              <ProductTitle>
                귀멸의칼날 도공마을편 무이치로 미츠리 오니잡는 귀살대 악!!
              </ProductTitle>
              <DivFlex>
                <HartIcon>❤️</HartIcon>
                <ShareIcon>🔨</ShareIcon>
              </DivFlex>
            </DivFlex>
            <div>
              ⭐️⭐️⭐️⭐️⭐️<span>12개상품평</span>
            </div>
          </ProductTitleDiv>

          <ProductPriceDiv>
            <div>
              124000 원<span style={{ marginLeft: "1rem" }}>소비자가</span>
            </div>
            <div>
              110000 원<span style={{ marginLeft: "1rem" }}>루팡가</span>
            </div>
            <div></div>
            <HoverContainer>
              <CouponeButton>
                <Content>쿠폰발급</Content>
                <ButtonFill />
              </CouponeButton>
            </HoverContainer>
          </ProductPriceDiv>

          <ProductOption>
            <OptionSelect onClick={optionClcikHandler}>
              <div>{OptionValue}</div>
              <div>▿</div>
            </OptionSelect>
          </ProductOption>
          {isOption &&
            optionData.map((data, index) => {
              return (
                <OptionList>
                  <div
                    key={index}
                    onClick={(event) => optionCheckHandler(event, data.option)}
                  >
                    {data.option}
                  </div>

                  <div></div>
                </OptionList>
              );
            })}
          {/* 수량표시하는곳 */}
          <ProductCounter>
            <Amount>수량</Amount>
            <DivFlex>
              <MinusButton>-</MinusButton>
              <ProductAmount>{productAmount}</ProductAmount>
              <PlusButton>+</PlusButton>
            </DivFlex>
            <div></div>
          </ProductCounter>

          {/* 장바구니 구매하기버튼 시작 */}
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <ShopingCartContainer>
              <ShopingCartButton>
                <Content>장바구니</Content>
                <ShopingCartFill />
              </ShopingCartButton>
            </ShopingCartContainer>

            <BuyContainer>
              <BuyButton>
                <Content>구매하기</Content>
                <BuyFill />
              </BuyButton>
            </BuyContainer>
          </div>
        </DescriptionBox>
      </Container>
    </>
  );
};

export default DetailDescription;

const Container = styled.div`
  height: auto;
  display: flex;
  justify-content: center;
  margin: auto;
`;
const Imagemox = styled.div`
  margin: 5px;
  width: 500px;
  height: 500px;
  border: 1px solid black;
`;
const DescriptionBox = styled.div`
  margin: 5px;
  width: 500px;
  height: 500px;
  border: 1px solid black;
  padding: 1rem;
`;
const DivFlex = styled.div`
  display: flex;
  justify-content: space-between;
`;
const ProductTitleDiv = styled.div`
  padding-bottom: 1rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid gray;
`;

const ProductTitle = styled.div`
  font-size: 1.3rem;
  font-weight: 800;
  margin: 3px 0px;
  margin-bottom: 0.5rem;
`;

const ProductPriceDiv = styled.div`
  position: relative;
  padding-bottom: 1rem;
  border-bottom: 1px solid gray;
  margin-bottom: 1rem;
`;

const CouponeButton = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 6rem;
  height: 2rem;
  background-color: white;
  color: #57d3bd;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    color: white;
    transition: color 0.3s ease-in-out;
  }
`;
const ButtonFill = styled.div`
  width: 0;
  height: 100%;
  background-color: #57d3bd;
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.3s ease-in-out;
`;

const HoverContainer = styled(CouponeButton)`
  border: 1px solid #57d3bd;
  &:hover ${ButtonFill} {
    width: 100%;
  }
`;

const HartIcon = styled.div`
  margin-left: 1rem;
`;

const ShareIcon = styled.div`
  margin-left: 1rem;
`;

const ProductOption = styled.div`
  padding: 1rem;
  border: 1px solid black;
  margin-bottom: 1rem;
`;

const OptionSelect = styled.div`
  font-size: 1.2rem;
  display: flex;
  justify-content: space-between;
  cursor: pointer;
`;
const OptionList = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.2rem;
  padding: 0.5rem;
`;

const ShopingCartButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 230px;
  height: 2.5rem;
  background-color: white;
  color: #57d3bd;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    color: white;
    transition: color 0.3s ease-in-out;
  }
`;

const ShopingCartFill = styled.div`
  width: 0;
  height: 100%;
  background-color: #57d3bd;
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.3s ease-in-out;
`;
const ShopingCartContainer = styled(ShopingCartButton)`
  border: 1px solid #57d3bd;
  &:hover ${ShopingCartFill} {
    width: 100%;
  }
`;

const Content = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;
`;

const BuyButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  width: 230px;
  height: 2.5rem;
  background-color: #ffffff;
  color: #337aec;
  border-radius: 10px;
  cursor: pointer;
  overflow: hidden;
  &:hover {
    color: white;
    transition: color 0.3s ease-in-out;
  }
`;

const BuyFill = styled.div`
  width: 0;
  height: 100%;
  background-color: #337aec;
  position: absolute;
  top: 0;
  left: 0;
  transition: width 0.3s ease-in-out;
`;
const BuyContainer = styled(BuyButton)`
  border: 1px solid #337aec;
  &:hover ${BuyFill} {
    width: 100%;
  }
`;

const ProductCounter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const Amount = styled.div``;
const ProductAmount = styled.div`
  width: 100px;
  border: 1px solid black;
  padding: 1rem;
  text-align: center;
`;

const PlusButton = styled.div`
  width: 60px;
  border: 1px solid black;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
`;
const MinusButton = styled.div`
  width: 60px;
  border: 1px solid black;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
`;
