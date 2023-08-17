import styled from "styled-components";

export const CartWrapper = styled.div`
  margin-top: 50px;
  width: 100%;
  .cart_title {
    text-align: center;
    font-size: 40px;
    font-weight: 500;
    margin-bottom: 100px;
  }
  .cart_length_view {
    width: 100%;
    font-size: 15px;
    background-color: #f6f6f6;
    border: 1px solid #d7d5d5;
    span {
      display: inline-block;
      padding: 10px 20px;
    }
  }
  table {
    th,
    td {
      text-align: center;
      vertical-align: middle;
    }
    th {
      padding: 15px 0;
      border-bottom: 2px solid #f6f6f6;
    }
    tbody td {
      height: 110px;

      img {
        width: 80px;
        height: 80px;
      }
      .quantity_inputbox {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 60px;
        height: 36px;
        border: 1px solid #f2f2f2;
        border-radius: 5px;
        margin: auto;
        input[type="number"]::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        input {
          width: 60%;
          height: 100%;
          outline: none;
          border: none;
          box-sizing: border-box;
          border-radius: 5px 0 0 5px;
          background-color: #fafafa;
          text-align: center;
        }
        .quantity_btnbox {
          display: flex;
          flex-direction: column;
          box-sizing: border-box;
          justify-content: center;
          align-items: center;
          width: 40%;
          height: 100%;
          button {
            box-sizing: border-box;
            height: 18px;
            width: 100%;
            border: 1px solid #333;
            background-color: #444;
            color: #fff;
            cursor: pointer;
            &:nth-child(1) {
              border-radius: 0 5px 0 0;
              border-bottom: none;
            }
            &:nth-child(2) {
              border-radius: 0 0 5px 0;
            }
          }
        }
      }
      .item_stock {
        padding-top: 10px;
        font-size: 13px;
        color: red;
      }
    }
    td:nth-child(7) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 7px;
      div {
        cursor: pointer;
        text-align: left;
        border-radius: 3px;
        width: 90px;
        background-color: #555;
        font-size: 12px;
        padding: 7px 0 7px 10px;
        color: #fff;
        transition: transform 0.3s;
        &:active {
          transform: scale(0.96);
        }
        &:nth-child(1):hover,
        &:nth-child(2):hover {
          background-color: #333;
        }
        &:nth-child(1) {
          transition: all 0.3s;
        }
        &:nth-child(2) {
          background-color: #fff;
          color: #333;
          border: 1px solid #333;
          transition: all 0.7s;
        }
        &:nth-child(2):hover {
          background-color: #fff;
          box-shadow: 100px 0 0 0 #333 inset;
          color: #fff;
        }
        &:nth-child(3) {
          background-color: #fff;
          color: #333;
          border: 1px solid #cdcdcd;
          position: relative;
          img {
            position: absolute;
            width: 11px;
            height: 11px;
            right: 10px;
          }
        }
      }
    }
    td:nth-child(3) {
      text-align: left;
    }
    tbody tr {
      border-bottom: 1px solid #d7d5d5;
    }
    tfoot td {
      text-align: right;
      padding-right: 30px;
      height: 50px;
      font-weight: bold;
    }
  }
  .cart_deletebtn_box {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    font-size: 14px;
    div:hover img {
      filter: invert(95%) sepia(5%) saturate(0%) hue-rotate(40deg)
        brightness(104%) contrast(106%);
    }
    .cart_selected_delete_box {
      border: 1px solid #333;
      border-radius: 5px;
      cursor: pointer;
    }
    .cart_selected_delete_box:hover {
      background-color: #444;
      color: #fff;
    }
    .cart_selected_delete_box:active {
      background-color: #222;
    }
    .cart_selected_delete_box {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 5px 10px;

      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
    }
    .cart_alldelete {
      cursor: pointer;
      border: 1px solid #333;
      padding: 8px 16px;
      border-radius: 5px;
      &:hover {
        background-color: #444;
        color: #fff;
      }
      &:active {
        background-color: #222;
      }
    }
  }
  .cart_selected_price_box {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .selected_price_infobox {
      width: 100%;
      display: flex;
      height: 50px;
      border-top: 1px solid #d7d5d5;
      border-bottom: 1px solid #d7d5d5;
      .marginbox {
        width: 48%;
      }
      .selected_price_info {
        width: 52%;
        line-height: 50px;
      }
    }
    .selected_price_infobox2 {
      width: 100%;
      display: flex;
      .marginbox {
        width: 48%;
      }
      .selected_price_info {
        width: 52%;
        line-height: 50px;
        font-weight: 600;
        font-size: 20px;
        color: #50d2ba;
      }
    }
  }
  .cart_order_btnbox {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin: 30px 0 200px 0;
    .cart_order_btn {
      background-color: #50d2ba;
      cursor: pointer;
      display: flex;
      padding: 15px 20px;
      align-items: center;
      border-radius: 5px;
      animation: back 1.2s infinite;
      @keyframes back {
        0% {
          opacity: 0.8;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0.8;
        }
      }
      img {
        width: 20px;
        height: 20px;
        margin-right: 10px;
      }
      div {
        color: #fff;
        font-size: 15px;
      }
    }
  }
`;
