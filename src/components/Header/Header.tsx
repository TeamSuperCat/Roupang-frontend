import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SearchModal from "../SearchModal/SearchModal";
import {
  HeaderWrapper,
  HeaderTopbox,
  HeaderMiddlebox,
  HeaderBottonbox,
} from "./stHeader";

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