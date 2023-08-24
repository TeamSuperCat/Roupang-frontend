import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import image from "../../assets/test/carousel04.jpg";
import descImage from "../../assets/test/descImage.jpg";
import styled from "styled-components";
import axiosClient from "../../api/axios";
import Kakaopaymenticon from "../../assets/test/payment_icon_yellow_medium.png";
import kakaoPaymentfunction from "../../api/KakaoPayment";
import loadingImage from "../../assets/test/loading.gif";
import Option from "./Option";
import { immediatPayment, cartHeaderview } from "../../slice/cartSlice";
import { useCartDispatch } from "../../hooks/useCartDispatch";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";

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
///컴포넌트시작
const DetailDescription = () => {
  const dispatch = useAppDispatch();
  const { productid } = useParams();
  const navigate = useNavigate();
  const [isMoreView, setIsMoreView] = useState<boolean>(false);
  const [productAmount, setProductAmount] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAmountInputBox, setIsAmountInputbox] = useState<boolean>(false);
  const [data, setData] = useState({
    stock: 0,
    product_name: "",
    price: 0,
    options: [],
    product_img: "",
    description_img: "",
  });
  const [option, setOption] = useState<Record<string, string>>({});
  const { getCartlisting } = useCartDispatch();
  const cartLength = useAppSelector((state) =>
    state.cart.items ? state.cart.items.length : 0
  );

  const product_id: string | undefined = productid;

  useEffect(() => {
    axiosClient.get(`products/${product_id}`).then((res) => {
      // axiosClient.get(`products/65`).then((res) => {
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
  const shopingCartButton = async () => {
    //선택된 옵션들 입니다
    const optionName = Object.keys(option);
    let 보낼객체형태임 = "";
    //선택된옵션갯수 === 실제옵션갯수
    if (optionName.length === data.options.length) {
      for (let i = 0; i < optionName.length; i++) {
        //옵션을 선택을안하면 "" 빈칸이 찍힙니다
        보낼객체형태임 =
          보낼객체형태임 + `${optionName[i]}:${option[optionName[i]]}` + ",";
        if (option[optionName[i]] === "") {
          alert("옵션을 선택해주세요");
          return;
        }
      }
    } else {
      alert("옵션을 선택해주세요");
      return;
    }

    await axiosClient
      .post(
        `/cart`,

        {
          amount: productAmount,
          optionDetail: 보낼객체형태임,
          productIdx: product_id,
        }
      )
      .then((res) => {
        alert("장바구니 완료 쇼핑을 계쏙 하쎄용");
        dispatch(cartHeaderview(cartLength + 1));
      })
      .catch((error) => {
        alert("에러입니다!");
      });
    getCartlisting();
  };
  //구매하기
  const buyButton = async () => {
    const optionName = Object.keys(option);
    let 보낼객체형태임 = "";
    //선택된옵션갯수 === 실제옵션갯수
    if (optionName.length === data.options.length) {
      for (let i = 0; i < optionName.length; i++) {
        //옵션을 선택을안하면 "" 빈칸이 찍힙니다
        보낼객체형태임 =
          보낼객체형태임 + `${optionName[i]}:${option[optionName[i]]}` + ",";
        if (option[optionName[i]] === "") {
          alert("옵션을 선택해주세요");
          return;
        }
      }
    } else {
      alert("옵션을 선택해주세요");
      return;
    }

    let payload = {
      amount: productAmount,
      optionDetail: 보낼객체형태임,
      productIdx: product_id,
    };
    await dispatch(immediatPayment(payload));
    navigate("/order");
  };

  //선택한 옵션으로 중복되지않게 옵션을만듬
  const finalSelectionOptions = (
    optiondata: string | null,
    optionType: string | null
  ) => {
    if (optionType !== null && optiondata !== null) {
      setOption({ ...option, [optionType]: optiondata });
    }
  };

  // console.log(option);

  return (
    <>
      <Container>
        {isLoading ? (
          <ImageBox>
            <ProductImage src={loadingImage} alt="dd" />
          </ImageBox>
        ) : (
          <ImageBox>
            <ProductImage src={data.product_img} alt="dd" />
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

      <DetailDescriptionBox $isMoreView={isMoreView}>
        <DescriptionImage src={data.description_img} alt="" />
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
  /* position: relative; */
  display: flex;
  justify-content: center;
  align-items: center;
  object-fit: cover;
  overflow: hidden;
  margin: 5px;
  width: 500px;
  height: 500px;
`;

const ProductImage = styled.img`
  width: 100%;
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

const DetailDescriptionBox = styled.div<{ $isMoreView?: boolean }>`
  display: block;
  position: relative;
  width: 100%;
  height: ${({ $isMoreView }) => ($isMoreView ? "auto" : "1500px")};
  overflow: ${({ $isMoreView }) => ($isMoreView ? "visible" : "hidden")};
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
