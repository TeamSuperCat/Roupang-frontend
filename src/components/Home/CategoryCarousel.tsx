import { styled } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import ProductCard from "./ProductCard";
import { useState } from "react";
import ShowMore from "./ShowMoreButton";
import { useRouter } from "../../hooks/useRouter";

interface ItemData {
  category_name: string;
  description: string;
  description_img: string;
  options: string | null;
  price: number;
  product_idx: number;
  product_img: string;
  product_name: string;
  sales_end_date: string;
  stock: number;
}

interface CategoryCarouselProps {
  data: ItemData[];
}

function CategoryCarousel({ data }: CategoryCarouselProps) {
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
      <CategoryH1>{data[0].category_name}</CategoryH1>
      <Slider {...settings} className="">
        {data.map((item, i) => (
          <ProductCard key={i} item={item} />
        ))}
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
