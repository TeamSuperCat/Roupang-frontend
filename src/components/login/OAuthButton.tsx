import { styled } from "styled-components";
import { SiNaver } from "react-icons/si";
import axios from "axios";
import axiosClient from "../../api/axios";

type ButtonProps = {
  loginType: {
    title: string;
    logo: string;
    color: string;
    isOAuth: boolean;
  };
};

const OAuthButton = ({ loginType }: ButtonProps) => {
  const kakaoLoginHandler = async () => {
    await axios
      .get(
        `https://kauth.kakao.com/oauth/authorize?
    response_type=code&
    client_id=845bad711438ba325143c971ec350d2d&
    redirect_uri=http://3.12.151.96:8080/login/oauth2/code/kakao`
      )
      .then((res) => {
        console.log("kakao res", res);
      })
      .catch((err) => {
        console.log("kakao err", err);
      });
  };
  return (
    <>
      {loginType.logo === "naver" ? (
        <Button color={loginType.color}>
          <SiNaver />
          {loginType.title}
        </Button>
      ) : loginType.logo === "kakao" ? (
        <Button onClick={kakaoLoginHandler} color={loginType.color}>
          <img src='/img/icon_kakao.png' alt='카카오아이콘' />
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
  transition: all ease-in-out 0.3s;
  @media (max-width: 650px) {
    width: 360px;
  }
  @media (max-width: 520px) {
    width: 260px;
    height: 40px;
    font-size: 14px;
    border-radius: 8px;
  }
  img {
    position: absolute;
    top: 50%;
    left: 20px;
    transform: translate(0, -50%);
    width: 22px;
    @media (max-width: 520px) {
      width: 20px;
    }
  }
`;
