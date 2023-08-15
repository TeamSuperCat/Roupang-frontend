import { styled } from "styled-components";
import { PiArrowFatLineRightDuotone } from "react-icons/pi";

function ShowMore() {
  return (
    <ShowMoreBtnWrapper>
      <ShowMoreBtn>{PiArrowFatLineRightDuotone}</ShowMoreBtn>
    </ShowMoreBtnWrapper>
  );
}

export default ShowMore;

const ShowMoreBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 20vw;
  width: 15vw;
`;

const ShowMoreBtn = styled.button`
  width: 4vw;
  height: 4vw;
  border-radius: 50%;
  background-color: none;
  outline: none;
  cursor: pointer;
`;
