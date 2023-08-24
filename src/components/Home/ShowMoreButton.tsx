import { styled } from "styled-components";
import { BsArrowRightSquare } from "react-icons/bs";

interface Props {
  onClick: () => void;
}

function ShowMore({ onClick }: Props) {
  return (
    <ShowMoreBtnWrapper onClick={onClick}>
      <span>더 보기</span>
      <ShowMoreBtn>
        <BsArrowRightSquare />
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
  /* min-height: 350px; */
  cursor: pointer;
  position: relative;
  & span {
    position: absolute;
    top: 2.4px;
    left: 0;
    font-size: 12px;
    font-weight: 600;
    @media (max-width: 640px) {
      font-size: 10px;
      top: 38px;
      left: 0;
    }
  }
`;

const ShowMoreBtn = styled.button`
  /* width: 50px;
  height: 50px; */
  border-radius: 50%;
  position: absolute;
  top: 0;
  left: 34px;
  &&&&&&&&&&&&&&& {
    color: black;
    background: none;
    outline: none;
    border: none;
  }
  font-size: 14px;
  cursor: pointer;
  @media (max-width: 640px) {
    top: 55px;
    left: 0;
    font-size: 18px;
  }
`;
