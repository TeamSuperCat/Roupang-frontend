import { styled } from "styled-components";
import axiosClient from "../../api/axios";
import { useState } from "react";

interface Data {
  [key: string]: string | undefined;
  email: string;
  nickname: string;
  phoneNumber: string | undefined;
  address: string;
  memberImg: string;
}

type inputProps = {
  name: string;
  type: string;
  text: string;
  data: {
    [key: string]: string | undefined;
    email: string;
    phoneNumber: string | undefined;
    address: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  isUpdate: boolean;
};

const ProfileInput = ({ name, type, text, data, onChange, isUpdate }: inputProps) => {
  const [nicknameErrMsg, setNicknameErrMsg] = useState("");

  const checkNicknameDuplicate = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    await axiosClient
      .post<Data>("/member/check", {
        nickname: data.nickname,
      })
      .then((res) => {
        if (res) {
          console.log(res.data);
          setNicknameErrMsg("");
        }
      })
      .catch((err) => {
        if (err.code === "ERR_BAD_REQUEST") {
          console.log(err.response.data.msg);
          setNicknameErrMsg(err.response.data.msg);
        }
      });
  };

  return (
    <InputWrap>
      <div className='label-input'>
        <label htmlFor={name}>{text}</label>
        <InputDoubleCheck>
          {isUpdate && name === "address" ? (
            <Input name={name} type={type} value={data[name]} onChange={(e) => onChange(e)} />
          ) : isUpdate && name === "nickname" ? (
            <InputButtonWrap>
              <div>
                <Input name={name} type={type} value={data[name]} onChange={(e) => onChange(e)} />
                <button onClick={checkNicknameDuplicate}>중복확인</button>
              </div>
              <p>{nicknameErrMsg}</p>
            </InputButtonWrap>
          ) : name ? (
            <Input name={name} type={type} value={data[name]} onChange={(e) => onChange(e)} readOnly={true} />
          ) : null}
        </InputDoubleCheck>
      </div>
    </InputWrap>
  );
};

export default ProfileInput;

const InputWrap = styled.div`
  display: flex;
  align-items: unset;
  flex-direction: column;
  justify-content: space-between;
  .label-input {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 20px;
    @media (max-width: 950px) {
      margin: 0 auto;
      width: 90%;
      justify-content: space-between;
    }
    label {
      font-size: 14px;
      @media (max-width: 550px) {
        font-size: 12px;
      }
    }
  }
`;
const InputDoubleCheck = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const InputButtonWrap = styled.div`
  div {
    display: flex;
    gap: 10px;
    input {
      width: 245px;
      height: 50px;
      @media (max-width: 550px) {
        width: 100%;
        height: 40px;
      }
    }
    button {
      background-color: var(--primary-color);
      border: none;
      color: #fff;
      border-radius: 10px;
      font-weight: 600;
      padding: 0 15px;
      @media (max-width: 550px) {
        padding: 0 5px;
        font-size: 11px;
        width: 80px;
      }
    }
  }
  p {
    color: red;
    font-size: 11px;
    padding-top: 5px;
    left: 0;
    position: absolute;
    bottom: -15px;
    left: 5px;
  }
`;

const Input = styled.input`
  width: 330px;
  height: 50px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 2px 8px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  font-size: 12px;
  padding-left: 5px;
  transition: all ease-in-out 0.2s;
  &:focus {
    outline-color: var(--primary-color);
  }
  @media (max-width: 550px) {
    width: 202px;
    height: 40px;
    font-size: 10px;
  }
`;
