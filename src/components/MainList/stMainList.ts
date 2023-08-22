import styled from "styled-components";

export const ListWrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  place-items: center;
  grid-row-gap: 30px;
  grid-column-gap: 5px;
  margin-top: 10px;
  .observer {
    width: 100px;
    height: 100px;
    background-color: transparent;
    position: absolute;
    bottom: 100px;
  }
`;
