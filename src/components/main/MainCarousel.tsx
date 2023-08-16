import React from "react";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import styled from "styled-components";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const mainimagelist: string[] = [
  "src/assets/test/carousel02.jpg",
  "src/assets/test/carousel02.jpg",
  "src/assets/test/carousel02.jpg",
  "src/assets/test/carousel02.jpg",
  "src/assets/test/carousel02.jpg",
  "src/assets/test/carousel02.jpg",
  "src/assets/test/carousel02.jpg",
];

const MainCarousel: React.FC = () => {
  const renderCustomIndicator = (
    clickHandler: (e: React.MouseEvent | React.KeyboardEvent) => void,
    isSelected: boolean,
    index: number,
    label: string
  ) => {
    // 이 함수 안에서 커스텀 인디케이터를 렌더링합니다.
    const customStyle: React.CSSProperties = {
      background: isSelected ? "gray" : "white",
      width: "10px",
      height: "10px",
      margin: "5px 5px",
      cursor: "pointer",
      borderRadius: "5px",
    };

    return (
      <li
        style={customStyle}
        onClick={clickHandler}
        onKeyDown={clickHandler}
        role="button"
        tabIndex={0}
        aria-label={label}
        key={index}
      />
    );
  };

  return (
    <CarouselContainer>
      <CustomCarousel
        dynamicHeight={true}
        autoPlay={true}
        showThumbs={false}
        renderIndicator={renderCustomIndicator}
        infiniteLoop={true}
      >
        {mainimagelist.map((item, index) => {
          return (
            <div key={index}>
              <CarouselImgDiv>
                <img src={item} />
              </CarouselImgDiv>
              <Infomation>
                <InfomationLeft>
                  <div>제목입니다.</div>
                  <div>설명입니다.</div>
                  <button>버튼</button>
                </InfomationLeft>
                <InfomationRight></InfomationRight>
              </Infomation>
            </div>
          );
        })}
      </CustomCarousel>
    </CarouselContainer>
  );
};

export default MainCarousel;
const CarouselContainer = styled.div`
  width: 100%;
  height: 400px;
  position: relative;
  margin-bottom: 50px;
  .carousel-root {
    height: 100%;
    .carousel {
      height: 100%;
      .slider-wrapper {
        height: 100%;
        ul {
          height: 100%;
          li {
            height: 100%;
            div {
              height: 100%;
              img {
                object-fit: cover;
              }
            }
          }
        }
      }
    }
  }
`;

const CarouselImgDiv = styled.div`
  object-fit: fill;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
`;

const CustomCarousel = styled(Carousel)`
  .control-dots {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 2rem;
    width: 94%;
    height: 100%;
  }
`;

const Infomation = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`;

const InfomationLeft = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  height: 100%;
  background-color: #62ff4dba;
`;
const InfomationRight = styled.div`
  width: 50%;
  height: 100%;
`;
