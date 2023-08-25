import styled from "styled-components";
import ModalMenu from "./ModalMenu";
import useToggleModal from "../../hooks/useHandleModal";
import MenuBtn from "../MainModal/MenuBtn";
import { RxCross2 } from "react-icons/rx";
import ModalHeader from "../MainModal/ModalHeader";
import MyShop from "../MainModal/ModalCard/UserStatus/MyShop";
import { useEffect, useState } from "react";
import Recent from "../MainModal/ModalCard/Recent/Recent";

interface IModalCard {
  $isOpen: boolean;
}

type ModalPropstwo = IModalCard & HasClickEvent;

function switchComponent(category: string): React.ReactNode {
  switch (category) {
    case "myshop":
      return <MyShop />;
    case "recent":
      return <Recent />;
    case "favorite":
      return;
  }
}

function MainModal() {
  const [category, setCategory] = useState<TitleKey>("myshop");
  const { isOpen, toggleModal } = useToggleModal();
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  const switchCategory = (current: TitleKey) => {
    setCategory(current);
  };

  useEffect(() => {
    const preventBodyScroll = () => {
      if (isOpen) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "visible";
      }
    };

    preventBodyScroll();

    return () => {
      document.body.style.overflow = "visible";
    };
  }, [isOpen]);

  return (
    <ModalCard $isOpen={isOpen} onClick={handleClick}>
      <ModalTop>
        <ModalTitle>마이쇼핑</ModalTitle>
      </ModalTop>
      <ModalContent>
        <ModalHeader category={category} />
        {switchComponent(category)}
      </ModalContent>
      <ModalMenu onClick={switchCategory} category={category} />
      <BtnWrap onClick={toggleModal}>
        <MenuBtn text='닫기'>
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
  ${({ $isOpen }) => !$isOpen && { transform: "translateX(300px)" }};
`;

const ModalTop = styled.div`
  display: flex;
  align-items: flex-end;
  padding-left: 30px;
`;

const ModalContent = styled.div`
  margin: 30px;
  border-top: 1px solid rgba(0, 0, 0, 0.4);
  overflow: auto;
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
