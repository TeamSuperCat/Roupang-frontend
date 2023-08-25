import React from "react";
import styled from "styled-components";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import "swiper/css";

const mainimagelist: string[] = [
  "src/assets/test/carousel16.png",
  "src/assets/test/carousel16.png",
  "src/assets/test/carousel16.png",
  "src/assets/test/carousel16.png",
  "src/assets/test/carousel16.png",
  "src/assets/test/carousel16.png",
];

const MainCarousel: React.FC = () => {
  return (
    <>
      <Test>
        <StyledSwiper
          modules={[Navigation, Pagination]}
          loop={true}
          pagination={{ clickable: true }}
          navigation
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log("slide change")}
        >
          {mainimagelist.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <CarouselImgDiv>
                  <img src={item} />
                </CarouselImgDiv>
                {/* <Infomation>
                    <InfomationLeft>
                      <div>제목입니다.</div>
                      <div>설명입니다.</div>
                      <button>버튼</button>
                    </InfomationLeft>
                    <InfomationRight></InfomationRight>
                  </Infomation> */}
              </SwiperSlide>
            );
          })}
        </StyledSwiper>
      </Test>
    </>
  );
};

const Test = styled.div`
  margin-bottom: 60px;
  .swiper-pagination {
    text-align: right;
    & span:last-child {
      margin-right: 17px;
    }
  }
`;
const CarouselImgDiv = styled.div`
  overflow: hidden;
  display: flex;
  align-items: center;
  background-color: #ffeca7;
  width: 100%;
  @media (max-width: 1300px) {
    height: 234.27px;
  }
  @media (max-width: 840px) {
    height: 254.27px;
  }
  @media (max-width: 680px) {
    height: 214.27px;
  }
  img {
    width: 100%;
    /* height: 100%; */
    height: 214.27px; // 이미지 원본 높이값에 고정
    @media (max-width: 1300px) {
      height: 75%;
      transform: scale(1.2);
    }
    @media (max-width: 1150px) {
      height: 62.5%;
      transform: scale(1.35);
    }
    @media (max-width: 950px) {
      height: 61.5%;
      transform: scale(1.4);
    }
    @media (max-width: 840px) {
      height: 48%;
      transform: scale(1.5);
    }
    @media (max-width: 750px) {
      height: 46%;
      /* transform: scale(1.6); */
    }
    @media (max-width: 680px) {
      width: 500%;
      height: 92%;
      transform: scale(2);
      transform: translateX(-15.8%);
    }
    @media (max-width: 415px) {
      transform: translateX(-15%);
    }
    @media (max-width: 376px) {
      transform: translateX(-15.8%);
    }
    @media (max-width: 281px) {
      transform: translateX(-18.98%);
      height: 85%;
    }
  }
`;

// const Infomation = styled.div`
//   width: 100%;
//   height: 100%;
//   position: absolute;
//   left: 0;
//   top: 0;
// `;

// const InfomationLeft = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   flex-direction: column;
//   width: 50%;
//   height: 100%;
//   background-color: #62ff4dba;
// `;
// const InfomationRight = styled.div`
//   width: 50%;
//   height: 100%;
// `;
const StyledSwiper = styled(Swiper)`
  .swiper-button-prev {
    &::after {
      /* content: "<"; 변경할 아이콘 또는 텍스트 추가 */
      font-size: 35px; /* 아이콘 크기 조정 */
      color: rgba(51, 51, 51, 0.5); /* 아이콘 색상 조정 */
    }
  }

  .swiper-button-next {
    &::after {
      /* content: ">"; 변경할 아이콘 또는 텍스트 추가 */
      font-size: 35px; /* 아이콘 크기 조정 */
      color: rgba(51, 51, 51, 0.5); /* 아이콘 색상 조정 */
    }
  }
`;

export default MainCarousel;
