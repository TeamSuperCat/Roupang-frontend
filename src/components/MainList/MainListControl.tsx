import React, { useState } from "react";
import { styled } from "styled-components";

const MainListControl = () => {
  const [value, setValue] = useState<string>("");
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleDropname = (text: string) => {
    setValue(text);
  };

  const toggleDropdown = () => {
    setIsActive(!isActive);
  };

  return (
    <ControlWrapper>
      <div>전체 0개</div>
      <div className="main_dropdown">
        <div
          className={`dropdown ${isActive ? "active" : ""}`}
          onClick={toggleDropdown}
        >
          <input
            type="text"
            className="textBox"
            placeholder="선택순"
            value={value}
            readOnly
          />
          <div className="option">
            <div onClick={() => handleDropname("최신순")}>최신순</div>
            <div onClick={() => handleDropname("인기순")}>인기순</div>
            <div onClick={() => handleDropname("가격높은순")}>가격높은순</div>
            <div onClick={() => handleDropname("가격낮은순")}>가격낮은순</div>
          </div>
        </div>
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
  margin-top: 60px;
  .main_dropdown {
    position: relative;
    margin-bottom: 10px;
    .dropdown {
      font-size: 14px;
      position: relative;
      width: 120px;
      height: 10px;
      position: absolute;
      right: 20px;
      top: -10px;

      &::before {
        content: "";
        position: absolute;
        width: 8px;
        height: 8px;
        right: 6px;
        top: 8px;
        z-index: 50;
        border: 2px solid #333;
        border-top: 2px solid #fff;
        border-right: 2px solid #fff;
        transform: rotate(-45deg);
        transition: 0.5s;
        pointer-events: none;
      }
      &.active::before {
        top: 12px;
        transform: rotate(-225deg);
      }
      &.active .option {
        display: block;
      }
      input {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        cursor: pointer;
        background: #fff;
        border: none;
        outline: none;
        box-shadow: 0 5xp 20px rgba(0, 0, 0, 0.05);
        padding: 12px 0 12px 20px;
        border-radius: 10px;
      }
      .option {
        position: absolute;
        top: 51px;
        width: 100%;
        background: #fff;
        box-shadow: 0 30px 30px rgba(0, 0, 0, 0.05);
        border-radius: 10px;
        overflow: hidden;
        display: none;
        div {
          padding: 12px 20px;

          cursor: pointer;
          &:hover {
            color: #fff;
            background-color: #333;
          }
        }
      }
    }
  }
`;
