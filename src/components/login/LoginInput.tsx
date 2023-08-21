import { styled } from "styled-components";

type PlaceholderInput = {
  name: string;
  type: string;
  placeholder?: string;
  data: {
    email: string;
    password: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (e: React.FormEvent<HTMLInputElement>) => void;
  ref: null;
};

const LoginInput = ({
  name,
  type,
  placeholder,
  data,
  onChange,
  onBlur,
  ref,
}: PlaceholderInput) => {
  // 에러 메시지를 보여주는 경우, true -> 메시지 노출
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameIsTouched;
  return (
    <>
      <Input
        name={name}
        type={type}
        placeholder={placeholder}
        value={data[name]}
        onChange={(e) => onChange(e)}
        onBlur={onBlur}
        ref={ref}
      />
      {nameInputIsInvalid && (
        <p className="error-text">값은 빈 값이 아니어야 합니다.</p>
      )}
    </>
  );
};

export default LoginInput;

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
