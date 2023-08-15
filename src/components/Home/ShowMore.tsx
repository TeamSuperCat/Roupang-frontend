import { styled } from "styled-components";
import { SlArrowRight } from "react-icons/sl";

function ShowMore() {
  return (
    <ShowMoreBtnWrapper>
      <ShowMoreBtn>
        <SlArrowRight />
      </ShowMoreBtn>
    </ShowMoreBtnWrapper>
  );
}

export default ShowMore;

const ShowMoreBtnWrapper = styled.div.attrs({ className: `size` })`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  min-height: 350px;
`;

const ShowMoreBtn = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  &&&&&&&&&&&&&&& {
    color: black;
    background: none;
    outline: none;
    border: none;
  }
  font-size: 25px;
  cursor: pointer;
`;
