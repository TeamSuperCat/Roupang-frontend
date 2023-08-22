import { styled } from "styled-components";
// import { useRouter } from "../../hooks/useRouter";
interface ProductCardProps {
  item: ItemData;
}

function ProductCard({ item }: ProductCardProps) {
  const randomNum = Math.floor(Math.random() * 30) + 20;
  const upPrice = item.price + item.price * (randomNum * 0.01);

  return (
    <CardWrapper>
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
  width: 95%;
  height: 95%;
  grid-template-rows: 3fr 1fr;
  margin: 14px 14px 14px 0;
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

  &:nth-child(1) {
    color: #31caae;
  }

  &:nth-child(2) {
    font-size: 15px;
    text-decoration: line-through;
    color: #cccccc;
    font-weight: 400;
    line-height: 1.1;
  }
  &:nth-child(3) {
    color: #555555;
  }
`;
