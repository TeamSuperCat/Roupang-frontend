import { styled } from "styled-components";
import { SlArrowRight } from "react-icons/sl";

interface Props {
  onClick: () => void;
}

function ShowMore({ onClick }: Props) {
  return (
    <ShowMoreBtnWrapper onClick={onClick}>
      <span>더 보기</span>
      <ShowMoreBtn>
        <SlArrowRight />
      </ShowMoreBtn>
    </ShowMoreBtnWrapper>
  );
}

export default ShowMore;

const ShowMoreBtnWrapper = styled.li.attrs({ className: `size` })`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95%;
  min-height: 350px;
  cursor: pointer;
  & span {
    font-size: 12px;
  }
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
