import { styled, css } from "styled-components";
import { useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

interface Props extends IChildrenProps {
  title: string;
}

interface ToggleProps {
  $isOpen: boolean;
}

function OrderAccordion({ children, title }: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <FormCategory>
      <FormSub onClick={() => setIsOpen(!isOpen)}>
        <FormTitle>{title}</FormTitle>
        <ToggleBtn $isOpen={isOpen}>
          <IoIosArrowUp />
        </ToggleBtn>
      </FormSub>
      <ContentWrap $isOpen={isOpen}>{children}</ContentWrap>
    </FormCategory>
  );
}

export default OrderAccordion;

const FormCategory = styled.li`
  display: grid;
  margin-bottom: 10px;
`;

const FormSub = styled.div`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 17px;
  height: 80px;
  background-color: white;
  cursor: pointer;
`;

const FormTitle = styled.h1`
  font-size: 17px;
  font-weight: 600;
`;

const ToggleBtn = styled.span<ToggleProps>`
  font-size: 23px;
  color: #bcbcbc;
  transition: all 0.6s;
  ${({ $isOpen }) =>
    $isOpen &&
    css`
      transform: rotate(-180deg);
    `}
`;

const ContentWrap = styled.div<ToggleProps>`
  background-color: white;
  overflow: scroll;
  transition: all 0.6s;
  max-height: ${({ $isOpen }) => ($isOpen ? "800px" : "0px")};
  opacity: ${({ $isOpen }) => ($isOpen ? "1" : "0")};
`;
