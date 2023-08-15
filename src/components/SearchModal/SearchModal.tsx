import React from "react";
import styled from "styled-components";

const SearchModal = () => {
  return <SearchModalWrapper></SearchModalWrapper>;
};

export default SearchModal;

const SearchModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
