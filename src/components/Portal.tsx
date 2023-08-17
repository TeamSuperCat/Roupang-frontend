import ReactDOM from "react-dom";
import { styled } from "styled-components";
import useToggleModal from "../hooks/useToggleModal";
// import Modal from "./Modal";

// type PortalReturnType = React.ReactPortal | React.ReactNode;

// interface PortalProps extends PropsWithChildren {}

interface ModalProps {
  onClick: NoneEvent | undefined;
}

function Portal({ children }: IChildrenProps) {
  const portal = document.querySelector("#portal");
  const { isOpen, toggleModal } = useToggleModal();

  // const handleOpen = () => {
  //   setIsOpen(!isOpen);
  // };

  // const modifiedChildren = React.Children.map(children, (child) => {
  //   if (React.isValidElement<ModalProps>(child) && child.type === Modal) {
  //     return React.cloneElement(child, { isOpen, onClick: handleOpen });
  //   }
  //   return child;
  // });

  if (!portal) return <div>포탈 없음</div>;

  return ReactDOM.createPortal(
    <>
      {isOpen && (
        <ModalWrapper onClick={toggleModal}>
          {/* {modifiedChildren} */}
        </ModalWrapper>
      )}
    </>,
    portal
  );
}

export default Portal;

const ModalWrapper = styled.div<ModalProps>`
  width: 100vw;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.5);
  position: fixed;
  top: 0;
  z-index: 500;
`;
