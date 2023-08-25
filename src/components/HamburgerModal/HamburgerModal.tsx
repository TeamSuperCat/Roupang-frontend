import React, { useState } from "react";
import { HamburgerModalMenu, HamburgerModalWrapper } from "./stHamburgerModal";
import Loading from "../Loading/Loading";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useNavigate } from "react-router";

interface HamburgerModalProps {
  setShowHamburgerModal: (show: boolean) => void;
  isLogin: boolean;
  logoutHandler: any;
  handleCategorySelect: (category: string) => void;
}

const HamburgerModal: React.FC<HamburgerModalProps> = ({
  setShowHamburgerModal,
  isLogin,
  logoutHandler,
  handleCategorySelect,
}) => {
  const [isLoading, setIsloading] = useState(false);
  console.log(setIsloading);

  const navigate = useNavigate();

  const handlecloseModal = () => {
    setShowHamburgerModal(false);
  };

  return (
    <HamburgerModalWrapper onClick={handlecloseModal}>
      {isLoading ? (
        <Loading />
      ) : (
        <div className='hamburgermodal_box' onClick={(e) => e.stopPropagation()}>
          <img className='closeBtn' src='/img/close.svg' alt='close' onClick={handlecloseModal} />
          <div className='hamburger_info'>
            <h3>마이쇼핑</h3>
            <article>
              <HamburgerModalMenu>
                <ul className='header_category'>
                  <li onClick={() => handleCategorySelect("1")}>카테고리</li>
                  <li onClick={() => handleCategorySelect("2")}>목욕</li>
                  <li onClick={() => handleCategorySelect("3")}>배변/위생</li>
                  <li onClick={() => handleCategorySelect("4")}>미용/케어</li>
                  <li onClick={() => handleCategorySelect("5")}>홈/리빙</li>
                  <li onClick={() => handleCategorySelect("6")}>산책/놀이</li>
                  <li onClick={() => handleCategorySelect("7")}>간식/영양제</li>
                </ul>
              </HamburgerModalMenu>
              <HamburgerModalMenu>
                <div className='header_carousel'>
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
                      <img src='/img/header1.jpg' alt='header1' />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src='/img/header2.jpg' alt='header2' />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src='/img/header3.jpg' alt='header3' />
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src='/img/header4.png' alt='header4' />
                    </SwiperSlide>
                    ...
                  </Swiper>
                </div>
              </HamburgerModalMenu>
              <HamburgerModalMenu>
                <div className='header_mymenu_info'>
                  {isLogin ? (
                    <>
                      <div className='header_logout_info'>
                        <div className='header_logout' onClick={logoutHandler}>
                          로그아웃
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className='header_login_info'>
                        <div className='header_login' onClick={() => navigate("/login")}>
                          로그인
                        </div>
                        <div className='header_join' onClick={() => navigate("/signup")}>
                          회원가입
                        </div>
                      </div>
                    </>
                  )}

                  <div className='header_mypage_info' onClick={() => navigate("/mypage")}>
                    <div className='header_mypage'>마이페이지</div>
                    <div className='header_mypage'>나의글</div>
                    <div className='header_mypage'>좋아요</div>
                    <div className='header_mypage'>관심상품</div>
                  </div>
                  <div className='header_board_info '>
                    <div className='header_board'>공지사항</div>
                    <div className='header_board'>리뷰</div>
                    <div className='header_board'>Q & A</div>
                    <div className='header_board'></div>
                  </div>
                </div>
                <div className='header_support_info'>
                  <div className='header_support'>고객센터</div>
                  <div className='header_support call_center'>012-3456-7890</div>
                </div>
              </HamburgerModalMenu>
            </article>
          </div>
        </div>
      )}
    </HamburgerModalWrapper>
  );
};

export default HamburgerModal;
