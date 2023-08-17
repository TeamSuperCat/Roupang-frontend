import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Portal from "../components/Portal";
import Modal from "../components/MainModal/MainModal";
import useToggleModal from "../hooks/useToggleModal";

const HeaderLayout = () => {
  const { isOpen } = useToggleModal();

  return (
    <LayOut>
      <Wrapper>
        <Header />
        <Outlet />
        <Footer />
      </Wrapper>
      {isOpen && <Portal />}
      <Modal />
    </LayOut>
  );
};

export default HeaderLayout;

const LayOut = styled.div`
  height: 100vh;
  width: 100vw;
  position: relative;
`;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  max-width: 1210px;
  height: auto;
  margin: 0 auto;
`;
