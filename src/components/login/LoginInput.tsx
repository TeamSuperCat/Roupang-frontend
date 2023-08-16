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
};

const LoginInput = ({ name, type, placeholder, data, onChange }: PlaceholderInput) => {
  return (
    <>
      <Input name={name} type={type} placeholder={placeholder} value={data[name]} onChange={(e) => onChange(e)} />
    </>
  );
};

export default LoginInput;

const Input = styled.input`
  background-color: pink;
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
`;
