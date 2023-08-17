import React, { useEffect, useRef, useState } from "react";
import SignupInput from "../components/signup/SignupInput";
import { styled } from "styled-components";
import useGetUrl from "../hooks/useGetUrls";
import axiosClient from "../api/axios";

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
    type: "text",
    name: "nickname",
    text: "닉네임",
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

const defaultProfilePath = "default_profile.png";

interface Data {
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  phoneNumber: string | undefined;
  address: string;
  profile: string;
}
const Signup = () => {
  const [urls, setUrls] = useState<string[]>([]);
  const { ref, onChange, isLoading } = useGetUrl(setUrls);
  const submitUrl = useRef<string>(defaultProfilePath);
  const [tempImg, setTempImg] = useState("");

  const [isSamePassword, setIsSamePassword] = useState(false);
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    phoneNumber: "",
    address: "",
    profile: "",
  });

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    // Blob 객체로 변환
    const blob = new Blob([file], { type: file.type });

    // 임시 URL 생성
    const tempURL = URL.createObjectURL(blob);
    console.log(tempURL);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      const result = e?.target?.result as string;
      setTempImg(result);
    };
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    //전화번호 유효성 검사
    if (name === "phoneNumber") {
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

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("bfr", data);
    // const originalPhoneNumber = data.phoneNumber;
    if (isSamePassword) {
      // const requestPhoneNumber = data.phoneNumber?.split("-").join("");
      // setData((prev) => ({ ...prev, phoneNumber: requestPhoneNumber }));
      console.log("일치", data);
      onChange();
      // const response = await axiosClient.post<Data>("/signup");
      // console.log(response);
    }

    // setData({ ...data, ["phoneNumber"]: originalPhoneNumber });
  };

  // useEffect(() => {
  //   return () => {};
  // }, [data.phoneNumber]);

  useEffect(() => {
    //비밀번호 확인
    if (data.password === data.passwordCheck) {
      setIsSamePassword(true);
    } else {
      setIsSamePassword(false);
    }

    return () => {};
  }, [data.password, data.passwordCheck]);

  useEffect(() => {
    if (urls[0]) {
      setData((prev) => ({ ...prev, profile: urls[0] }));
    } else {
      setData((prev) => ({ ...prev, profile: submitUrl.current }));
    }

    return () => {};
  }, [urls]);

  // useEffect(() => {
  //   return () => {};
  // }, [submitUrl]);

  return (
    <>
      <Heading>회원 가입</Heading>
      {/* <div>정보 입력</div> */}
      <SignupContainer>
        <SignupForm onSubmit={submitHandler}>
          <FormInnerDiv>
            <Profile>
              <PreviewDiv>
                {urls[0] ? (
                  urls.map((url) =>
                    isLoading ? <div>이미지 url 변환중....</div> : <img key={url} src={url} alt='url' />
                  )
                ) : (
                  <img src={tempImg ? tempImg : submitUrl.current} alt='url' />
                )}
              </PreviewDiv>
              <input type='file' ref={ref} onChange={onFileChange} hidden />
              <ProfileUpload
                onClick={() => {
                  ref && ref.current?.click();
                }}
              >
                이미지 업로드
              </ProfileUpload>
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
  margin: 3%;
  padding-bottom: 2%;
  border-bottom: 1px solid #605e49;
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
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 24px;
`;

const SignupForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormInnerDiv = styled.div`
  width: 660px;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
`;

const Profile = styled.div``;

const PreviewDiv = styled.div`
  width: 100%;
  height: 60%;
  margin: 20% auto 10%;
  overflow: hidden;
  display: flex;
  align-items: center;

  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const ProfileUpload = styled.div`
  background-color: #fff;
  width: 120px;
  height: 30px;
  border-radius: 4px;
  color: #605e49;
  font-weight: 600;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  cursor: pointer;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const SignupButton = styled.button`
  background-color: #605e49;
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
  cursor: pointer;
`;
