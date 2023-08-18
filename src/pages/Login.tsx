import React, { useState } from "react";
import LoginInput from "../components/login/LoginInput";
import { styled } from "styled-components";
import CustomButton from "../components/login/CustomButton";
import OAuthButton from "../components/login/OAuthButton";
import { Link } from "react-router-dom";

const InputPropsValue = [
  { name: "email", type: "email", placeholder: "이메일을 입력해주세요." },
  {
    name: "password",
    type: "password",
    placeholder: "비밀번호를 입력해주세요.",
  },
];

const buttonItems = [
  { title: "로그인", logo: "", color: "", isOAuth: false },
  { title: "카카오 로그인", logo: "kakao", color: "#fee500", isOAuth: true },
  // { title: "네이버 로그인", logo: "naver", color: "#03c75a", isOAuth: true },
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

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
    console.log(data);
    // const response = await axiosClient.post<Data>('/login');
  };

  return (
    <Container>
      <Form onSubmit={loginHandler}>
        <h3>로그인</h3>
        {InputPropsValue.map((elem, i) => (
          <LoginInput
            key={i}
            name={elem.name}
            type={elem.type}
            placeholder={elem.placeholder}
            data={data}
            onChange={inputChangeHandler}
          />
        ))}
        <CustomButton />
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
  height: calc(100vh - 480px);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  @media (max-width: 650px) {
    width: 360px;
  }
  @media (max-width: 520px) {
    width: 260px;
  }

  h3 {
    font-size: 20px;
    font-weight: 600;
    padding-bottom: 20px;
  }
`;

const LinkWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 20px;
  @media (max-width: 520px) {
    font-size: 14px;
  }
  a {
    color: #888;
  }
`;
