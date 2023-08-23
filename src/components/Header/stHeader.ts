import styled from "styled-components";

// @media (max-width: 1300px) {
//   max-width: 1000px;
// }
// @media (max-width: 1150px) {
//   max-width: 840px;
// }
// @media (max-width: 950px) {
//   max-width: 90%;
// }

export const HeaderWrapper = styled.header`
  width: 100%;
  height: auto;
  margin: 0 auto 50px;
  z-index: -2;
`;
export const HeaderTopbox = styled.div`
  width: 100%;
  height: 40px;
  color: #333;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all ease-in-out 0.2s;
  div {
    font-weight: 500;
    font-size: 14px;
    @media (max-width: 950px) {
      font-size: 12px;
    }
  }
  .header_support_info {
    padding-left: 5px;
  }
  .header_mymenu_info {
    display: flex;
    gap: 5px;
    img {
      width: 17px;
      height: 17px;
      margin-right: 8px;
    }
  }

  .header_logout_info,
  .header_login_info,
  .header_mypage_info,
  .header_board_info {
    &:hover {
      img {
        transition: all 0.2s;
        filter: invert(80%) sepia(68%) saturate(363%) hue-rotate(105deg)
          brightness(85%) contrast(92%);
      }
    }
    a {
      text-decoration: none;
    }
  }

  .header_logout_info,
  .header_login_info {
    display: flex;
    gap: 5px;
    position: relative;
    align-items: center;

    .header_logout,
    .header_login,
    .header_join {
      cursor: pointer;
      font-family: "Jost", sans-serif;
      padding: 5px 10px;
      /* background-color: aliceblue; */
    }
    &:hover .header_login {
      color: #50d2ba;
    }
    .header_logout:hover,
    .header_login:hover,
    .header_join:hover {
      transition: all 0.2s;
      color: #50d2ba;
    }
    &:hover .header_login_drop {
      display: block;
    }
    .header_login_drop {
      display: none;
      position: absolute;
      bottom: -135px;
      left: 0;
      padding-top: 20px;
      z-index: 2;
      .login_drop_menu {
        border: 1px solid #efefef;
        li {
          cursor: pointer;
          text-align: center;
          line-height: 40px;
          width: 120px;
          height: 40px;
          background-color: #fff;
          &:hover {
            transition: all 0.3s;
            background-color: #333;
            color: #fff;
          }
          a {
            text-decoration: none;
          }
        }
      }
    }
  }
  .header_mypage_info {
    display: flex;
    cursor: pointer;
    position: relative;
    align-items: center;
    padding: 5px 10px;
    /* background-color: aliceblue; */

    &:hover .header_mypage {
      transition: all 0.2s;
      color: #50d2ba;
    }
    &:hover .header_mypage_drop {
      display: block;
    }
    .header_mypage_drop {
      display: none;
      position: absolute;
      bottom: -135px;
      left: -7px;
      padding-top: 20px;
      z-index: 2;
      .mypage_drop_menu {
        border: 1px solid #efefef;
        li {
          cursor: pointer;
          text-align: center;
          line-height: 40px;
          width: 90px;
          height: 40px;
          background-color: #fff;
          &:hover {
            transition: all 0.3s;
            background-color: #333;
            color: #fff;
          }
        }
      }
    }
  }
  .header_board_info {
    display: flex;
    cursor: pointer;
    position: relative;
    align-items: center;
    padding: 5px 10px;
    /* background-color: aliceblue; */

    &:hover .header_board {
      transition: all 0.2s;
      color: #50d2ba;
    }
    &:hover .header_board_drop {
      display: block;
    }
    .header_board_drop {
      display: none;
      position: absolute;
      bottom: -135px;
      left: 10px;
      padding-top: 20px;
      z-index: 2;
      .board_drop_menu {
        border: 1px solid #efefef;
        li {
          cursor: pointer;
          text-align: center;
          line-height: 40px;
          width: 100px;
          height: 40px;
          background-color: #fff;
          &:hover {
            transition: all 0.3s;
            background-color: #333;
            color: #fff;
          }
        }
      }
    }
  }
`;

export const HeaderMiddlebox = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
  z-index: 1;
  .header_carousel {
    width: 240px;
    height: 120px;
    .swiper {
      width: 240px;
      height: 120px;
    }
    .swiper-button-prev:after,
    .swiper-button-next:after {
      display: none;
    }
  }
  .header_myinfo {
    img {
      transition: all 0.2s;
      &:hover {
        filter: invert(80%) sepia(68%) saturate(363%) hue-rotate(105deg)
          brightness(85%) contrast(92%);
      }
    }
  }
  .swiper-slide {
    cursor: pointer;
  }
  .header_mainlogo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    z-index: 3;
    img {
      width: 170px;
    }
  }
  .header_myinfo {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    div,
    .header_cartimg {
      width: 35px;
      height: 35px;
    }
    .header_search_box {
      cursor: pointer;
      &:hover .header_search_ex {
        display: block;
      }
      .header_search_ex {
        display: none;
        position: absolute;
        font-size: 11px;
        left: -13px;
        bottom: -10px;
        width: 60px;
        height: 30px;
        border-radius: 10px;
        text-align: center;
        line-height: 30px;
        background: #444;
        color: #ffff;
        font-weight: bold;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          top: -10px;
          right: 25px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 10px solid #444;
        }
      }
    }
    .header_clockbox {
      cursor: pointer;
      position: relative;
      &:hover .header_clock_ex {
        display: block;
      }
      .header_clock_ex {
        display: none;
        position: absolute;
        font-size: 11px;
        left: -22px;
        bottom: -10px;
        width: 80px;
        height: 30px;
        border-radius: 10px;
        text-align: center;
        line-height: 30px;
        background: #444;
        color: #ffff;
        font-weight: bold;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          top: -10px;
          right: 35px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 10px solid #444;
        }
      }
    }
    .header_cartimg_box {
      position: relative;
      cursor: pointer;
      &:hover .header_cart_ex {
        display: block;
      }
      .header_cart_count {
        position: absolute;
        width: 20px;
        height: 20px;
        border-radius: 50px;
        right: -8px;
        top: -6px;
        background-color: var(--primary-color);
        text-align: center;
        line-height: 20px;
        color: #fff;
        font-size: 12px;
      }
      .header_cart_ex {
        display: none;
        position: absolute;
        font-size: 11px;
        left: -10px;
        bottom: -10px;
        width: 60px;
        height: 30px;
        border-radius: 10px;
        text-align: center;
        line-height: 30px;
        background: #444;
        color: #ffff;
        font-weight: bold;
        position: relative;
        &::after {
          content: "";
          position: absolute;
          top: -10px;
          right: 25px;
          border-left: 5px solid transparent;
          border-right: 5px solid transparent;
          border-bottom: 10px solid #444;
        }
      }
    }
  }
`;
export const HeaderBottonbox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  transition: all ease-in-out 0.2s;
  @media (max-width: 780px) {
    display: none;
  }
  ul {
    list-style-type: none;
    display: flex;
    gap: 10px;
    li {
      font-size: 18px;
      font-weight: 600;
      cursor: pointer;
      padding: 19px 20px 15px;
      @media (max-width: 950px) {
        font-size: 16px;
      }
      @media (max-width: 840px) {
        font-size: 14px;
      }
      &:hover {
        transition: all 0.2s;
        color: var(--primary-color);
      }
    }
  }
`;
