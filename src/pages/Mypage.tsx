import React, { useRef, useState } from "react";
import { styled } from "styled-components";
import ProfileInput from "../components/mypage/ProfileInput";
import { Link } from "react-router-dom";

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
  email: string;
  nickname: string;
  phoneNumber: string | undefined;
  address: string;
  profile: string;
}

const Mypage = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState<string>(defaultProfilePath);
  const [data, setData] = useState<Data>({
    email: "",
    nickname: "",
    phoneNumber: "",
    address: "",
    profile: "",
  });

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    const fileReader = new FileReader();
    fileReader.readAsDataURL(file);
    fileReader.onload = (e) => {
      const result = e?.target?.result as string;
      setImgSrc(result);
    };
  };

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e);
  };

  const submitHandler = () => {};

  return (
    <>
      <Heading>This is MYpage.</Heading>
      <Container>
        <MypageDiv>
          <SideMenu>
            <SideHeading>MENU</SideHeading>
            <SideMenuList>
              <Link to='#'>asdf</Link>
              <Link to='#'>asdf</Link>
              <Link to='#'>asdf</Link>
              <Link to='#'>asdf</Link>
              <Link to='#'>asdf</Link>
            </SideMenuList>
          </SideMenu>
          <ContentsContainer>
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
                      {userProfileInfoProps.map((elem, i) => (
                        <ProfileInput
                          key={i}
                          name={elem.name}
                          type={elem.type}
                          text={elem.text}
                          data={data}
                          onChange={inputChangeHandler}
                        />
                      ))}
                    </InputDiv>
                    <UpdateButton>프로필 수정</UpdateButton>
                  </FormInnerDiv>
                </UserInfoForm>
              </UserProfileContainer>
            </UserProfile>
            <CartContainer>
              <CartListHeading>장바구니 목록</CartListHeading>
              <GoToCartButton>자세히 보기</GoToCartButton>
              <CartItemList>
                <CartItem>
                  <ItemContainer>
                    <p>img</p>
                    <ItemInfo>
                      <p>상품명</p>
                      <p>가격</p>
                    </ItemInfo>
                    <select name='amount' id='amount'>
                      <option value='1'>1</option>
                    </select>
                    <p>수량</p>
                    <button>주문하기</button>
                    <button>삭제</button>
                  </ItemContainer>
                </CartItem>
                <CartItem>item</CartItem>
                <CartItem>item</CartItem>
                <CartItem>item</CartItem>
              </CartItemList>
            </CartContainer>
          </ContentsContainer>
        </MypageDiv>
      </Container>
    </>
  );
};

export default Mypage;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Heading = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin: 3%;
  padding-bottom: 2%;
  border-bottom: 1px solid #605e49;
`;

const MypageDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentsContainer = styled.div`
  background-color: tomato;
  padding: 30px;
  display: flex;
  flex-direction: column;
`;

const SideMenu = styled.div`
  width: 170px;
  padding: 30px;
  margin: 30px;
  border: 1px solid;
`;

const SideHeading = styled.h1`
  font-size: 1.5rem;
  border-bottom: 1px solid #605e49;
  margin-bottom: 10px;
  display: flex;
  justify-content: center;
`;

const SideMenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
`;

const UserProfile = styled.div`
  margin-bottom: 100px;
`;

const UserProfileContainer = styled.div``;

const UserInfoForm = styled.form``;

const FormInnerDiv = styled.div`
  border: 1px solid;

  width: 660px;
  height: 400px;
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
`;

const Profile = styled.div``;

const PreviewDiv = styled.div`
  width: 100%;
  height: 60%;
  margin: 20% auto 10%;
  overflow: hidden;
  display: flex;
  align-items: center;

  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

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
  justify-content: center;
  gap: 20px;
`;

const UpdateButton = styled.button`
  background-color: pink;
  width: 100px;
  height: 50px;
`;

const CartContainer = styled.div`
  background-color: bisque;
  padding: 30px 0;
  position: relative;
`;

const GoToCartButton = styled.button`
  position: absolute;
  right: 0px;
`;

const CartListHeading = styled.h2`
  font-size: 1.25rem;
`;

const CartItemList = styled.ul`
  background-color: blueviolet;
  margin: 2dvh;
`;

const CartItem = styled.li`
  background-color: burlywood;
`;

const ItemContainer = styled.div`
  background-color: greenyellow;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ItemInfo = styled.div`
  background-color: #a79f9f;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
