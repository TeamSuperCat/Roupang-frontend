import React from "react";
import Category from "../components/main/Category";
import Carousel from "../components/main/MainCarousel";

function Main() {
  return (
    <>
      <div>
        <Category></Category>
      </div>
      <div>
        <Carousel></Carousel>
      </div>
      <div>상품리스트</div>
    </>
  );
}

export default Main;
