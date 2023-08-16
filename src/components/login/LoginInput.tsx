import { styled } from "styled-components";
import { useState, useRef } from "react";

type PlaceholderInput = {
  propsValue: {
    type: string;
    placeholder?: string;
  };
  inputHandle: (e: string, title: string) => void;
};

const LoginInput = ({ propsValue, inputHandle }: PlaceholderInput) => {
  const ref = useRef<HTMLInputElement>(null);

  const inputValue = (input: string) => {
    //input 요소의 value를 가져오기
    const value = input;

    // props로 전달된 함수 호출
    if (inputHandle) {
      inputHandle(value, propsValue.type);
    }
  };

  return (
    <>
      <Input
        type={propsValue.type}
        placeholder={propsValue.placeholder}
        value=""
        onChange={(e) => inputValue(e.target.value)}
        ref={ref}
      ></Input>
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
