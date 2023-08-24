import { styled } from "styled-components";
import { useRouter } from "../../../../hooks/useRouter";
import useHandleModal from "../../../../hooks/useHandleModal";

interface Props {
  productName: string;
  price: number;
  productImg: string;
  productIdx: number;
}

interface ProductImg {
  img: string;
}

function ProductModalCard({
  productName,
  productImg,
  price,
  productIdx,
}: Props) {
  const { routeTo } = useRouter();
  const { closeModal } = useHandleModal();

  return (
    <ProductCardWrap
      onClick={() => {
        closeModal();
        routeTo(`/detail/${productIdx}`);
      }}
    >
      <ProductImg img={productImg} />
      <ProductDescWrap>
        <ProductTitle>{productName}</ProductTitle>
        <ProductPrice>{`${price.toLocaleString()}원`}</ProductPrice>
      </ProductDescWrap>
    </ProductCardWrap>
  );
}

export default ProductModalCard;

const ProductCardWrap = styled.li`
  display: grid;
  grid-template-columns: 70px 1fr;
  border-bottom: 1px solid rgb(68, 68, 68, 0.1);
  padding-bottom: 20px;
  margin-bottom: 20px;
  cursor: pointer;

  &:last-child {
    border-bottom: none;
  }
`;

const ProductImg = styled.div<ProductImg>`
  height: 100%;
  width: 60px;
  aspect-ratio: 1 / 1;
  background-image: ${({ img }) => `url(${img})`};
  background-repeat: no-repeat;
  background-size: contain;
  margin-right: 10px;
`;

const ProductDescWrap = styled.div`
  display: grid;
  font-weight: 500;
  color: rgba(68, 68, 68, 0.95);
`;

const ProductTitle = styled.h1`
  display: flex;
  align-items: center;
  font-size: 13px;

  &:hover {
    color: var(--primary-color);
  }
`;

const ProductPrice = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
`;
