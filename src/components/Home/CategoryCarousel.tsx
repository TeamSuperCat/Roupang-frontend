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
  const [isDrag, setIsDrag] = useState(false);
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
    slidesToScroll: 4,
    arrows: false,
    afterChange: (current) => {
      setIsDrag(false);
      setIsLastSlide(current === slidesCount);
    },
    beforeChange: () => {
      setIsDrag(true);
    },
    onSwipe: (direction) => {
      if (isLastSlide && direction === "left") {
        handleCategorySelect(category);
      }
    },
  };

  return (
    <CarouselWrapper>
      <CategoryH1>{data[0].category_name}</CategoryH1>
      <SlickSlider {...settings}>
        {data.map((item, i) => (
          <ProductCard key={i} item={item} $isDrag={isDrag} />
        ))}
        <ShowMore onClick={() => handleCategorySelect(category)} />
      </SlickSlider>
      {/* Slider{" "} */}
    </CarouselWrapper>
  );
}

export default CategoryCarousel;

const SlickSlider = styled(Slider)`
  .slick-track {
    margin: 0;
    margin-bottom: 40px;
    margin-left: -20px;
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    @media (max-width: 640px) {
      gap: 14px;
      margin-left: -14px;
    }
  }
  .slick-slide > div {
    @media (max-width: 830px) {
      width: 180px;
    }
    @media (max-width: 640px) {
      width: 140px;
    }
  }
  .slick-slide,
  .slick-active,
  .slick-current {
    @media (max-width: 830px) {
      width: 180px !important;
    }
    @media (max-width: 640px) {
      width: 140px !important;
    }
    & > div > li {
      @media (max-width: 950px) {
        grid-template-rows: 2fr 1fr;
        min-height: 200px;
      }
      & > div > div > a > span {
        @media (max-width: 640px) {
          font-size: 14px;
        }
      }
      & > div > div:last-child > span {
        margin-right: 6px;
        &:nth-child(1) {
          @media (max-width: 640px) {
            font-size: 14px;
          }
        }
        &:nth-child(2) {
          @media (max-width: 640px) {
            font-size: 11px;
          }
        }
        &:nth-child(3) {
          @media (max-width: 640px) {
            font-size: 12px;
          }
        }
      }
    }
  }
`;

const CarouselWrapper = styled.div`
  /* width: 98vw;
  max-width: 1210px; */
  width: 100%;
  /* min-height: 400px; */
  /* padding-right: 40px; */
  display: flex;
  flex-direction: column;
`;

const CategoryH1 = styled.h1`
  font-size: 20px;
  font-weight: bold;
  font-family: "Jost", sans-serif;
  padding-bottom: 15px;
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;
