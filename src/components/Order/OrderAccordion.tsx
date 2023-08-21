import { styled } from "styled-components";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";

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
        <ToggleBtn>{!isOpen ? <IoIosArrowDown /> : <IoIosArrowUp />}</ToggleBtn>
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
  height: 50px;
  background-color: white;
  cursor: pointer;
`;

const FormTitle = styled.h1`
  font-size: 17px;
  font-weight: 400;
`;

const ToggleBtn = styled.span`
  font-size: 23px;
  color: #bcbcbc;
`;

const ContentWrap = styled.div<ToggleProps>`
  background-color: white;
  overflow: hidden;
  max-height: ${({ $isOpen }) => ($isOpen ? "1000px" : "0px")};
`;
