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
<<<<<<< HEAD
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
=======
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
          onSwiper={(swiper) => console.log(swiper)}
        >
          {mainimagelist.map((item, index) => {
            return (
              <>
                <SwiperSlide>
                  <CarouselImgDiv key={index}>
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
                </SwiperSlide>
              </>
            );
          })}
        </StyledSwiper>
      </Test>
    </>
>>>>>>> 4b9ff529f6f6c11f75b97815a5670e0f2d46b0ce
  );
};

const Test = styled.div`
  margin-bottom: 60px;
  .swiper-pagination {
    text-align: right;
  }
`;
const CarouselImgDiv = styled.div`
  overflow: hidden;
  img {
    width: 100%;
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
const StyledSwiper = styled(Swiper)`
  .swiper-button-prev {
    &::after {
      content: "<"; /* 변경할 아이콘 또는 텍스트 추가 */
      font-size: 35px; /* 아이콘 크기 조정 */
      color: #000000; /* 아이콘 색상 조정 */
    }
  }

  .swiper-button-next {
    &::after {
      content: ">"; /* 변경할 아이콘 또는 텍스트 추가 */
      font-size: 35px; /* 아이콘 크기 조정 */
      color: #000000; /* 아이콘 색상 조정 */
    }
  }
`;

export default MainCarousel;
