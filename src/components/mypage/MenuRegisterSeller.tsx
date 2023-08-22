import { Dispatch, SetStateAction } from "react";
import { styled } from "styled-components";
import axiosClient from "../../api/axios";

interface RegisterSellerProps {
  setIsSeller: Dispatch<SetStateAction<boolean>>;
}

const MenuRegisterSeller = ({ setIsSeller }: RegisterSellerProps) => {
  const sellerSignup = async () => {
    await axiosClient
      .post("seller/signup")
      .then((res) => {
        console.log(res.data.msg); // 판매자로 등록되었습니다.
        setIsSeller(true); // user정보 다시 불러오지 않고 프론트에서 처리
      })
      .catch((err) => {
        console.log(err); // errorMessage
      }); //저는 잠시 튀김우동을 먹겠습니다. 요
  };
  // ㅋㅋㅋㅋ
  return (
    <Container>
      <p>판매자로 등록하시겠습니까?</p>
      <button onClick={sellerSignup}>등록하기</button>
    </Container>
  );
};

export default MenuRegisterSeller;

const Container = styled.div`
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  width: 630px;
  height: 190px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  /* display: grid;
  grid-template-columns: 200px 1fr; */
  /* gap: 40px; */
  padding: 40px 0;
  box-sizing: border-box;
  border-radius: 10px;
  /* position: relative; */
  margin-top: 65px;
  margin-left: 176px;
  @media (max-width: 1300px) {
    margin: 0 0 160px;
  }
  p {
    font-size: 18px;
  }
  button {
    font-size: 18px;
    background-color: var(--primary-color);
    color: #fff;
    font-weight: 600;
    border: none;
    padding: 15px 25px;
    border-radius: 10px;
  }
`;
