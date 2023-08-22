import React, { useState } from "react";
import LoginInput from "../components/login/LoginInput";
import { styled } from "styled-components";
import CustomButton from "../components/login/CustomButton";
import OAuthButton from "../components/login/OAuthButton";
import { Link, useNavigate } from "react-router-dom";

// const InputPropsValue = [
//   {
//     name: "email",
//     type: "email",
//     placeholder: "이메일을 입력해주세요.",
//     validationText: "이메일 값은 빈 값이 아니어야 합니다.",
//   },
//   {
//     name: "password",
//     type: "password",
//     placeholder: "비밀번호를 입력해주세요.",
//     validationText: "비밀번호 값은 빈 값이 아니어야 합니다.",
//   },
// ];

const buttonItems = [
  { title: "로그인", logo: "", color: "", isOAuth: false },
  { title: "카카오 로그인", logo: "kakao", color: "#fee500", isOAuth: true },
  // { title: "네이버 로그인", logo: "naver", color: "#03c75a", isOAuth: true },
];

// 이렇게 할까요?
//  이 곳에 어떤 식으로 구현할 지 대략 순서쓰기 ><

// 전부 LoginInput.tsx에서
// 1. 상태값을 각 인풋 별로 나누기, (에러 상태도 마찬가지, 인풋별로 각각 상태 나타내기.,)
// const [email, setEmail] = useState('');
// const [password, setPassword] = useState('');
// const [emailError, setEmailError] = useState('');
// const [passwordError, setPasswordError] = useState('');

// 2. onBlur 시 이벤트를 넣는데, 이것도 각각
// const handleEmailBlur = () => {
//   if (email.trim() === '') {
//     setEmailError('이메일을 입력해주세요.');
//   } else if (!isValidEmail(email)) {
//     setEmailError('유효한 이메일 형식이 아닙니다.');
//   } else {
//     setEmailError('');
//   }
// };

// const handlePasswordBlur = () => {
//   if (password.trim() === '') {
//     setPasswordError('비밀번호를 입력해주세요.');
//   } else {
//     setPasswordError('');
//   }
// };

// 3. 간단한 이메일 형식 검사 로직 넣어주고
// const isValidEmail = (value: string) => {
//   // 간단한 이메일 형식 검사 로직
//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   return emailRegex.test(value);
// };

// 4. xml 에 적용
{
  /* <div>
<div>
  <label>이메일</label>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    onBlur={handleEmailBlur}
  />
  {emailError && <p style={{ color: 'red' }}>{emailError}</p>}
</div>
<div>
  <label>비밀번호</label>
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    onBlur={handlePasswordBlur}
  />
  {passwordError && <p style={{ color: 'red' }}>{passwordError}</p>}
</div>
</div> */
}

// 순서대로 작업할 라인에 가서 어떤 작업 하는지 구체적인 순서 먼저 적기 아하 넵!

// 의사코드라고도 하죠 ✨  코드로 적으면서 하는게 더 좋을 것 같은데
// 코드로 바로 적을 수 있는 건 코드로 적으면서 당장 잘 모르겠는건 주석으로 뭐하는지만 적고 넘어가기
// 검색해서 코드 찾아서 쓰고 테스트
// ex. 이메일 유효성 검사 // 움.. 넵! 그 일단 여기에다가 적으면 될까요? 로직?? 그 지금 로그인, 로그인인풋이 분리되어있어서

// 어떤 함수 안이라고 치고
// function () {
//    // 이메일이 어떠하면
//    if(email === "") return
//    // 어쩌구
//    // 저쩌구
// }

// 넵!
//

interface Data {
  [key: string]: string;
  email: string;
  password: string;
}
// 동욱님.... LoginInput 없애고 Login에다가만 해도 될까요????
// 글구 배열로 돌리고 있는 xml 그거 각각 input 하나하나 적용하고 싶슴다 허으 ㅠ
// 여기서 하는 방법하고, input으로 들어가서 하는 방법이 있는 것 같은데
// input 안에서  name==='email && isInValid ? <p>asdf</p> : null
//               name==='password' && isInValid ? <p>asdf</p> : null
// 두가지로 체크하면 되지않을까요

// 하나하나 적용할 내용이 뭔가요?
// 이메일 인풋, 비밀번호 인풋 임다 넵 넵넵 근데 여기서 하기에는 여기에 적용하면
// 이메일, 비번 인풋이 로그인인풋에서 펼쳐져서? 그래서 여기서 하면 인풋이 묶인 상태로 유효성검사 <p>가 아래 하나만 뜹니다.
// 그니까 인풋박스 각각 밑에 유효성검사 값인 p태그가 떠야 하는데
// 여기에 하묜 넵
// !?!!?!??!?!?!?!?!?! 오 대박 오.. 오들.. ㅠ
// 그 뭔가 헷갈리거나 좀 복잡해지는 거 같아서 쉽게 가려구 했는데 넵넵ㅁ ㅠ 다시 해볼꼐오..

const Login = () => {
  const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });

    // if (name === "email") {
    //   //이메일 형식에 맞으면 set true, 아니면 false
    //   const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
    //   emailRegex.test(value)
    //     ? setEnteredNameIsValid(true);
    //     : setEnteredNameIsValid(false);
    // } else if (name === "email") {
    //   //비밀번호 형식에 맞으면 set true, 아니면 false
    //   const pswdRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
    //   pswdRegex.test(value)
    //   ? setEnteredNameIsValid(true);
    //   : setEnteredNameIsValid(false);
    // }

    if (data.email.trim() === "") {
      console.log("submit fail");
      setEnteredNameIsValid(false);
      return;
    }

    if (data.password.trim() === "") {
      console.log("submit fail");
      setEnteredNameIsValid(false);
      return;
    }
    setEnteredNameIsValid(true);

    //유효성검사는 이메일 형식이 맞는지, 비밀번호가 사실 8-20자리 영문자+숫자 형식입니다. 녭!!

    // 값 입력하면서 콘솔도 확인해보죵 녭!!
    console.log("enteredNameIsValid", enteredNameIsValid);

    console.log(name, value);
  };

  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(e);
    // console.log(data);
    setEnteredNameIsTouched(true);

    // 유효성 검사 통과 시 로그인 시도
    // await axiosClient.post<Data>("/member/login", data).then(res=>{
    //    if(res) {
    //      // 로그인 성공
    //      const accessToken = res.headers['authorization']
    //      localstorage.setItem("accessToken",accessToken)
    //      navigate("/")
    //    }
    // }).catch(err=>{
    //    //로그인 실패
    //    if(err.errorCode === "MEMBER_NOT_FOUND") {
    //        // "등록 되지 않은 아이디 입니다"
    //        console.log(err.errorMessage)
    //    }
    //    if(err.errorCode === "PASSWORD_MISMATCH") {
    //        // "비밀 번호가 일치하지 않습니다"
    //        console.log(err.errorMessage)
    //    }
    // });
  };

  const nameInputBlurHandler = (e: React.FormEvent) => {
    // 유효성 검사를 통해 set어쩌구 한다.
    // styledComponent Form 태그 밑에 CSS props로 전달해서 어쩌구 함
    console.log("event onBlur");

    setEnteredNameIsTouched(true);
    if (data.email.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }
    if (data.password.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }
  };

  return (
    <Container key="id">
      <Form onSubmit={loginHandler}>
        <h3>로그인</h3>
        {/* {InputPropsValue.map((elem, i) => ( */}
        <LoginInput

        // key={i}
        // enteredNameIsValid={enteredNameIsValid}
        // enteredNameIsTouched={enteredNameIsTouched}
        // name={elem.name}
        // type={elem.type}
        // placeholder={elem.placeholder}
        // validationText={elem.validationText}
        // data={data}
        // onChange={inputChangeHandler}
        // onBlur={nameInputBlurHandler}
        />
        {/* ))} */}
      </Form>

      <LinkWrap>
        <Link to="/signup">회원가입하기</Link>
        {/* <Link to="/findpassword">비밀번호찾기</Link> */}
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
