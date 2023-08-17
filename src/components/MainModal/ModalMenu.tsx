import { styled } from "styled-components";
import { BsThreeDotsVertical, BsBell, BsClock, BsStar } from "react-icons/bs";
import { CgProfile } from "react-icons/cg";
import { AiOutlineHeart } from "react-icons/ai";
import MenuBtn from "./MenuBtn";
import useToggleModal from "../../hooks/useToggleModal";
import { useState } from "react";

function ModalMenu() {
  const { toggleModal } = useToggleModal();
  const [rotateState, setRotateState] = useState(false);

  const handleClick = () => {
    toggleModal();
    setRotateState(!rotateState);
  };

  return (
    <ModalMenuLayOut>
      <BtnWrapper>
        <MenuBtn primary={true} rotateState={rotateState} onClick={handleClick}>
          <BsThreeDotsVertical />
        </MenuBtn>
        <MenuBtn>
          <BsBell />
        </MenuBtn>
        <MenuBtn>
          <CgProfile />
        </MenuBtn>
        <MenuBtn>
          <BsClock />
        </MenuBtn>
        <MenuBtn>
          <AiOutlineHeart />
        </MenuBtn>
        <MenuBtn>
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
  background-color: #fff;
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
