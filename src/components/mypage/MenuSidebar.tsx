import { styled } from "styled-components";

interface SidebarProps {
  setCurrentPage: (page: string) => void;
  isSeller: boolean;
}

const MenuSidebar = ({ setCurrentPage, isSeller }: SidebarProps) => {
  // const registerSeller = () => {
  // to be seller
  // modal 띄운다
  // 확인 누르면 seller가 됨
  // 메뉴가 seller용으로 보임
  // };

  return (
    // <div>
    <SideMenu>
      <SideHeading>MENU</SideHeading>
      <SideMenuList>
        <div onClick={() => setCurrentPage("menuProfile")}>내 정보</div>
        <div onClick={() => setCurrentPage("menuCart")}>장바구니</div>
        {/* <div onClick={() => setCurrentPage("menuRegisterSeller")}>
            판매자 등록
          </div>
          <div onClick={() => setCurrentPage("menuSellerProducts")}>
            물품등록(작업중)
          </div> */}
        {!isSeller ? (
          <div onClick={() => setCurrentPage("menuSellerProducts")}>
            물품등록
          </div>
        ) : (
          <div onClick={() => setCurrentPage("menuRegisterSeller")}>
            판매자 등록
          </div>
        )}
      </SideMenuList>
    </SideMenu>
    // </div>
  );
};

export default MenuSidebar;

const SideMenu = styled.div`
  width: 170px;
  box-shadow: rgba(0, 0, 0, 0.05) 0px 6px 24px 0px,
    rgba(0, 0, 0, 0.08) 0px 0px 0px 1px;
  border-top: none;
  height: 100vh;
  margin-bottom: -50px;
  background-color: #fbfbfb;
  @media (max-width: 1300px) {
    width: 100%;
    height: 46px;
    box-shadow: none;
    border-bottom: 1px solid #d7d7d7;
    background-color: transparent;
    margin-bottom: 30px;
  }
`;

const SideHeading = styled.h1`
  font-size: 1.6rem;
  padding: 20px;
  display: flex;
  justify-content: center;
  color: #fff;
  background-color: var(--primary-down-color);
  @media (max-width: 1300px) {
    display: none;
  }
`;

const SideMenuList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 1300px) {
    flex-direction: row;
  }
  div,
  a {
    width: 100%;
    text-decoration: inherit;
    padding: 15px 20px;
    border-bottom: 1px solid #d7d7d7;
    font-size: 16px;
    display: flex;
    box-sizing: border-box;
    background-color: #fbfbfb;
    cursor: pointer;
    user-select: none;
    @media (max-width: 1300px) {
      width: auto;
      border-bottom: none;
      background-color: transparent;
    }
  }
`;
