import { useState } from "react";
import styled from "styled-components";
import CustomButton from "./CustomButton";

type PlaceholderInput = {
  enteredNameIsValid: boolean;
  enteredNameIsTouched: boolean;
  name: string;
  type: string;
  validationText: string;
  placeholder?: string;
  data: {
    [key: string]: string;
    email: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FormEvent<HTMLInputElement>) => void;
};

const LoginInput = ({
  enteredNameIsValid,
  enteredNameIsTouched,
  name,
  type,
  placeholder,
  validationText,
  data,
  onChange,
  onBlur,
}: PlaceholderInput) => {
  // 의도가 무엇인지 먼저 설명하고 쓰는 건 어떨까요? 🥹
  // 그럼 지금 형식에 맞게 적용시켜야겠네요 🥹
  // 강의 내용 실습하신건가봐요?
  // 여기에 develop 머지 되어있죠?
  //  signup 하고 signupinput 이 이거랑 똑같은 형식인데 한 번 보시죠
  // 저는 인풋마다 전달하는 값을 다 따로 주고
  // signup 에 있는 onchange에서 어차피 인풋하나씩 입력받으니까 분기처리했습니다
  // 유효성 검사 분기처리요.. (if 문으로 어떤 입력필드인지 확인함)

  // 넵! / 넵! /나니?! 아 앗 넵!!! 감사합니다 ㅠㅠ
  // 네 그렇숨댜 지금 한 state로 이메일, 패스워드 둘 다 적용하다 보니 둘이 동시에 뜨는 에러도 있는 것 같숨다

  // 에러 메시지를 보여주는 경우, true -> 메시지 노출
  // const [enteredEmail, setEnteredEmail] = useState("");
  // const [enteredEmailTouched, setEnteredEmailTouched] = useState(false);
  // const enteredEmailIsValid = enteredEmail.includes("@");
  // const enteredEmailIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  // 1. 상태값을 각 인풋 별로 나누기, (에러 상태도 마찬가지, 인풋별로 각각 상태 나타내기.,)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // 2. onBlur 시 이벤트를 넣는데, 이것도 각각
  const handleEmailBlur = () => {
    if (email.trim() === "") {
      setEmailError("이메일을 입력해주세요.");
    } else if (!isValidEmail(email)) {
      setEmailError("유효한 이메일 형식이 아닙니다.");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordBlur = () => {
    if (password.trim() === "") {
      setPasswordError("비밀번호를 입력해주세요.");
    } else if (!isValidPassword(password)) {
      setPasswordError(
        "비밀번호는 8-20자리의 영문자와 숫자를 포함해야 합니다."
      );
    } else {
      setPasswordError("");
    }
  };

  // 3. 간단한 이메일 형식 검사 로직 넣어주고
  const isValidEmail = (value: string) => {
    // 간단한 이메일 형식 검사 로직
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  };

  const isValidPassword = (value: string) => {
    // 8-20자리의 영문자와 숫자를 포함하는 정규표현식
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,20}$/;
    return passwordRegex.test(value);
  };

  // 4. 전송버튼
  const handleLoginSubmit = async () => {
    if (isValidEmail(email) && isValidPassword(password)) {
      try {
        const response = await fetch(
          "http://localhost:8080/api/v1/member/login",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        if (response.ok) {
          console.log("로그인 성공");
          // 로그인 성공 처리 및 리다이렉트 등을 수행할 수 있습니다.
        } else {
          console.log("로그인 실패");
          // 로그인 실패 처리를 수행할 수 있습니다.
        }
      } catch (error) {
        console.error("API 호출 에러:", error);
      }
    } else {
      console.log("유효성 검사 실패");
    }
  };

  return (
    // 4. xml 에 적용
    <Container>
      <InputWrap>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={handleEmailBlur}
        />
        {emailError && <ErrorText>{emailError}</ErrorText>}
      </InputWrap>
      <InputWrap>
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onBlur={handlePasswordBlur}
        />

        {passwordError && <ErrorText>{passwordError}</ErrorText>}
      </InputWrap>
      <CustomButton
        email={email}
        password={password}
        onLoginClick={handleLoginSubmit}
      />
    </Container>

    // <Container className={nameInputClasses}>
    //   <Input
    //     name={name}
    //     type={type}
    //     placeholder={placeholder}
    //     value={data[name]}
    //     onChange={(e) => onChange(e)}
    //     onBlur={onBlur}
    //   />
    //   {nameInputIsInvalid && <ErrorText>{validationText}</ErrorText>}
    // </Container>
  );
};
export default LoginInput;

const Container = styled.div`
  position: relative;
`;
const InputWrap = styled.div`
  position: relative;
`;

const Input = styled.input`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 1px 4px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  color: #222;
  font-weight: 600;
  width: 460px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding-left: 20px;
  box-sizing: border-box;
  border: none;
  border-radius: 10px;
  transition: all ease-in-out 0.3s;
  margin-bottom: 23px;

  @media (max-width: 650px) {
    width: 100%;
  }
  @media (max-width: 520px) {
    width: 100%;
    height: 40px;
    font-size: 12px;
    border-radius: 8px;
  }
  &:focus {
    outline-color: var(--primary-color);
  }
`;

const ErrorText = styled.p`
  color: #b40e0e;
  font-size: 11px;
  padding-left: 5px;
  position: absolute;
  z-index: 1;
  bottom: -15px;
`;
