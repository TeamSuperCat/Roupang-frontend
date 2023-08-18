import axios from "axios";
import { useState } from "react";
import { styled } from "styled-components";

type inputProps = {
  name: string;
  type: string;
  text: string;
  dupCheck: boolean;
  data: {
    email: string;
    password: string;
    passwordCheck: string;
    phoneNumber: string | undefined;
    address: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignupInput = ({ name, type, text, dupCheck, data, onChange }: inputProps) => {
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [resultMsg, setResultMsg] = useState("");
  const dupCheckHandler = async () => {
    const requestUrl = "http://3.12.151.96:8080/api/v1/member/check";
    if (dupCheck) {
      console.log("cur data >>", data[name]);
      await axios.post(requestUrl, data[name]).then((res) => {
        console.log(res); // 중복 또는 가능
        // 중복이면 에러메시지 보여주고
        if (res.data.errorCode === "중복") {
          setIsDuplicate(true);
          setResultMsg(res.data.errorMessage);
        } else {
          setIsDuplicate(false);
        }
      });
    }
  };

  return (
    <InputWrap>
      <Input name={name} type={type} value={data[name]} onChange={(e) => onChange(e)} onBlur={dupCheckHandler} />
      <label htmlFor='email'>{text}</label>
      {isDuplicate ? <p>{resultMsg}</p> : null}
    </InputWrap>
  );
};

export default SignupInput;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
  p {
    color: red;
  }
`;

const Input = styled.input`
  width: 310px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;
