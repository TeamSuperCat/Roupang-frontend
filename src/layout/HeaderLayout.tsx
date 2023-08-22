import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";
import Portal from "../components/Portal";
import Modal from "../components/MainModal/MainModal";
import useHandleModal from "../hooks/useHandleModal";

const HeaderLayout = () => {
  const { isOpen } = useHandleModal();

  return (
    <LayOut>
      <Wrapper>
        <Header />
        <Outlet />
      </Wrapper>
      {isOpen && <Portal />}
      <Modal />
      <Footer />
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
  transition: all ease-in-out 0.2s;
  @media (max-width: 1300px) {
    max-width: 1000px;
  }
  @media (max-width: 1150px) {
    max-width: 840px;
  }
  @media (max-width: 950px) {
    max-width: 90%;
  }
`;
