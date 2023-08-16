import React from "react";
import { styled } from "styled-components";
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";

type ButtonProps = {
  loginType: {
    title: string;
    logo: string;
    color: string;
    isOAuth: boolean;
  };
};

const OAuthButton = ({ loginType }: ButtonProps) => {
  return (
    <>
      {loginType.logo === "naver" ? (
        <Button color={loginType.color}>
          <SiNaver />
          {loginType.title}
        </Button>
      ) : loginType.logo === "kakao" ? (
        <Button color={loginType.color}>
          <RiKakaoTalkFill />
          {loginType.title}
        </Button>
      ) : null}
    </>
  );
};

export default OAuthButton;

const Button = styled.button`
  background-color: ${(props) => props.color};
  color: #222;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid transparent;

  width: 460px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  position: relative;
  svg {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
  }
`;
