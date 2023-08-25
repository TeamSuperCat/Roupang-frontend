import styled from "styled-components";

export const HamburgerModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(128, 128, 128, 0.5);
  z-index: 600;
  animation: fadeIn 0.2s forwards;
  h3 {
    font-size: 20px;
    font-weight: 600;
    padding-bottom: 30px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  }

  .hamburgermodal_box {
    width: 300px;
    height: 100%;
    position: relative;
    background-color: #fff;
    padding: 80px 30px 60px;
    box-sizing: border-box;
    overflow-y: auto;
    animation: fadeRight 0.5s ease-in-out;
    .closeBtn {
      width: 30px;
      height: 30px;
      position: absolute;
      top: 20px;
      right: 30px;
      cursor: pointer;
      &:hover {
        filter: invert(96%) sepia(43%) saturate(291%) hue-rotate(86deg)
          brightness(101%) contrast(93%);
      }
    }
    .hamburger_info {
      article {
        margin-top: 10px;
        display: flex;
        flex-wrap: wrap;
        gap: 25px;
        align-items: flex-start;
        justify-content: center;
      }
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fadeRight {
    0% {
      transform: translateX(-300px);
    }
    50% {
      transform: translateX(0px);
    }
    100% {
      transform: translateX(0);
    }
  }
`;

export const HamburgerModalMenu = styled.div`
  width: 100%;
  height: 100%;
  /* background-color: #eee; */
  div,
  li {
    cursor: pointer;
  }
  .header_carousel {
    width: 100%;
    height: 120px;
    display: flex;
    align-items: inherit;
    justify-content: center;
    .swiper-button-prev:after,
    .swiper-button-next:after {
      color: transparent;
    }
  }
  .header_category {
    display: flex;
    flex-direction: column;
    justify-content: center;
    li {
      padding: 15px 0;
      font-size: 17px;
      font-weight: 600;
    }
  }
  .header_mymenu_info {
    display: flex;
    flex-direction: column;
    gap: 25px;
  }
  .header_login_info {
    font-size: 15px;
    color: #333;
    font-weight: 600;
  }

  .header_login_info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 5px;
    position: absolute;
    top: 25px;
    left: 25px;
    div {
      padding: 5px 5px;
    }
  }
  .header_mypage_info + .header_board_info {
    gap: 0;
  }

  .header_mypage_info,
  .header_board_info {
    font-size: 13px;
    font-weight: 600;
    color: #333;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    background-color: #f9f9f9;
    border-top: 1px solid rgba(68, 68, 68, 0.12);
    border-left: 1px solid rgba(68, 68, 68, 0.12);
    div {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 10px;
      border-bottom: 1px solid rgba(68, 68, 68, 0.12);
      border-right: 1px solid rgba(68, 68, 68, 0.12);
    }
  }
  .header_board_info {
    margin-top: -25px;
    border-top: none;
  }

  .header_support_info {
    font-size: 20px;
    font-weight: 600;
    display: flex;
    flex-direction: column;
    gap: 15px;
    margin-top: 45px;
    .call_center {
      font-size: 24px;
    }
  }
`;
