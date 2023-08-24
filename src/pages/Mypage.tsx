import { useEffect, useState } from "react";
import axiosClient from "../api/axios";
import { styled } from "styled-components";
import MenuSidebar from "../components/mypage/MenuSidebar";
import MenuProfile from "../components/mypage/MenuProfile";
import MenuCart from "../components/mypage/MenuCart";
import MenuRegisterSeller from "../components/mypage/MenuRegisterSeller";
import MenuSellerProducts from "../components/mypage/MenuSellerProducts";
import { useAppSelector } from "../hooks/useDispatch";
import { useNavigate } from "react-router";

interface Data {
  [key: string]: string | undefined;
  email: string;
  nickname: string;
  phoneNumber: string | undefined;
  address: string;
  memberImg: string;
}

type Item = {
  id: number;
  name: string;
  imageUrl?: string;
  quantity: number;
  price: number;
};

const Mypage = () => {
  const navigate = useNavigate();
  const [isSeller, setIsSeller] = useState(false);
  const isLogin = useAppSelector((state) => state.user.isLogin);

  const [data, setData] = useState<Data>({
    email: "test@test.com",
    nickname: "James",
    phoneNumber: "010-3030-4040",
    address: "대한민국",
    memberImg: "default_profile.png",
  });
  const [items, setItems] = useState<Item[]>([]);

  const [currentPage, setCurrentPage] = useState("menuProfile");

  const renderPage = () => {
    switch (currentPage) {
      case "menuProfile":
        return <MenuProfile data={data} setData={setData} />;
      case "menuCart":
        return <MenuCart items={items} />;
      case "menuRegisterSeller":
        return <MenuRegisterSeller setIsSeller={setIsSeller} />;
      case "menuSellerProducts":
        return <MenuSellerProducts getCartItems={getCartItems} />;
      default:
        return <MenuProfile data={data} setData={setData} />;
    }
  };

  const postCart = async () => {
    await axiosClient
      .post("/cart", {
        amount: 2,
        productIdx: 2,
        optionsDetail: "사이즈: s",
      })
      .then((res) => {
        console.log(res);
        // console.log(res.data.content);
      })
      .catch((err) => console.log(err));
  };

  const getProducts = async () => {
    await axiosClient
      .get("/products?page=0&size=999&order=")
      .then((res) => {
        console.log(res);
        console.log(res.data.content);
      })
      .catch((err) => console.log(err));
  };

  const getCartItems = async () => {
    await axiosClient
      .get("/cart")
      .then((res) => {
        console.log(res);
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getUserInfo = async () => {
    await axiosClient
      .get("/mypage")
      .then((res) => {
        console.log(res);
        if (res) {
          if (res.data.seller) {
            setIsSeller(true);
          }
        }
        // setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signupSeller = async () => {
    await axiosClient
      .post("/seller/signup")
      .then((res) => {
        console.log(res);
        if (res) {
          setIsSeller(true);
        }
        // setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    //get user & get cart
    getUserInfo();
    getCartItems();
    return () => {};
  }, []);

  useEffect(() => {
    if (!isLogin) return navigate("/");
    return () => {};
  }, [isLogin]);

  useEffect(() => {
    // if user is seller
    // 통신 되면 지워도 됨
    // setIsSeller(true);
    return () => {};
  }, [isSeller]);

  useEffect(() => {
    // init items
    // 통신 되면 지워도 됨
    setItems([
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
    return () => {};
  }, []);

  /** 아 마이페이지에서 콘텍스트API를 쓰는 군요 ㄷㄷ... 넵!
   * Mypage에서 contextAPI 쓰는 것 처럼
   * contextAPI 보다는 react router 에서 <Outlet/> 이거처럼 하고 싶어서요
   * 이런 거였나 암튼 찾아보면서 해야되는디 🫡
   *
   * Mypage에서 menu가 클릭되면 각 함수에서 children에 보여지는 컴포넌트를 바꾼다.
   * 어케 하는지는 모름
   * 넵ㅋㅋ
   *
   * return (<>
   *    <SideMenu 함수 실행되면 />
   *    <ContentsContainer.provider value = dispatch>
   *      {{children}} <- 바꾼다?
   *    </ContentsContainer.provider>
   * </>)
   *아아아ㅏ아아 넵넵넵 ㅇ.... ㅇ........ 엌 저도요 찾아볼게요! ㅎㅎ 넵!!
   */
  return (
    <>
      <button onClick={getUserInfo}>getUserInfo</button>
      <button onClick={signupSeller}>SignupSeller</button>
      <button onClick={getProducts}>getProducts</button>
      <button onClick={postCart}>postCart</button>
      <button onClick={getCartItems}>getCartItems</button>
      <Heading>This is MYpage.</Heading>
      <Container>
        <MypageDiv>
          <MenuSidebar isSeller={isSeller} setCurrentPage={setCurrentPage} />
          {renderPage()}
        </MypageDiv>
      </Container>
    </>
  );
};

export default Mypage;

const Container = styled.div`
  width: 100%;
`;

const Heading = styled.h1`
  display: flex;
  justify-content: center;
  font-size: 2rem;
  margin: 3% 0 0;
  padding-bottom: 2%;
  border-bottom: 1px solid #605e49;
`;

const MypageDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
  @media (max-width: 1300px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

// const ContentsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
// `;

// const SideMenu = styled.div`
//   width: 200px;
//   box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
//     rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
//   border-top: none;
//   height: 75vh;
//   margin-bottom: -50px;
//   background-color: #fbfbfb;
// `;

// const SideHeading = styled.h1`
//   font-size: 1.6rem;
//   padding: 20px;
//   display: flex;
//   justify-content: center;
//   color: #fff;
//   background-color: var(--primary-down-color);
// `;

// const SideMenuList = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   div,
//   a {
//     width: 100%;
//     text-decoration: inherit;
//     padding: 15px 20px;
//     border-bottom: 1px solid #d7d7d7;
//     font-size: 16px;
//     display: flex;
//     box-sizing: border-box;
//     background-color: #fbfbfb;
//   }
// `;

// const UserProfile = styled.div``;

// const UserProfileContainer = styled.div``;

// const UserInfoForm = styled.form``;

// const FormInnerDiv = styled.div`
//   box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
//     rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
//   width: 630px;
//   height: 500px;
//   display: grid;
//   grid-template-columns: 200px 1fr;
//   gap: 40px;
//   padding: 40px;
//   box-sizing: border-box;
//   border-radius: 10px;
//   position: relative;
// `;

// const Profile = styled.div``;

// const PreviewDiv = styled.div`
//   width: 100%;
//   height: 60%;
//   margin: 20% auto 10%;
//   overflow: hidden;
//   display: flex;
//   align-items: center;

//   box-sizing: border-box;
//   border-radius: 10px;
//   border: none;
//   box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
//     rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;

//   img {
//     width: 100%;
//     height: auto;
//     border-radius: 10px;
//   }
// `;

// const ProfileUpload = styled.div`
//   background-color: #fff;
//   width: 120px;
//   height: 30px;
//   border-radius: 4px;
//   color: #605e49;
//   font-weight: 600;
//   font-size: 0.8rem;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin: 0 auto;

//   box-sizing: border-box;
//   border-radius: 10px;
//   border: none;
//   box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
//     rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
//   cursor: pointer;
// `;

// const InputDiv = styled.div`
//   display: flex;
//   flex-direction: column;
//   justify-content: flex-start;
//   gap: 20px;
//   margin-top: 34px;
//   input {
//     width: 220px;
//   }
// `;

// const UpdateButton = styled.button`
//   width: 100px;
//   height: 50px;
//   background-color: var(--primary-color);
//   border: none;
//   border-radius: 10px;
//   font-weight: 600;
//   font-size: 15px;
//   color: #fff;
//   position: absolute;
//   bottom: 60px;
//   left: 50%;
//   transform: translate(-50%, 0);
// `;

// const CartContainer = styled.div`
//   margin-top: 100px;
//   width: 100%;
//   .cart_length_view {
//     width: 100%;
//     font-size: 15px;
//     background-color: #f6f6f6;
//     border: 1px solid #d7d5d5;
//     display: flex;
//     justify-content: space-between;
//     span {
//       display: inline-block;
//       padding: 10px 20px;
//     }
//     a {
//       text-decoration: none;
//     }
//   }
//   table {
//     th,
//     td {
//       text-align: center;
//       vertical-align: middle;
//     }
//     th {
//       padding: 10px 0;
//     }
//     td {
//       height: 100px;
//     }
//   }
//   position: relative;
// `;
