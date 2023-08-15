import React, { useState } from "react";
import LoginInput from "../components/login/LoginInput";
import { styled } from "styled-components";
import CustomButton from "../components/login/CustomButton";
import OAuthButton from "../components/login/OAuthButton";
import { Link } from "react-router-dom";

const InputPropsValue = [
  { type: "email", placeholder: "이메일을 입력해주세요." },
  { type: "password", placeholder: "비밀번호를 입력해주세요." },
];

const buttonItems = [
  { title: "로그인", logo: "", color: "", isOAuth: false },
  { title: "카카오 로그인", logo: "kakao", color: "#fee500", isOAuth: true },
  { title: "네이버 로그인", logo: "naver", color: "#03c75a", isOAuth: true },
];

interface Data {
  email: string;
  password: string;
}
const Login = () => {
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
  });

  const inputHandle = (e: string, type: string) => {
    setData({ ...data, [type]: e });
  };

  const loginHandler = () => {
    // const response = await axiosClient.post<Data>('/login');
  };

  return (
    <Container>
      <Form>
        {InputPropsValue.map((elem) => (
          <LoginInput propsValue={elem} inputHandle={inputHandle} />
        ))}
        <CustomButton onClick={loginHandler} />
      </Form>

      <LinkWrap>
        <Link to="/signup">회원가입하기</Link>
        <Link to="/findpassword">비밀번호찾기</Link>
      </LinkWrap>

      {buttonItems
        .filter((item) => item.isOAuth)
        .map((item) => (
          <OAuthButton loginType={item} />
        ))}
    </Container>
  );
};

export default Login;

const Container = styled.div`
  display: flex;
  gap: 15px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const LinkWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
`;
