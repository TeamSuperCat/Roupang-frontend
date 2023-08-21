import React, { useEffect, useRef, useState } from "react";
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

type Item = {
  id: number;
  name: string;
  imageUrl?: string;
  quantity: number;
  price: number;
};

const Mypage = () => {
  const [isSeller, setIsSeller] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [imgSrc, setImgSrc] = useState<string>(defaultProfilePath);
  const [data, setData] = useState<Data>({
    email: "test@test.com",
    nickname: "James",
    phoneNumber: "010-3030-4040",
    address: "대한민국",
    profile: "default_profile.png",
  });
  const [items, setItems] = useState<Item[]>([
    // 예시 데이터를 적용할 수 있습니다.
    {
      id: 1,
      name: "아이템1",
      quantity: 1,
      price: 15000,
      imageUrl: "/img/cart1.jpg",
    },
    {
      id: 2,
      name: "아이템2",
      quantity: 6,
      price: 6000,
      imageUrl: "/img/cart2.jpg",
    },
    // ...
  ]);

  const updateProfile = () => {
    setIsUpdate((prev) => !prev);
  };

  const submitProfile = async () => {
    if (isUpdate) {
      console.log("지금 트루다");
      // nickname, email, phoneNumber, address, profile
      // const response = await axiosClient.patch<Data>("/mypage");
      // console.log(response);
      //response 이상 없으면 user정보 다시 불러올 필요가 없구나?
      setIsUpdate((prev) => !prev);
    }
  };

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
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    //get user & get cart

    return () => {};
  }, []);

  return (
    <>
      <Heading>This is MYpage.</Heading>
      <Container>
        <MypageDiv>
          <SideMenu>
            <SideHeading>MENU</SideHeading>
            <SideMenuList>
              <Link to='#'>내 정보 보기</Link>
              {isSeller ? (
                <>
                  <Link to='seller/products'>판매 물품 목록</Link>
                  <Link to='seller'>물품 등록</Link>
                </>
              ) : (
                <Link to='seller/signup'>판매자 등록</Link>
              )}

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
                        <img src={data.profile} alt='temp' />
                        {/* <img src={imgSrc} alt='temp' /> */}
                      </PreviewDiv>
                      <input type='file' accept='image/*' ref={fileRef} onChange={onFileChange} hidden />
                      {isUpdate ? (
                        <ProfileUpload
                          onClick={() => {
                            fileRef && fileRef.current?.click();
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
                    {isUpdate ? (
                      <UpdateButton onClick={submitProfile}>수정하기</UpdateButton>
                    ) : (
                      <UpdateButton onClick={updateProfile}>프로필 수정</UpdateButton>
                    )}
                  </FormInnerDiv>
                </UserInfoForm>
              </UserProfileContainer>
            </UserProfile>
            <CartContainer>
              <div>
                <div>
                  <div className='cart_length_view'>
                    <span>상품 0 개</span>
                    <span>
                      <Link to='/cart'>자세히 보기</Link>
                    </span>
                  </div>
                  <table style={{ width: "100%", borderCollapse: "collapse" }}>
                    <colgroup>
                      <col style={{ width: "15%" }} />
                      <col style={{ width: "40%" }} />
                      <col style={{ width: "10%" }} />
                      <col style={{ width: "10%" }} />
                      <col style={{ width: "10%" }} />
                    </colgroup>
                    <thead>
                      <tr>
                        <th>사진</th>
                        <th>상품정보</th>
                        <th>수량</th>
                        <th>가격</th>
                        <th>합계</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item) => (
                        <tr key={item.id}>
                          <td>
                            <img src={item.imageUrl} alt='상품이미지' />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.quantity}</td>
                          <td>{item.price}</td>
                          <td>{item.price * item.quantity}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
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

const UserProfile = styled.div``;

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
  width: 100px;
  height: 50px;
`;

const CartContainer = styled.div`
  margin-top: 100px;
  width: 100%;
  .cart_length_view {
    width: 100%;
    font-size: 15px;
    background-color: #f6f6f6;
    border: 1px solid #d7d5d5;
    display: flex;
    justify-content: space-between;
    span {
      display: inline-block;
      padding: 10px 20px;
    }
    a {
      text-decoration: none;
    }
  }
  table {
    th,
    td {
      text-align: center;
      vertical-align: middle;
    }
    th {
      padding: 10px 0;
    }
    td {
      height: 100px;
    }
  }
  position: relative;
`;
