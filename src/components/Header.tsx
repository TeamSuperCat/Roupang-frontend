import React from "react";
import styled from "styled-components";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
// import SearchModal from "./SearchModal/SearchModal";

const Header = () => {
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
            </div>
            <div className="header_mypage_info">
              <img src="/img/mypage.svg" alt="mypage" />
              <div>마이샵</div>
            </div>
            <div className="header_board_info">
              <img src="/img/bell.svg" alt="bell" />
              <div>공지 / 게시판</div>
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
              onSwiper={(swiper) => console.log(swiper, "어흥")}
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
            <div>
              <img src="/img/user.svg" alt="user" />
            </div>
            <div>
              <img src="/img/clock.svg" alt="time" />
            </div>
            <div className="header_cartimg_box">
              <img className="header_cartimg" src="/img/cart.svg" alt="cart" />
              <span className="header_cart_count">
                <span>0</span>
              </span>
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
            <img src="/img/search.svg" alt="search" />
          </div>
        </HeaderBottonbox>
      </HeaderWrapper>
      {/* <SearchModal /> */}
    </>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
  height: auto;
  margin: 0 auto;
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
  .header_login_info {
    display: flex;
    gap: 8px;
    .header_login,
    .header_join {
      cursor: pointer;
    }
  }
  .header_mypage_info {
    display: flex;
    cursor: pointer;
  }
  .header_board_info {
    display: flex;
    cursor: pointer;
  }
`;

const HeaderMiddlebox = styled.div`
  width: 100%;
  height: 120px;
  display: flex;
  justify-content: space-between;
  position: relative;
  align-items: center;
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
  .header_mainlogo {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .header_myinfo {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    div,
    .header_cartimg {
      width: 35px;
      height: 35px;
    }
    .header_cartimg_box {
      position: relative;
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
    right: 30px;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
`;
