import { styled } from "styled-components";

type inputProps = {
  name: string;
  type: string;
  text: string;
  data: {
    email: string;
    phoneNumber: string | undefined;
    address: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUpdate: boolean;
};

const ProfileInput = ({ name, type, text, data, onChange, isUpdate }: inputProps) => {
  return (
    <InputWrap>
      <Input name={name} type={type} value={data[name]} onChange={(e) => onChange(e)} readOnly={!isUpdate} />
      <label htmlFor='email'>{text}</label>
    </InputWrap>
  );
};

export default ProfileInput;

const InputWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row-reverse;
`;

const Input = styled.input`
  width: 310px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
`;
