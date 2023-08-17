import { css, styled } from "styled-components";

interface IToggleBtnType {
  primary?: boolean;
  rotate?: boolean;
}

function MenuBtn({
  children,
  onClick,
  primary,
  rotateState,
  text,
}: IButtonProps) {
  return (
    <BtnWrapper onClick={onClick}>
      <ModalToggleBtn primary={primary} rotate={rotateState}>
        {children}
      </ModalToggleBtn>
      <Bubble>{text}</Bubble>
    </BtnWrapper>
  );
}

export default MenuBtn;

const Bubble = styled.span`
  display: none;
  position: absolute;
  background: #444444;
  border-radius: 3px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;
  padding-right: 15px;
  transform: translateX(-48px) translateY(-5px);
  white-space: nowrap;
  color: white;
  font-family: "Jost" sans-serif;
  font-size: 10px;

  &:after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-left-color: #444444;
    border-right: 0;
    margin-top: -5px;
    margin-right: -5px;
  }
`;

const ModalToggleBtn = styled.button<IToggleBtnType>`
  outline: none;
  background: none;
  border: none;
  font-size: 21px;
  transition: transform 0.3s 0.44s;
  cursor: pointer;
  ${({ primary }) =>
    primary &&
    css`
      color: var(--primary-color);
    `}

  ${({ primary }) =>
    !primary &&
    css`
      &:hover {
        color: var(--primary-color);
      }
    `}
  ${({ rotate }) =>
    rotate &&
    css`
      transform: rotate(90deg);
    `}
`;

const BtnWrapper = styled.li`
  display: flex;
  justify-content: flex-end;
  &:hover {
    ${Bubble} {
      display: inline-block;
    }
  }
`;
