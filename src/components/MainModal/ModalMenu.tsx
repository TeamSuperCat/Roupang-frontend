import { styled } from "styled-components";
import { BsThreeDotsVertical, BsBell, BsClock, BsStar } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import MenuBtn from "./MenuBtn";
import useHandleModal from "../../hooks/useHandleModal";

interface Props {
  category: string;
  onClick: (category: TitleKey) => void;
}

function ModalMenu({ onClick, category }: Props) {
  const { isOpen, toggleModal, openModal } = useHandleModal();

  const handleClick = () => {
    toggleModal();
  };

  const handleActive = (category: TitleKey) => {
    onClick(category);
    openModal();
  };

  return (
    <ModalMenuLayOut>
      <BtnWrapper>
        <MenuBtn
          primary={true}
          rotateState={isOpen}
          onClick={handleClick}
          text={isOpen ? "닫기" : "열기"}
        >
          <BsThreeDotsVertical />
        </MenuBtn>
        <MenuBtn
          text="고객센터"
          onClick={() => handleActive("customer")}
          category={category === "customer" && isOpen}
        >
          <BsBell />
        </MenuBtn>
        <MenuBtn
          text="마이샵"
          onClick={() => handleActive("myshop")}
          category={category === "myshop" && isOpen}
        >
          <CgProfile />
        </MenuBtn>
        <MenuBtn
          text="최근 본 상품"
          onClick={() => handleActive("recent")}
          category={category === "recent" && isOpen}
        >
          <BsClock />
        </MenuBtn>
        <MenuBtn
          text="관심 상품"
          onClick={() => handleActive("interest")}
          category={category === "interest" && isOpen}
        >
          <AiOutlineHeart />
        </MenuBtn>
        <MenuBtn
          text="좋아요"
          onClick={() => handleActive("like")}
          category={category === "like" && isOpen}
        >
          <BsStar />
        </MenuBtn>
      </BtnWrapper>
    </ModalMenuLayOut>
  );
}

export default ModalMenu;

const ModalMenuLayOut = styled.div`
  position: absolute;
  top: 50%;
  height: 290px;
  width: 70px;
  transform: translate3d(-70px, -50%, 0);
  background-color: white;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  display: grid;
  align-items: center;
  @media (max-width: 950px) {
    display: none;
  }
`;

const BtnWrapper = styled.ul`
  display: grid;
  align-content: space-around;
  justify-content: center;
  width: 70px;
  height: 240px;
`;
