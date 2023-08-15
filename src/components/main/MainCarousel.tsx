import React from "react";
import styled from "styled-components";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
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
      <StyledSwiper
        modules={[Navigation]}
        loop={true}
        navigation
        spaceBetween={50}
        slidesPerView={1}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        <div className="hajinsoo">
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
        </div>
      </StyledSwiper>
    </>
  );
};

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
