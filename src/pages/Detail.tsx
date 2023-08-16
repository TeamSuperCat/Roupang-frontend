import React from "react";
import styled from "styled-components";
import DetailDescription from "../components/detail/DetailDescription";

const Detail = () => {
  return (
    <>
      <Container>
        <DetailDescription></DetailDescription>
      </Container>
    </>
  );
};

export default Detail;

const Container = styled.div`
  border: 1px solid black;
`;
