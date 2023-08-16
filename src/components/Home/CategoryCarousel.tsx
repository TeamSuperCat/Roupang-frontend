import { styled } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import ProductCard from "./ProductCard";
import { useState } from "react";
import ShowMore from "./ShowMoreButton";
import { useRouter } from "../../hooks/useRouter";

function CategoryCarousel() {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const { routeTo } = useRouter();

  const slidesCount = 17 - 3; // 데이터의 길이  - 3

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,
    lazyLoad: "ondemand",
    afterChange: (current) => {
      console.log(current);
      setIsLastSlide(current === slidesCount);
    },
    onSwipe: (direction) => {
      console.log(direction, isLastSlide);

      if (isLastSlide && direction === "left") {
        routeTo("/home");
      }
    },
  };

  return (
    <CarouselWrapper>
      <CategoryH1>간식 / 사료</CategoryH1>
      <Slider {...settings} className="">
        <ProductCard title="1번" />
        <ProductCard title="2번" />
        <ProductCard title="3번" />
        <ProductCard title="4번" />
        <ProductCard title="5번" />
        <ProductCard title="6번" />
        <ProductCard title="7번" />
        <ProductCard title="8번" />
        <ProductCard title="9번" />
        <ProductCard title="10번" />
        <ProductCard title="11번" />
        <ProductCard title="12번" />
        <ProductCard title="13번" />
        <ProductCard title="14번" />
        <ProductCard title="15번" />
        <ProductCard title="16번" />
        <ProductCard title={"17번"} />
        <ShowMore />
      </Slider>
    </CarouselWrapper>
  );
}

export default CategoryCarousel;

const CarouselWrapper = styled.div`
  width: 98vw;
  max-width: 1210px;
  min-height: 400px;
  padding-right: 40px;
  display: flex;
  flex-direction: column;
`;

const CategoryH1 = styled.h1`
  font-size: 1.4rem;
  font-weight: bold;
  padding-left: 10px;
  font-family: "Jost", sans-serif;
  letter-spacing: -2.5px;
`;
