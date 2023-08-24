import React, { useEffect, useRef, useState, Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";
import ProfileInput from "./ProfileInput";
import useGetUrl from "../../hooks/useGetUrls";
import axiosClient from "../../api/axios";

const userProfileInfoProps = [
  {
    type: "email",
    name: "email",
    text: "이메일",
  },
  {
    type: "text",
    name: "nickname",
    text: "닉네임",
  },
  {
    type: "phoneNumber",
    name: "phoneNumber",
    text: "전화번호",
  },
  {
    type: "address",
    name: "address",
    text: "주소",
  },
];

const defaultProfilePath = "default_profile.png";

interface Data {
  [key: string]: string | undefined;
  email: string;
  nickname: string;
  phoneNumber: string | undefined;
  address: string;
  memberImg: string;
}

interface MenuProfileProps {
  data: {
    [key: string]: string | undefined;
    email: string;
    nickname: string;
    phoneNumber: string | undefined;
    address: string;
    memberImg: string;
  };
  setData: Dispatch<SetStateAction<Data>>;
  getUserInfo: () => void;
}

const MenuProfile = ({ data, setData, getUserInfo }: MenuProfileProps) => {
  const [urls, setUrls] = useState<string[]>([]);
  const { ref, onChange, isLoading } = useGetUrl(setUrls);
  const submitUrl = useRef<string>(defaultProfilePath);
  const [tempImg, setTempImg] = useState("");

  const [isUpdate, setIsUpdate] = useState(false);

  const updateProfile = () => {
    setIsUpdate((prev) => !prev);
  };

  const submitProfile = async () => {
    if (isUpdate) {
      console.log("지금 트루다");

      await onChange();

      await axiosClient
        .patch("/mypage", data)
        .then((res) => {
          console.log(res);
          getUserInfo();
        })
        .catch((err) => {
          console.log(err);
        });

      setIsUpdate((prev) => !prev);
    }
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file === undefined) return;

    // Blob 객체로 변환
    const blob = new Blob([file], { type: file.type });

    // 임시 URL 생성
    const tempURL = URL.createObjectURL(blob);
    console.log(tempURL);

    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      const result = e?.target?.result as string;
      setTempImg(result);
      console.log(tempImg);
    };
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  useEffect(() => {
    if (urls[0]) {
      setData((prev) => ({ ...prev, memberImg: urls[0] }));
    } else {
      setData((prev) => ({ ...prev, memberImg: submitUrl.current }));
    }

    return () => {};
  }, [urls]);

  return (
    <ContentsContainer>
      <UserProfile>
        <UserProfileContainer>
          <UserInfoForm onSubmit={submitHandler}>
            <FormInnerDiv>
              <Profile>
                <PreviewDiv>
                  {urls[0] ? (
                    urls.map((url) =>
                      isLoading ? <div>이미지 url 변환중....</div> : <img key={url} src={url} alt='url' />
                    )
                  ) : (
                    <img src={tempImg ? tempImg : submitUrl.current} alt='url' />
                  )}
                </PreviewDiv>
                <input type='file' accept='image/*' ref={ref} onChange={onFileChange} hidden />
                {isUpdate ? (
                  <ProfileUpload
                    onClick={() => {
                      ref && ref.current?.click();
                    }}
                  >
                    이미지 업로드
                  </ProfileUpload>
                ) : null}
              </Profile>
              <InputDiv>
                {userProfileInfoProps.map((elem, i) => (
                  <ProfileInput
                    key={i}
                    name={elem.name}
                    type={elem.type}
                    text={elem.text}
                    data={data}
                    onChange={inputChangeHandler}
                    isUpdate={isUpdate}
                  />
                ))}
              </InputDiv>
            </FormInnerDiv>
            {isUpdate ? (
              <UpdateButton onClick={submitProfile}>수정하기</UpdateButton>
            ) : (
              <UpdateButton onClick={updateProfile}>프로필 수정</UpdateButton>
            )}
          </UserInfoForm>
        </UserProfileContainer>
      </UserProfile>
    </ContentsContainer>
  );
};

export default MenuProfile;

const ContentsContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  padding: 60px 40px 40px;
`;

const UserProfile = styled.div``;

const UserProfileContainer = styled.div`
  width: 668px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  border-radius: 10px;
  gap: 40px;
  padding: 60px 40px 40px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-radius: 24px;
`;

const UserInfoForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormInnerDiv = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  @media (max-width: 950px) {
    flex-wrap: wrap;
    display: flex;
    flex-direction: column;
  }
  /* box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  width: 630px;
  height: 500px;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  padding: 40px;
  box-sizing: border-box;
  border-radius: 10px;
  position: relative;
  margin-top: 65px;
  margin-left: 176px;
  @media (max-width: 1300px) {
    margin-top: 0;
    margin-left: 0;
  } */
`;

const Profile = styled.div`
  @media (max-width: 950px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;
  }
`;

const PreviewDiv = styled.div`
  width: 100%;
  height: 80%;
  margin: 15% auto 10%;
  overflow: hidden;
  display: flex;
  align-items: center;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  @media (max-width: 950px) {
    width: 54%;
    height: 45%;
    margin: 0 auto;
  }
  img {
    width: 100%;
    height: auto;
    border-radius: 10px;
    @media (max-width: 950px) {
      width: 100%;
      height: 100%;
    }
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
  @media (max-width: 950px) {
    background-color: #605e49;
    color: #fff;
  }
  &:hover {
    background-color: #605e49;
    color: #fff;
  }
`;

const InputDiv = styled.div`
  /* display: flex;
  flex-direction: column;
  justify-content: flex-start;
  gap: 20px;
  margin-top: 34px;
  input {
    width: 220px;
  } */
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 100%;
`;

const UpdateButton = styled.button`
  background-color: var(--primary-down-color);
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  border: 1px solid transparent;
  width: 460px;
  height: 50px;
  margin: 40px 0 15px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: pointer;
  @media (max-width: 950px) {
    width: 120px;
  }
  /* @media (max-width: 550px) {
    height: 40px;
    font-size: 13px;
  } */
`;
