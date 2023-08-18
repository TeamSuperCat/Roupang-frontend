import { styled } from "styled-components";
import ModalMenu from "./ModalMenu";
import useToggleModal from "../../hooks/useToggleModal";

type ClickEventTypeDiv = React.MouseEvent<HTMLDivElement>;

interface IModalCard {
  isOpen: boolean;
}

type ModalPropstwo = IModalCard & HasClickEvent;

function MainModal() {
  const { isOpen } = useToggleModal();
  const handleClick = (e: ClickEventTypeDiv) => {
    e.stopPropagation();
  };

  return (
    <ModalCard isOpen={isOpen} onClick={handleClick}>
      <ModalMenu />
    </ModalCard>
  );
}

export default MainModal;

const ModalCard = styled.div<ModalPropstwo>`
  position: fixed;
  top: 0;
  right: 0;
  height: 100vh;
  width: 300px;
  background-color: #fff;
  z-index: 1000;
  transition: transform 0.4s;
  ${({ isOpen }) => !isOpen && { transform: "translateX(300px)" }};
`;
