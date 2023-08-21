import React, { useRef, useState } from "react";
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

  const nameInputRef = useRef();
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(e);
    console.log(data);
    // const response = await axiosClient.post<Data>('/login');
    setEnteredNameIsTouched(true);

    // data이 빈 값인 경우 제출이 안 되게 수정
    if (data.trim() === "") {
      console.log("submit fail");
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredNameIsValid(true);
    setData("");
  };

  const nameInputBlurHandler = (ㄷ: React.FormEvent) => {
    console.log("event onBlur");
    setEnteredNameIsTouched(true);
    if (data.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }
  };
  // 에러 메시지를 보여주는 경우, true -> 메시지 노출
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;

  const nameInputClasses = nameInputIsInvalid
    ? "form-control invalid"
    : "form-control";

  return (
    <Container>
      <Form onSubmit={loginHandler}>
        <h3>로그인</h3>
        <div className={nameInputClasses}>
          {InputPropsValue.map((elem, i) => (
            <LoginInput
              key={i}
              name={elem.name}
              type={elem.type}
              placeholder={elem.placeholder}
              data={data}
              onChange={inputChangeHandler}
              onBlur={nameInputBlurHandler}
              ref={nameInputRef}
            />
          ))}
          {nameInputIsInvalid && (
            <p className="error-text">이름 값은 빈 값이 아니어야 합니다.</p>
          )}
        </div>
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
