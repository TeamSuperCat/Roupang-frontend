import styled from "styled-components";
import ModalMenu from "./ModalMenu";
import useToggleModal from "../../hooks/useToggleModal";
import MenuBtn from "./MenuBtn";
import { RxCross2 } from "react-icons/rx";
import ModalHeader from "./ModalHeader";
import MyShop from "./MyShop";

interface IModalCard {
  isOpen: boolean;
}

type ModalPropstwo = IModalCard & HasClickEvent;

function MainModal() {
  const { isOpen, toggleModal } = useToggleModal();
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <ModalCard isOpen={isOpen} onClick={handleClick}>
      <ModalTop>
        <ModalTitle>마이쇼핑</ModalTitle>
      </ModalTop>
      <ModalContent>
        <ModalHeader />
        <MyShop />
      </ModalContent>
      <ModalMenu />
      <BtnWrap onClick={toggleModal}>
        <MenuBtn text="닫기">
          <RxCross2 />
        </MenuBtn>
      </BtnWrap>
    </ModalCard>
  );
}

export default MainModal;

const ModalCard = styled.div<ModalPropstwo>`
  position: fixed;
  box-sizing: border-box;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  background-color: white;
  z-index: 1000;
  transition: transform 0.4s;
  display: grid;
  grid-template-rows: 100px 1fr;
  ${({ isOpen }) => !isOpen && { transform: "translateX(300px)" }};
`;

const ModalTop = styled.div`
  display: flex;
  align-items: flex-end;
  padding-left: 30px;
`;

const ModalContent = styled.div`
  margin: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
`;

const ModalTitle = styled.h1`
  font-size: 21px;
  font-weight: 500;
  letter-spacing: -0.5px;
  vertical-align: baseline;
`;

const BtnWrap = styled.div`
  position: absolute;
  top: 25px;
  right: 25px;
  transform: scale(1.3);
`;