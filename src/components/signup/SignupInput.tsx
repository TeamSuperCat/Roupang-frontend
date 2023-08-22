import { styled } from "styled-components";

type inputProps = {
  name: string;
  type: string;
  text: string;
  placeholder: string | undefined;
  data: {
    [key: string]: string | undefined;
    email: string;
    password: string;
    passwordCheck: string;
    phoneNumber: string | undefined;
    address: string;
  };
  emailErrMsg: string;
  nicknameErrMsg: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const SignupInput = ({ name, type, text, placeholder, data, emailErrMsg, nicknameErrMsg, onChange }: inputProps) => {
  return (
    <InputWrap>
      <div>
        <label htmlFor='email'>{text}</label>
        <Input name={name} type={type} value={data[name]} onChange={(e) => onChange(e)} placeholder={placeholder} />
      </div>
      <div>
        {name === "email" ? emailErrMsg && <p>{emailErrMsg}</p> : null}
        {name === "nickname" ? nicknameErrMsg && <p>{nicknameErrMsg}</p> : null}
      </div>
    </InputWrap>
  );
};

export default SignupInput;

const InputWrap = styled.div`
  display: flex;
  align-items: unset;
  flex-direction: column;
  justify-content: space-between;
  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  p {
    color: red;
    font-size: 0.75rem;
    padding-top: 5px;
    left: 0;
  }
`;

const Input = styled.input`
  width: 330px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;
