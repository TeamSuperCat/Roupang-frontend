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
      padding: 10px 0;
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
    }
  }
`;
