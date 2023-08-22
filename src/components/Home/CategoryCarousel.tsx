import { styled } from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import ProductCard from "./ProductCard";
import { useState } from "react";
import ShowMore from "./ShowMoreButton";
import { useRouter } from "../../hooks/useRouter";
import { getItems } from "../../slice/ItemSlice";
import { AppDispatch } from "../../store/store";
import { useAppDispatch } from "../../hooks/useDispatch";
import { getCatenum } from "../../slice/ItemSlice";

interface CategoryCarouselProps {
  data: ItemData[];
  category: number;
}

function CategoryCarousel({ data, category }: CategoryCarouselProps) {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const { routeTo } = useRouter();
  const dispatch: AppDispatch = useAppDispatch();

  const handleCategorySelect = (category: number | string): void => {
    dispatch(getItems(category));
    dispatch(getCatenum(category));

    routeTo("/main");
  };

  const slidesCount = data.length - 3; // 데이터의 길이  - 3

  const settings: Settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    lazyLoad: "ondemand",
    afterChange: (current) => {
      console.log(current);
      setIsLastSlide(current === slidesCount);
    },
    onSwipe: (direction) => {
      console.log(direction, isLastSlide);

      if (isLastSlide && direction === "left") {
        handleCategorySelect(category);
      }
    },
  };

  return (
    <CarouselWrapper>
      <CategoryH1>{data[0].category_name}</CategoryH1>
      <SlickSlider {...settings} className="">
        {data.map((item, i) => (
          <ProductCard key={i} item={item} />
        ))}
        <ShowMore onClick={() => handleCategorySelect(category)} />
      </SlickSlider>
    </CarouselWrapper>
  );
}

export default CategoryCarousel;

const SlickSlider = styled(Slider)`
  .slick-track {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    margin: 0;
  }
`;

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
