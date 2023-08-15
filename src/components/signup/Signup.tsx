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
      <div>회원 가입</div>
      <div>정보 입력</div>
      <SignupContainer>
        <div>
          <form onSubmit={submitHandler}>
            <div>
              <div>
                <div>미리보기 ㄷㄷ</div>
                <input type='file' />
              </div>
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
            </div>
            <button>회원가입</button>
          </form>
        </div>
        <div></div>
      </SignupContainer>
    </>
  );
};

export default Signup;

const SignupContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  gap: 20px;
`;
