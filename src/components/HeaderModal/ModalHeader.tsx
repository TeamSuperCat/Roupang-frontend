import { styled } from "styled-components";

interface Props {
  category?: TitleKey;
}

interface LanguagePair {
  kor: string;
  eng: string;
}

type TitleType<T extends string> = Record<T, LanguagePair>;

const title: TitleType<TitleKey> = {
  myshop: {
    kor: "내 쇼핑정보",
    eng: "MY SHOP",
  },
  recent: {
    kor: "최근 본 상품",
    eng: "RECENT",
  },
  interest: {
    kor: "내 관심상품",
    eng: "WISHLIST",
  },
  like: {
    kor: "좋아요",
    eng: "LIKE",
  },
  customer: {
    kor: "고객센터",
    eng: "CUSTOMER",
  },
};

function ModalHeader({ category }: Props) {
  return (
    <MyShopHeader>
      <div>{!category ? "값이 없음" : title[category].kor}</div>
      <i></i>
      <HeaderEng>{!category ? "값이 없음" : title[category].eng}</HeaderEng>
      <MoreBtn>더보기</MoreBtn>
    </MyShopHeader>
  );
}

export default ModalHeader;

const MyShopHeader = styled.div`
  display: flex;
  padding-top: 25px;
  font: inherit;
  font-weight: bold;
  position: relative;
  margin-bottom: 30px;

  &::before {
    content: "";
    height: 3px;
    position: absolute;
    top: 45.2px;
    left: 0;
    width: 240px;
    background-color: rgba(128, 128, 128, 0.2);
    text-size-adjust: none;
  }

  & > div:nth-child(1) {
    font-size: 13px;
    padding-bottom: 7px;
    border-bottom: 3.5px solid black;
    z-index: 2;
    margin-right: 20px;
  }

  & > i {
    top: 28px;
    border-right: 1.5px solid rgba(128, 128, 128, 0.3);
    height: 9px;
    /* background-color: rgba(128, 128, 128, 0.3); */
  }
`;

const HeaderEng = styled.div`
  font-size: 11px;
  margin-left: 25px;
  color: rgba(128, 128, 128, 0.5);
`;

const MoreBtn = styled.p`
  position: absolute;
  right: 10px;
  top: 27px;
  font-size: 11px;
  cursor: pointer;
`;
