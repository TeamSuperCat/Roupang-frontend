import React from "react";
import image from "../../assets/test/carousel04.jpg";
import styled from "styled-components";
import icons from "../../assets/test/icons.png";
const DetailDescription = () => {
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
            <CouponeButton>쿠폰발급</CouponeButton>
          </ProductPriceDiv>

          <Productoption>
            <div>옵션선택</div>
          </Productoption>
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
const DescriptionBox = styled.div`
  margin: 5px;
  width: 500px;
  height: 500px;
  border: 1px solid black;
  padding: 1rem;
`;
const Imagemox = styled.div`
  margin: 5px;
  width: 500px;
  height: 500px;
  border: 1px solid black;
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

const CouponeButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 6rem;
  height: 2rem;
`;

const HartIcon = styled.div`
  margin-left: 1rem;
`;

const ShareIcon = styled.div`
  margin-left: 1rem;
`;

const Productoption = styled.div`
  padding: 0.5rem;

  border: 1px solid black;
`;
