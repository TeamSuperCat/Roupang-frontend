import React, { useEffect, useRef, useState } from "react";
import SignupInput from "../components/signup/SignupInput";
import { styled } from "styled-components";
import useGetUrl from "../hooks/useGetUrls";
import axiosClient from "../api/axios";
import { useNavigate } from "react-router";

const signupInputProps = [
  {
    type: "email",
    name: "email",
    text: "이메일",
    dupCheck: true,
  },
  {
    type: "password",
    name: "password",
    text: "비밀번호",
    dupCheck: false,
    placeholder: "영문자, 숫자를 조합하여 8~20자 이내로 입력해주세요.",
  },
  {
    type: "password",
    name: "passwordCheck",
    text: "비밀번호 확인",
    dupCheck: false,
  },
  {
    type: "text",
    name: "nickname",
    text: "닉네임",
    dupCheck: true,
  },
  {
    type: "phoneNumber",
    name: "phoneNumber",
    text: "전화번호",
    dupCheck: false,
    placeholder: '"-" 없이 숫자만 입력해주세요.',
  },
  {
    type: "address",
    name: "address",
    text: "주소",
    dupCheck: false,
  },
];

// const requestUrl = "http://3.12.151.96:8080/api/v1/member";

const defaultProfilePath = "default_profile.png";

interface Data {
  [key: string]: string | undefined;
  email: string;
  password: string;
  passwordCheck: string;
  nickname: string;
  phoneNumber: string | undefined;
  address: string;
  memberImg: string;
}
const Signup = () => {
  const navigate = useNavigate();
  const [urls, setUrls] = useState<string[]>([]);
  const { ref, onChange, isLoading } = useGetUrl(setUrls);
  const submitUrl = useRef<string>(defaultProfilePath);
  const [tempImg, setTempImg] = useState("");

  const [isUniqueEmail, setIsUniqueEmail] = useState(false);
  const [isUniqueNinkname, setIsUniqueNinkname] = useState(false);
  const [isSamePassword, setIsSamePassword] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [isValidPhoneNumber, setIsValidPhoneNumber] = useState(false);
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
    passwordCheck: "",
    nickname: "",
    phoneNumber: "",
    address: "",
    memberImg: "",
  });

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file === undefined) return;

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

    if (name === "email") {
      //이메일 유효성 검사
      const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
      regex.test(value) ? setIsValidEmail(true) : setIsValidEmail(false);
    } else if (name === "password") {
      //비밀번호 유효성 검사
      const regex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
      regex.test(value) ? setIsValidPassword(true) : setIsValidPassword(false);
    } else if (name === "phoneNumber") {
      //전화번호 유효성 검사
      const regex = /^[0-9]{10,11}$/;
      regex.test(value) ? setIsValidPhoneNumber(true) : setIsValidPhoneNumber(false);
    }

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const checkEmailDuplicate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    await axiosClient
      .post<Data>(`/member/check`, {
        email: data.email,
      })
      .then((res) => {
        if (res) {
          setIsUniqueEmail(true);
        }
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          setIsUniqueEmail(false);
        }
      });
  };

  const checkNicknameDuplicate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axiosClient
      .post<Data>(`/member/check`, {
        nickname: data.nickname,
      })
      .then((res) => {
        if (res) {
          setIsUniqueNinkname(true);
        }
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          setIsUniqueNinkname(false);
        }
      });
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("bfr", data);
    if (isUniqueEmail && isValidEmail && isSamePassword && isValidPassword && isUniqueNinkname && isValidPhoneNumber) {
      console.log("일치", data);
      await onChange();
      setData((prev) => ({ ...prev, memberImg: urls[0] }));
      console.log("마지막", data);
      await axiosClient
        .post<Data>(`/member/register`, data, {
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          navigate("/login");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    // console.log(data.email);
    // console.log(isValidEmail);
    // console.log(data.password);
    // console.log(isPasswordValid);
    // console.log(data.phoneNumber);
    // console.log(isValidPhoneNumber);
    return () => {};
  }, [data]);

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
      setData((prev) => ({ ...prev, memberImg: urls[0] }));
    } else {
      setData((prev) => ({ ...prev, memberImg: submitUrl.current }));
    }

    return () => {};
  }, [urls]);

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
                  dupCheck={elem.dupCheck}
                  placeholder={elem.placeholder}
                  data={data}
                  onChange={inputChangeHandler}
                />
              ))}
            </InputDiv>
          </FormInnerDiv>
          <button onClick={checkEmailDuplicate}>이메일중복확인</button>
          <button onClick={checkNicknameDuplicate}>닉네임중복확인</button>
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
  width: 690px;
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
