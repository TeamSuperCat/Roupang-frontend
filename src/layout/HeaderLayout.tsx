import { Outlet } from "react-router-dom";
import { styled } from "styled-components";
import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

const HeaderLayout = () => {
  return (
    <>
      <Wrapper>
        <Header />
        <Outlet />
        <Footer />
      </Wrapper>
    </>
  );
};

export default HeaderLayout;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1210px;
  height: auto;
  margin: 0 auto;
`;
