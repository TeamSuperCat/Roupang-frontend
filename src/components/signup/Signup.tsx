import React, { useState } from "react";

interface Data {
  email: string;
  password: string;
  passwordCheck: string;
  phoneNumber: string | undefined;
  address: string;
}
const Signup = () => {
  const [data, setData] = useState<Data>({
    email: "",
    password: "",
    passwordCheck: "",
    phoneNumber: "",
    address: "",
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    const { name, value } = e.target;
    console.log(`name>>${name}, value>>${value}`);
    if (name === "phoneNumber") {
      console.log("isPhoneNumber");
      const regex = /^[0-9\b -]{0,13}$/;
      if (regex.test(value)) {
        setData({ ...data, ["phoneNumber"]: value });
      }
    } else {
      setData({ ...data, [name]: value });
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(e);
    // const response = await axiosClient.post<Data>('/signup');
  };
  return (
    <>
      <div>회원 가입</div>
      <div>정보 입력</div>
      <div>
        <div>
          <form onSubmit={submitHandler}>
            <div>
              <div>
                <div>미리보기 ㄷㄷ</div>
                <input type='file' />
              </div>
              <div>
                <input name='email' type='email' value={data.email} onChange={inputChangeHandler} />
                <label htmlFor='email'>이메일</label>
              </div>
              <div>
                <input name='password' type='password' value={data.password} onChange={inputChangeHandler} />
                <label htmlFor='inpupasswordt1'>비밀번호</label>
              </div>
              <div>
                <input name='passwordCheck' type='password' value={data.passwordCheck} onChange={inputChangeHandler} />
                <label htmlFor='passwordCheck'>비밀번호 확인</label>
              </div>
              <div>
                <input name='phoneNumber' type='text' value={data.phoneNumber} onChange={inputChangeHandler} />
                <label htmlFor='phoneNumber'>전화번호</label>
              </div>
              <div>
                <input name='address' type='text' value={data.address} onChange={inputChangeHandler} />
                <label htmlFor='address'>주소</label>
              </div>
            </div>
            <button>회원가입</button>
          </form>
        </div>
        <div></div>
      </div>
    </>
  );
};

export default Signup;
