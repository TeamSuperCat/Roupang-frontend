import React from "react";
import LoginInput from "../components/login/LoginInput";
import { styled } from "styled-components";
import OAuthButton from "../components/login/OAuthButton";
import { Link } from "react-router-dom";

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

// interface Data {
//   [key: string]: string;
//   email: string;
//   password: string;
// }

const Login = () => {
  // const navigate = useNavigate();
  // const [enteredNameIsTouched, setEnteredNameIsTouched] = useState(false);
  // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
  // const [data, setData] = useState<Data>({
  //   email: "",
  //   password: "",
  // });

  // const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setData({ ...data, [name]: value });

  //   // if (name === "email") {
  //   //   //이메일 형식에 맞으면 set true, 아니면 false
  //   //   const emailRegex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,3}$/;
  //   //   emailRegex.test(value)
  //   //     ? setEnteredNameIsValid(true);
  //   //     : setEnteredNameIsValid(false);
  //   // } else if (name === "email") {
  //   //   //비밀번호 형식에 맞으면 set true, 아니면 false
  //   //   const pswdRegex = /^(?=.*[a-zA-Z])(?=.*[0-9]).{8,20}$/;
  //   //   pswdRegex.test(value)
  //   //   ? setEnteredNameIsValid(true);
  //   //   : setEnteredNameIsValid(false);
  //   // }

  //   if (data.email.trim() === "") {
  //     console.log("submit fail");
  //     setEnteredNameIsValid(false);
  //     return;
  //   }

  //   if (data.password.trim() === "") {
  //     console.log("submit fail");
  //     setEnteredNameIsValid(false);
  //     return;
  //   }
  //   setEnteredNameIsValid(true);

  //   //유효성검사는 이메일 형식이 맞는지, 비밀번호가 사실 8-20자리 영문자+숫자 형식입니다. 녭!!

  //   // 값 입력하면서 콘솔도 확인해보죵 녭!!
  //   console.log("enteredNameIsValid", enteredNameIsValid);

  //   console.log(name, value);
  // };

  const loginHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // console.log(e);
    // console.log(data);
    // setEnteredNameIsTouched(true);

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

  // const nameInputBlurHandler = (e: React.FormEvent) => {
  //   // 유효성 검사를 통해 set어쩌구 한다.
  //   // styledComponent Form 태그 밑에 CSS props로 전달해서 어쩌구 함
  //   console.log("event onBlur");

  //   setEnteredNameIsTouched(true);
  //   if (data.email.trim() === "") {
  //     setEnteredNameIsValid(false);
  //     return;
  //   }
  //   if (data.password.trim() === "") {
  //     setEnteredNameIsValid(false);
  //     return;
  //   }
  // };

  return (
    <Container>
      <Form onSubmit={loginHandler}>
        <h3>로그인</h3>
        {/* {InputPropsValue.map((elem, i) => (
        <LoginInput

        key={i}
        enteredNameIsValid={enteredNameIsValid}
        enteredNameIsTouched={enteredNameIsTouched}
        name={elem.name}
        type={elem.type}
        placeholder={elem.placeholder}
        validationText={elem.validationText}
        data={data}
        onChange={inputChangeHandler}
        onBlur={nameInputBlurHandler}
        />
        ))} */}
        <LoginInput />
      </Form>

      <LinkWrap>
        <Link to='/signup'>회원가입하기</Link>
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
