import { styled } from "styled-components";
import { BsThreeDotsVertical, BsBell, BsClock, BsStar } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import MenuBtn from "./MenuBtn";
import useToggleModal from "../../hooks/useToggleModal";

function ModalMenu() {
  const { isOpen, toggleModal } = useToggleModal();

  const handleClick = () => {
    toggleModal();
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
        <MenuBtn text="고객센터">
          <BsBell />
        </MenuBtn>
        <MenuBtn text="마이샵">
          <CgProfile />
        </MenuBtn>
        <MenuBtn text="최근 본 상품">
          <BsClock />
        </MenuBtn>
        <MenuBtn text="관심 상품">
          <AiOutlineHeart />
        </MenuBtn>
        <MenuBtn text="좋아요">
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
  transform: translate3d(-100px, -50%, 0);
  background-color: white;
  border-top-left-radius: 14px;
  border-bottom-left-radius: 14px;
  display: grid;
  align-items: center;
`;

const BtnWrapper = styled.ul`
  display: grid;
  align-content: space-around;
  justify-content: center;
  width: 70px;
  height: 240px;
`;
