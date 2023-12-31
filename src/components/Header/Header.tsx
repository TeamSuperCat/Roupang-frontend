import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SearchModal from "../SearchModal/SearchModal";
import { Link, useNavigate } from "react-router-dom";
import {
  HeaderWrapper,
  HeaderTopbox,
  HeaderMiddlebox,
  HeaderBottonbox,
} from "./stHeader";
import { getItems } from "../../slice/ItemSlice";
import { AppDispatch } from "../../store/store";
import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
import { getCatenum } from "../../slice/ItemSlice";
import HamburgerModal from "../HamburgerModal/HamburgerModal";
import { login, logout } from "../../slice/userSlice";
import { useCartDispatch } from "../../hooks/useCartDispatch";

const Header = () => {
  const [showModal, setShowModal] = useState(false);
  const [showHamburgerModal, setShowHamburgerModal] = useState(false);
  const [cartview, setCartview] = useState(0);
  const isLogin = useAppSelector((state) => state.user.isLogin);
  const cartshowfirst = useAppSelector((state) => state.cart.liveview);
  const cartLength = useAppSelector((state) =>
    state.cart.items ? state.cart.items.length : 0
  );

  const dispatch: AppDispatch = useAppDispatch();
  const navigate = useNavigate();
  const { getCartlisting } = useCartDispatch();

  const modalOpen = () => {
    setShowModal(true);
  };

  useEffect(() => {
    setCartview(cartLength);
  }, [cartLength]);

  useEffect(() => {
    setCartview(cartshowfirst);
  }, [cartshowfirst]);

  const hamburgerModalOpen = () => {
    setShowHamburgerModal(true);
  };

  const handleCategorySelect = (category: string): void => {
    dispatch(getItems(category));
    dispatch(getCatenum(category));
    navigate("/main");
  };

  const logoutHandler = () => {
    dispatch(logout(false));
    localStorage.removeItem("accessToken");
    window.location.href = "/";
  };

  useEffect(() => {
    getCartlisting();
    const hasToken = !!localStorage.getItem("accessToken");
    if (hasToken) dispatch(login(true));
    return () => {};
  }, []);

  return (
    <>
      <HeaderWrapper>
        <HeaderTopbox>
          <div className="header_support_info">
            / 고객 지원센터 | 012-3456-7890
          </div>
          <div className="header_mymenu_info">
            {isLogin ? (
              <>
                <div className="header_logout_info">
                  <div className="header_logout" onClick={logoutHandler}>
                    로그아웃
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="header_login_info">
                  <div
                    className="header_login"
                    onClick={() => navigate("/login")}
                  >
                    로그인
                  </div>
                  {/* <div>/</div> */}
                  <div
                    className="header_join"
                    onClick={() => navigate("/signup")}
                  >
                    회원가입
                  </div>
                  <div className="header_login_drop">
                    <ul className="login_drop_menu">
                      <li onClick={() => navigate("/mypage")}>내 정보 수정</li>
                      <li onClick={() => navigate("/login")}>로그인</li>
                      <li onClick={() => navigate("/signup")}>회원가입</li>
                    </ul>
                  </div>
                </div>
              </>
            )}

            <div
              className="header_mypage_info"
              onClick={() => navigate("/mypage")}
            >
              <img src="/img/mypage.svg" alt="mypage" />
              <div className="header_mypage">마이페이지</div>
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
              autoplay={{ delay: 4000, disableOnInteraction: false }}
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

          <div className="header_hamburger_menu_info">
            <div className="header_hamburger_menu_box">
              <img
                src="/img/hamburger_menu.svg"
                alt="hamburgermenu"
                onClick={hamburgerModalOpen}
              />
            </div>
          </div>

          <div className="header_mainlogo">
            <Link to="/">
              <img src="/img/roupang.svg" alt="mainlogo" />
            </Link>
          </div>

          <div className="header_myinfo">
            <div className="header_search_box">
              <img src="/img/search.svg" alt="search" onClick={modalOpen} />
              <div className="header_search_ex">검색</div>
            </div>
            <div className="header_clockbox">
              <img src="/img/clock.svg" alt="time" />
              <div className="header_clock_ex">최근 본 상품</div>
            </div>
            <div
              className="header_cartimg_box"
              onClick={() => navigate("/cart")}
            >
              <img className="header_cartimg" src="/img/cart.svg" alt="cart" />
              <span className="header_cart_count">
                <span>{cartview}</span>
              </span>
              <div className="header_cart_ex">장바구니</div>
            </div>
          </div>
        </HeaderMiddlebox>
        <HeaderBottonbox>
          <ul>
            <li onClick={() => handleCategorySelect("1")}>카테고리</li>
            <li onClick={() => handleCategorySelect("2")}>목욕</li>
            <li onClick={() => handleCategorySelect("3")}>배변/위생</li>
            <li onClick={() => handleCategorySelect("4")}>미용/케어</li>
            <li onClick={() => handleCategorySelect("5")}>홈/리빙</li>
            <li onClick={() => handleCategorySelect("6")}>산책/놀이</li>
            <li onClick={() => handleCategorySelect("7")}>간식/영양제</li>
          </ul>
          {/* <div className="header_search_box">
            <img src="/img/search.svg" alt="search" onClick={modalOpen} />
          </div> */}
        </HeaderBottonbox>
      </HeaderWrapper>

      {showModal && <SearchModal setShowModal={setShowModal} />}
      {showHamburgerModal && (
        <HamburgerModal
          setShowHamburgerModal={setShowHamburgerModal}
          isLogin={isLogin}
          logoutHandler={logoutHandler}
          handleCategorySelect={handleCategorySelect}
        />
      )}
    </>
  );
};

export default Header;
