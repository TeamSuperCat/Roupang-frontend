import { styled } from "styled-components";
import { useRouter } from "../../hooks/useRouter";
import { useState } from "react";
import Loading from "../Loading/Loading";
import useStorage from "../../hooks/useStorage";

interface ProductCardProps {
  item: ItemData;
  $isDrag?: boolean;
}

function ProductCard({ item, $isDrag }: ProductCardProps) {
  const randomNum = Math.floor(Math.random() * 30) + 20;
  const upPrice = item.price + item.price * (randomNum * 0.01);
  const [isLoading, setIsLoading] = useState(false);
  const { routeTo } = useRouter();
  const { state, updateData } = useStorage();
  const handleClick = () => {
    if (!$isDrag) {
      setIsLoading(true);
      const recentList = localStorage.getItem("recent");
      if (!recentList) {
        updateData([item.product_idx]);
      }
      if (recentList) {
        const curr = [...state, item.product_idx];
        const tmp = curr.reduce(
          (a: number[], c) => (a.includes(c) ? a : [...a, c]),
          []
        );
        updateData(tmp);
      }

      setIsLoading(false);

      routeTo(`/detail/${item.product_idx}`);
    }
  };

  if (isLoading) return <Loading />;

  return (
    <CardWrapper onClick={handleClick}>
      <CardImgWrapper>
        <a>
          <CardImg
            //데이터 이미지경로 item.product_img
            src={
              "https://puppydog.co.kr/web/product/medium/202305/1270aa8f684d10bebc459d51d0ffc37a.jpg"
            }
          />
        </a>
      </CardImgWrapper>
      <CardInfoWrapper>
        <CardTitleWrapper>
          <CardLink>
            <CardText>{item.product_name}</CardText>
          </CardLink>
        </CardTitleWrapper>
        <CardPrice>
          <PriceText>{`${randomNum}%`}</PriceText>
          <PriceText>{`${~~upPrice}원`}</PriceText>
          <PriceText>{`${item.price.toLocaleString()}원`}</PriceText>
        </CardPrice>
      </CardInfoWrapper>
    </CardWrapper>
  );
}

export default ProductCard;

const CardWrapper = styled.li`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-rows: 3fr 1fr;
  font-family: "Jost", sans-serif;
  min-height: 250px;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.01);
  }
`;

const CardImgWrapper = styled.div``;

const CardImg = styled.img.attrs({ loading: "lazy" })`
  width: 100%;
  height: 100%;
  background-color: gray;
`;

const CardInfoWrapper = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr;
`;

const CardTitleWrapper = styled.div`
  display: grid;
  align-items: center;
  width: 100%;
`;

const CardLink = styled.a``;

const CardText = styled.span`
  font-size: 15px;
  font-weight: 700;
  color: #555555;
  overflow: hidden;
  white-space: normal;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: keep-all; // 문단으로 끊어져서 줄바꿈 됨
  letter-spacing: -0.5px;
`;

const CardPrice = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  border-top: 1px solid rgba(0, 0, 0, 0.07);
`;

const PriceText = styled.span`
  font-size: 17px;
  font-weight: 500;
  line-height: 1;
  margin-right: 10px;
  @media (max-width: 640px) {
    font-size: 15px;
  }

  &:nth-child(1) {
    color: #31caae;
  }

  &:nth-child(2) {
    font-size: 15px;
    text-decoration: line-through;
    color: #cccccc;
    font-weight: 400;
    line-height: 1.1;
    @media (max-width: 640px) {
      font-size: 13px;
    }
  }
  &:nth-child(3) {
    color: #555555;
  }
`;
