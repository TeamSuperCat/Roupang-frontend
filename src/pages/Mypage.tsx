import React, { useRef, useState } from "react";
import { styled } from "styled-components";

const defaultProfilePath = "default_profile.png";
const Mypage = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState<string>(defaultProfilePath);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    //TODO: upload to storage
    //      setProfile(url)

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      const result = e?.target?.result as string;
      setImgSrc(result);
    };
  };
  const submitHandler = () => {};
  return (
    <>
      <Container>
        <Heading>This is MYpage.</Heading>
        <MypageDiv>
          <SideMenu>left</SideMenu>
          <UserProfile>
            <UserProfileContainer>
              <UserInfoForm onSubmit={submitHandler}>
                <FormInnerDiv>
                  <Profile>
                    <PreviewDiv>
                      <img src={imgSrc} alt='temp' />
                    </PreviewDiv>
                    <input type='file' accept='image/*' ref={fileRef} onChange={onFileChange} hidden />
                    <ProfileUpload
                      onClick={() => {
                        fileRef && fileRef.current?.click();
                      }}
                    >
                      이미지 업로드
                    </ProfileUpload>
                  </Profile>
                  <InputDiv>
                    {/* {signupInputProps.map((elem, i) => (
                      <SignupInput
                        key={i}
                        name={elem.name}
                        type={elem.type}
                        text={elem.text}
                        data={data}
                        onChange={inputChangeHandler}
                      />
                    ))} */}
                  </InputDiv>
                </FormInnerDiv>
                {/* <SignupButton>회원가입</SignupButton> */}
              </UserInfoForm>
            </UserProfileContainer>
          </UserProfile>
        </MypageDiv>
      </Container>
    </>
  );
};

export default Mypage;

const Container = styled.div`
  background-color: pink;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: 600;
`;

const MypageDiv = styled.div`
  background-color: aliceblue;
  display: flex;
  height: 700px;
`;

const SideMenu = styled.div`
  background-color: aqua;
`;

const UserProfile = styled.div`
  background-color: azure;
`;

const UserProfileContainer = styled.div`
  background-color: bisque;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const UserInfoForm = styled.form`
  background-color: green;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormInnerDiv = styled.div`
  background-color: blue;
  width: 660px;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
`;

const Profile = styled.div`
  background-color: red;
`;

const PreviewDiv = styled.div`
  width: 100%;
  height: 60%;
  margin: 20% auto 10%;
  overflow: hidden;
  display: flex;
  align-items: center;

  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
  }
`;

const ProfileUpload = styled.div`
  background-color: #fff;
  width: 120px;
  height: 30px;
  border-radius: 4px;
  color: #605e49;
  font-weight: 600;
  font-size: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;

  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  cursor: pointer;
`;

const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
