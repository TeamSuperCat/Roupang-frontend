import React from "react";
import { styled } from "styled-components";

interface LoginButtonProps {
  email: string;
  password: string;
  onLoginClick: () => void;
}

const CustomButton: React.FC<LoginButtonProps> = ({ email, password, onLoginClick }) => {
  console.log(email, password);
  return <Button onClick={onLoginClick}>로그인</Button>;
};

export default CustomButton;

const Button = styled.button`
  background-color: var(--primary-color);
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid transparent;

  width: 460px;
  height: 50px;
  margin: 0 0 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: relative;
  transition: all ease-in-out 0.3s;
  @media (max-width: 650px) {
    width: 100%;
  }
  @media (max-width: 520px) {
    width: 100%;
    height: 40px;
    font-size: 14px;
    border-radius: 8px;
  }
  svg {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
  }
`;
