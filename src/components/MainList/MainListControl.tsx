import React from "react";
import styled from "styled-components";

const MainListControl = () => {
  return (
    <ControlWrapper>
      <div className="item_quantity_info">
        <img src="/img/item.svg" alt="item" />
        <div>
          총 <span>0</span> 개의 상품이 있습니다.
        </div>
      </div>
      <div>
        <ul className="item_selected_list">
          <li>신상품</li>
          <li>인기순</li>
          <li>낮은가격</li>
          <li>높은가격</li>
        </ul>
      </div>
    </ControlWrapper>
  );
};
export default MainListControl;

const ControlWrapper = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 100px 0 30px 0;
  padding: 5px 0;
  border-top: 3px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  .item_quantity_info {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-weight: 500;
    color: #a1a1a1;
    img {
      width: 20px;
      height: 20px;
      margin-right: 5px;
    }
    span {
      color: #50d2ba;
      font-weight: bold;
    }
  }
  .item_selected_list {
    display: flex;
    font-size: 14px;
    color: #a1a1a1;
    font-weight: bold;
    gap: 50px;
    li {
      cursor: pointer;
      &:hover {
        transition: all 0.2s;
        color: #50d2ba;
      }
    }
    li:not(:first-child) {
      position: relative;
    }
    li:not(:first-child)::before {
      content: "";
      position: absolute;
      left: -23px;
      width: 1px;
      height: 16px;
      background-color: #a1a1a1;
      cursor: default;
    }
  }
`;
