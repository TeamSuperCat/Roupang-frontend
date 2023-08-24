import { css, styled } from "styled-components";
interface IToggleBtnType {
  $primary?: boolean;
  $rotate?: boolean;
  $category?: boolean;
}

interface Props {}

function MenuBtn({
  category,
  children,
  onClick,
  primary,
  rotateState,
  text,
}: IButtonProps) {
  return (
    <BtnWrapper onClick={onClick}>
      <ModalToggleBtn
        $primary={primary}
        $rotate={rotateState}
        $category={category}
      >
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
  position: relative;
  ${({ $primary }) =>
    $primary &&
    css`
      color: var(--primary-color);
    `}

  ${({ $primary }) =>
    !$primary &&
    css`
      &:hover {
        color: var(--primary-color);
      }
    `}
  ${({ $rotate }) =>
    $rotate &&
    css`
      transform: rotate(90deg);
    `}

  ${({ $category }) =>
    $category &&
    css`
      color: var(--primary-color);

      &::before {
        content: "";
        width: 40px;
        height: 40px;
        background: rgba(128, 128, 128, 0.1);
        border-radius: 50%;
        position: absolute;
        top: -9px;
        left: -4px;
      }
    `}
`;

const BtnWrapper = styled.li<Props>`
  display: flex;
  justify-content: flex-end;
  &:hover {
    ${Bubble} {
      display: inline-block;
    }
  }
`;
