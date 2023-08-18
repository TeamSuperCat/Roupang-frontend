import { css, styled } from "styled-components";

interface IToggleBtnType {
  primary?: boolean;
  rotate?: boolean;
}

function MenuBtn({ children, onClick, primary, rotateState }: IButtonProps) {
  return (
    <li onClick={onClick}>
      <ModalToggleBtn primary={primary} rotate={rotateState}>
        {children}
      </ModalToggleBtn>
    </li>
  );
}

export default MenuBtn;

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
