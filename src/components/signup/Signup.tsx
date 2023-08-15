import React, { useState } from "react";
import SignupInput from "./SignupInput";
import { styled } from "styled-components";

const signupInputProps = [
  {
    type: "email",
    name: "email",
    text: "이메일",
  },
  {
    type: "password",
    name: "password",
    text: "비밀번호",
  },
  {
    type: "password",
    name: "passwordCheck",
    text: "비밀번호 확인",
  },
  {
    type: "phoneNumber",
    name: "phoneNumber",
    text: "전화번호",
  },
  {
    type: "address",
    name: "address",
    text: "주소",
  },
];

interface Data {
  email: string;
  password: string;
  passwordCheck: string;
  phoneNumber: string | undefined;
  address: string;
}
const Signup = () => {
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
    passwordCheck: "",
    phoneNumber: "",
    address: "",
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    const { name, value } = e.target;
    console.log(`name>>${name}, value>>${value}`);
    if (name === "phoneNumber") {
      console.log("isPhoneNumber");
      const regex = /^[0-9\b -]{0,13}$/;

      const cleanValue = value
        .replace(/[^0-9]/g, "")
        .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, "$1-$2-$3")
        .replace(/(\-{1,2})$/g, "");

      if (regex.test(value)) {
        setData({ ...data, ["phoneNumber"]: cleanValue });
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e.target);

    const originalPhoneNumber = data.phoneNumber;
    //전화번호 "-" 제거 후
    console.log(`before>>${originalPhoneNumber}`);
    const requestPhoneNumber = data.phoneNumber?.split("-").join("");
    console.log(`after>>${requestPhoneNumber}`);

    setData({ ...data, ["phoneNumber"]: requestPhoneNumber });
    // const response = await axiosClient.post<Data>('/signup');
    setData({ ...data, ["phoneNumber"]: originalPhoneNumber });
  };
  return (
    <>
      <Heading>회원 가입</Heading>
      {/* <div>정보 입력</div> */}
      <SignupContainer>
        <SignupForm onSubmit={submitHandler}>
          <FormInnerDiv>
            <Profile>
              <PreviewDiv>
                <img src="vite.svg" alt="temp" />
              </PreviewDiv>
              <input type="file" />
            </Profile>
            <InputDiv>
              {signupInputProps.map((elem, i) => (
                <SignupInput
                  key={i}
                  name={elem.name}
                  type={elem.type}
                  text={elem.text}
                  data={data}
                  onChange={inputChangeHandler}
                />
              ))}
            </InputDiv>
          </FormInnerDiv>
          <SignupButton>회원가입</SignupButton>
        </SignupForm>

        <div></div>
      </SignupContainer>
    </>
  );
};

export default Signup;

const Heading = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 2rem;
`;

const SignupContainer = styled.div`
  width: 690px;
  margin: 0 auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  border-radius: 10px;
  gap: 20px;
  padding: 60px 40px 40px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 24px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormInnerDiv = styled.div`
  width: 650px;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
`;

const Profile = styled.div`
  background-color: pink;
`;

const PreviewDiv = styled.div`
  background-color: greenyellow;
  width: 75%;
  height: 80%;
  margin: 10% auto;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SignupButton = styled.button`
  background-color: #605e49;
  /* width: 200px;
  height: 100px;
  border-radius: 4px;
  border-style: none; */
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid transparent;

  width: 460px;
  height: 50px;
  margin: 40px 0 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
`;
