import React from "react";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";
import { styled } from "styled-components";

const HeaderLayout = () => {
  return (
    <Wrapper>
      <Header />
      <Outlet />
    </Wrapper>
  );
};

export default HeaderLayout;

const Wrapper = styled.div`
  width: 100%;
  max-width: 1210px;
  height: auto;
  margin: 0 auto;
`;
