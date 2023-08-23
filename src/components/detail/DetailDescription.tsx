import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import image from "../../assets/test/carousel04.jpg";
import descImage from "../../assets/test/descImage.jpg";
import styled from "styled-components";
import axiosClient from "../../api/axios";
import Kakaopaymenticon from "../../assets/test/payment_icon_yellow_medium.png";
import kakaoPaymentfunction from "../../api/KakaoPayment";
import loadingImage from "../../assets/test/loading.gif";
import Option from "./Option";
import CartModal from "./CartModal";

const responseProductData = {
  product_name: "  귀멸의칼날 도공마을편 무이치로 미츠리 오니잡는 귀살대 악!!",
  price: 10000,
  stock: 5,
  description: "A 물품 상세 설명",
  description_img: descImage,
  category_name: "간식",
  product_img: image,
  sales_end_date: "2023-08-15",
};

interface DetailDescriptionBoxProps {
  isMoreView?: boolean;
}

///컴포넌트시작
const DetailDescription = () => {
  const { productid } = useParams();

  const [isMoreView, setIsMoreView] = useState<boolean>(false);
  const [productAmount, setProductAmount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAmountInputBox, setIsAmountInputbox] = useState<boolean>(false);
  const [data, setData] = useState({
    stock: 0,
    product_name: "",
    price: 0,
    options: [],
  });
  const [option, setOption] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  const product_id: number = 1;

  useEffect(() => {
    // axiosClient.get(`products/${product_id}`).then((res) => {
    axiosClient.get(`products/65`).then((res) => {
      setData(res.data);
      setIsLoading(false);
    });
  }, [product_id]);

  const productAmountUp = () => {
    if (Number(productAmount) < data.stock) {
      setIsAmountInputbox(false);
      setProductAmount((prev) => prev + 1);
    }
  };
  const productAmountDown = () => {
    if (Number(productAmount) > 1) {
      setIsAmountInputbox(false);
      setProductAmount((prev) => prev - 1);
    }
  };

  const ProductInformationMoreViewHandler = () => {
    setIsMoreView((prev) => !prev);
  };

  const enterAmount = () => {
    setIsAmountInputbox((prev) => !prev);
  };

  const enterKeydown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // console.log(event);
    if (event.key === "Enter") {
      const inputValue = (event.target as HTMLInputElement).value;
      setIsAmountInputbox((prev) => !prev);
      if (inputValue === "") {
        setProductAmount(1);
        return;
      } else if (Number(inputValue) < 1) {
        setProductAmount(1);
      } else if (Number(inputValue) >= data.stock) {
        setProductAmount(data.stock);
      } else {
        setProductAmount(Number(inputValue));
      }
    }
  };
  const amountInputboxBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsAmountInputbox((prev) => !prev);
    if (event.target.value === "") {
      setProductAmount(1);
      return;
    } else {
      setProductAmount(Number(event.target.value));
    }
  };

  //장바구니에 넣기
  const shopingCartButton = () => {
    // const token: string | null = localStorage.getItem("access_token");
    // const parsetoken = JSON.parse(token);

    console.log("장바구니에 넣어주세용");
    //선택된 옵션들 입니다
    const optionName = Object.keys(option);

    //선택된옵션갯수 === 실제옵션갯수
    if (optionName.length === data.options.length) {
      for (let i = 0; i < optionName.length; i++) {
        //옵션을 선택을안하면 "" 빈칸이 찍힙니다
        if (option[optionName[i]] === "") {
          console.log("옵션을 선택해주세요");
          return;
        }
      }
      console.log("장바구니에 담을수있겠어요");
    } else {
      console.log("옵션을 선택해주세요");
      return;
    }
    axiosClient
      .post(
        `/cart`,
        {
          amount: productAmount,
          productIdx: productid,
          options: JSON.stringify(option),
        },
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJtZW1iZXJUb2tlbiIsImlkeCI6MzAsImVtYWlsIjoiZ2t3bHN0bkBna3dsc3RuLmNvbSIsIm5pY2tuYW1lIjoi7ZWY7KeE7IiYIiwicGhvbmVfbnVtYmVyIjoiMDEwNzc3MTc0NDUiLCJhZGRyZXNzIjoi7J247LKc67aA7Y-JIiwibWVtYmVyX2ltZyI6ImRlZmF1bHRfcHJvZmlsZS5wbmciLCJjcmVhdGVkX2F0IjoiMjAyMy0wOC0yMiAxMzowNjozNyIsInVwZGF0ZWRfYXQiOiIyMDIzLTA4LTIyIDEzOjA2OjM3IiwidXNlcl9wb2ludCI6MCwiaWF0IjoxNjkyNzEzNjY3LCJleHAiOjE2OTI3MTcyNjd9.JkFlnYqKN5lfEU5AWMBmtpH6_nDDZSqpvlIZQPlzpsM",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res);
        console.log("응잘되");
      })
      .catch((error) => {
        console.log(error);
        console.log("응안돼");
      });

    // const request = fetch("v1/cart/items", {
    //   method: "PATCH",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${token}`,
    //   },
    //   body: JSON.stringify({
    //     product_idx: productid,
    //     amount: productAmount,
    //   }),
    // })
    //   .then()
    //   .catch(() => {
    //     console.log("장바구니 응안돼");
    //   });
  };
  //구매하기
  //구매하기 api로 보낸다
  //데이터는 제품아이디, 수량, 가격
  const buyButton = () => {};

  //선택한 옵션으로 중복되지않게 옵션을만듬
  const finalSelectionOptions = (optiondata: string, optionType: string) => {
    setOption({ ...option, [optionType]: optiondata });
  };

  // console.log(option);

  return (
    <>
      <Container>
        {isLoading ? (
          <ImageBox>
            <img src={loadingImage} alt="dd" />
          </ImageBox>
        ) : (
          <ImageBox>
            <img src={responseProductData.product_img} alt="dd" />
          </ImageBox>
        )}

        <DescriptionBox>
          <ProductTitleDiv>
            <DivFlex className="설명제목">
              {isLoading ? (
                <ProductTitle></ProductTitle>
              ) : (
                <ProductTitle>{data.product_name}</ProductTitle>
              )}

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
              {isLoading ? "" : parseInt((data.price * 1.18).toString())} 원
              <span style={{ marginLeft: "1rem" }}>소비자가</span>
            </div>
            <div>
              {isLoading ? "" : data.price} 원
              <span style={{ marginLeft: "1rem" }}>루팡가</span>
            </div>
            <div></div>
            <HoverContainer>
              <CouponeButton>
                <Content
                  onClick={() => {
                    alert("ㅋㅋ없쥬?");
                  }}
                >
                  쿠폰발급
                </Content>
                <ButtonFill />
              </CouponeButton>
            </HoverContainer>
          </ProductPriceDiv>

          {/* 옵션 선택구간 */}
          {data.options ? (
            data.options.map((item: any, index: number) => (
              <Option
                key={index}
                option={item}
                finalSelectionOptions={finalSelectionOptions}
              />
            ))
          ) : (
            <></>
          )}

          {/* 수량표시하는곳 */}
          <ProductCounter>
            {isAmountInputBox ? (
              <>
                <Amount>수량</Amount>
                <DivFlex>
                  <MinusButton onClick={productAmountDown}>-</MinusButton>
                  <AmountInputbox
                    type="number"
                    onKeyDown={enterKeydown}
                    onBlur={amountInputboxBlur}
                    placeholder="수량을 입력해주세요"
                    autoFocus
                  />
                  <PlusButton onClick={productAmountUp}>+</PlusButton>
                </DivFlex>
                <Amount>재고 : {data.stock}</Amount>
              </>
            ) : (
              <>
                <Amount>수량</Amount>
                <DivFlex>
                  <MinusButton onClick={productAmountDown}>-</MinusButton>
                  <ProductAmount onClick={enterAmount}>
                    {productAmount}
                  </ProductAmount>
                  <PlusButton onClick={productAmountUp}>+</PlusButton>
                </DivFlex>
                <Amount>재고 : {data.stock}</Amount>
              </>
            )}
          </ProductCounter>

          {/* 장바구니 구매하기버튼 시작 */}
          <CartBuyButtonContainer>
            <ShopingCartContainer>
              <ShopingCartButton onClick={shopingCartButton}>
                <Content>장바구니</Content>
                <ShopingCartFill />
              </ShopingCartButton>
            </ShopingCartContainer>

            <CartModal isOpen={isModalOpen} onClose={closeModal}>
              <h2>장바구니에 담으시겠어요?</h2>
              <p>{data.product_name}</p>

              <p>이곳에 모달에 표시할 내용을 넣어주세요.</p>
            </CartModal>

            <BuyContainer>
              <BuyButton onClick={buyButton}>
                <Content>구매하기</Content>
                <BuyFill />
              </BuyButton>
            </BuyContainer>
          </CartBuyButtonContainer>
          <SimplePayment>
            <div>간편결제</div>
            <div>
              <img
                src={Kakaopaymenticon}
                alt=""
                onClick={() =>
                  kakaoPaymentfunction(
                    responseProductData.product_name,
                    productAmount,
                    responseProductData.price
                  )
                }
              />
            </div>
          </SimplePayment>
        </DescriptionBox>
      </Container>

      <DetailDescriptionBox isMoreView={isMoreView}>
        <DescriptionImage src={responseProductData.description_img} alt="" />
      </DetailDescriptionBox>
      <MoreViewButtonBox>
        {isMoreView ? (
          <BuyContainer>
            <BuyButton onClick={ProductInformationMoreViewHandler}>
              <Content>상품정보 더보기 △</Content>
              <BuyFill />
            </BuyButton>
          </BuyContainer>
        ) : (
          <BuyContainer>
            <BuyButton onClick={ProductInformationMoreViewHandler}>
              <Content>상품정보 더보기 ▽</Content>
              <BuyFill />
            </BuyButton>
          </BuyContainer>
        )}
      </MoreViewButtonBox>
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
const ImageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5px;
  width: 500px;
  height: 500px;
`;
const DescriptionBox = styled.div`
  margin: 5px;
  width: 500px;
  height: 500px;

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
const AmountInputbox = styled.input`
  &:focus {
    outline: none;
  }
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
`;
const ProductAmount = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  width: 100px;
  border: 1px solid black;
  padding: 1rem;
  text-align: center;
`;

const PlusButton = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  width: 60px;
  border: 1px solid black;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
`;
const MinusButton = styled.div`
  font-size: 1.1rem;
  font-weight: bold;
  width: 60px;
  border: 1px solid black;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
`;

const DetailDescriptionBox = styled.div<DetailDescriptionBoxProps>`
  display: block;
  position: relative;
  width: 100%;
  height: ${({ isMoreView }) => (isMoreView ? "auto" : "1500px")};
  overflow: ${({ isMoreView }) => (isMoreView ? "visible" : "hidden")};
`;

const DescriptionImage = styled.img`
  width: 100%;
`;

const MoreViewButtonBox = styled.div`
  width: 100%;
  height: 90px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
`;

//장바구니 구매하기 버튼 컨테이너
const CartBuyButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

//간편결제
const SimplePayment = styled.div`
  display: flex;
  flex-direction: column;
  div {
    margin-bottom: 0.5rem;
    img {
      cursor: pointer;
      &:hover {
        scale: 1.1;
        transition: all 0.3s;
      }
    }
  }
`;
