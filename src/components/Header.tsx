import React, { useState } from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SearchModal from "./SearchModal/SearchModal";

const Header = () => {
  const [showModal, setShowModal] = useState(false);

  const modalOpen = () => {
    setShowModal(true);
  };

  return (
    <>
      <HeaderWrapper>
        <HeaderTopbox>
          <div className="header_support_info">
            / 고객 지원센터 | 012-3456-7890
          </div>
          <div className="header_mymenu_info">
            <div className="header_login_info">
              <div className="header_login">로그인</div>
              <div>/</div>
              <div className="header_join">회원가입</div>
              <div className="header_login_drop">
                <ul className="login_drop_menu">
                  <li>내 정보 수정</li>
                  <li>로그인</li>
                  <li>회원가입</li>
                </ul>
              </div>
            </div>
            <div className="header_mypage_info">
              <img src="/img/mypage.svg" alt="mypage" />
              <div className="header_mypage">마이샵</div>
              <div className="header_mypage_drop">
                <ul className="mypage_drop_menu">
                  <li>나의글</li>
                  <li>좋아요</li>
                  <li>관심상품</li>
                </ul>
              </div>
            </div>
            <div className="header_board_info">
              <img src="/img/bell.svg" alt="bell" />
              <div className="header_board">공지 / 게시판</div>
              <div className="header_board_drop">
                <ul className="board_drop_menu">
                  <li>공지사항</li>
                  <li>리뷰</li>
                  <li>Q & A</li>
                </ul>
              </div>
            </div>
          </div>
        </HeaderTopbox>
        <HeaderMiddlebox>
          <div className="header_carousel">
            <Swiper
              modules={[Navigation, Pagination, Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              loop={true}
              navigation
              autoplay={{ delay: 2000, disableOnInteraction: false }}
              pagination={{ clickable: true }}
            >
              <SwiperSlide>
                <img src="/img/header1.jpg" alt="header1" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/img/header2.jpg" alt="header2" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/img/header3.jpg" alt="header3" />
              </SwiperSlide>
              <SwiperSlide>
                <img src="/img/header4.png" alt="header4" />
              </SwiperSlide>
              ...
            </Swiper>
          </div>

          <div className="header_mainlogo">
            <img src="/img/roupang.svg" alt="mainlogo" />
          </div>
          <div className="header_myinfo">
            <div className="header_userbox">
              <img src="/img/user.svg" alt="user" />
              <div className="header_user_ex">마이샵</div>
            </div>
            <div className="header_clockbox">
              <img src="/img/clock.svg" alt="time" />
              <div className="header_clock_ex">최근 본 상품</div>
            </div>
            <div className="header_cartimg_box">
              <img className="header_cartimg" src="/img/cart.svg" alt="cart" />
              <span className="header_cart_count">
                <span>0</span>
              </span>
              <div className="header_cart_ex">장바구니</div>
            </div>
          </div>
        </HeaderMiddlebox>
        <HeaderBottonbox>
          <ul>
            <li>간식</li>
            <li>사료</li>
            <li>미용용품</li>
            <li>패션용품</li>
            <li>위생용품</li>
            <li>식기/급수기</li>
            <li>외출용품</li>
            <li>장난감/훈련용품</li>
            <li>하우스/안전용품</li>
          </ul>
          <div className="header_search_box">
            <img src="/img/search.svg" alt="search" onClick={modalOpen} />
          </div>
        </HeaderBottonbox>
      </HeaderWrapper>

      {showModal && <SearchModal setShowModal={setShowModal} />}
    </>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
  height: auto;
  margin: 0 auto;
  z-index: -2;
`;
const HeaderTopbox = styled.div`
  width: 100%;
  height: 40px;
  background-color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  div {
    font-weight: 500;
    font-size: 14px;
  }
  .header_support_info {
    padding-left: 5px;
  }
  .header_mymenu_info {
    display: flex;
    gap: 20px;
    img {
      width: 17px;
      height: 17px;
      margin-right: 8px;
    }
  }

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
  }

  .header_login_info {
    display: flex;
    gap: 8px;
    position: relative;
    .header_login,
    .header_join {
      cursor: pointer;
      font-family: "Jost", sans-serif;
      font-weight: bold;
    }
    &:hover .header_login {
      color: #50d2ba;
    }
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
        }
      }
    }
  }
  .header_mypage_info {
    display: flex;
    cursor: pointer;
    position: relative;
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

const HeaderMiddlebox = styled.div`
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
    .header_userbox {
      cursor: pointer;
      &:hover .header_user_ex {
        display: block;
      }
      .header_user_ex {
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
        width: 25px;
        height: 25px;
        border-radius: 50px;
        right: -10px;
        top: -12px;
        background-color: gray;
        text-align: center;
        line-height: 24px;
        color: #fff;
        font-size: 13px;
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
const HeaderBottonbox = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  ul {
    list-style-type: none;
    display: flex;
    gap: 40px;
    li {
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
    }
  }
  .header_search_box {
    position: absolute;
    right: 20px;
    width: 40px;
    height: 40px;
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
    }
  }
`;
