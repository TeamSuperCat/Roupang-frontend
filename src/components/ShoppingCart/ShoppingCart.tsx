import React, { useState, ChangeEvent } from "react";
import styled from "styled-components";

type Item = {
  id: number;
  name: string;
  imageUrl?: string;
  quantity: number;
  price: number;
};

const ShoppingCart = () => {
  const [items, setItems] = useState<Item[]>([
    {
      id: 1,
      name: "아이템1",
      quantity: 1,
      price: 15000,
      imageUrl: "/img/cart1.jpg",
    },
    {
      id: 2,
      name: "아이템2",
      quantity: 6,
      price: 6000,
      imageUrl: "/img/cart2.jpg",
    },
    // ...
  ]);

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(items);
    } else {
      setSelectedItems([]);
    }
  };

  console.log(selectedItems);

  const handleItemSelect = (itemToSelect: Item) => {
    if (selectedItems.some((item) => item.id === itemToSelect.id)) {
      setSelectedItems((prev) =>
        prev.filter((item) => item.id !== itemToSelect.id)
      );
    } else {
      const newItem: Item = {
        id: itemToSelect.id,
        name: itemToSelect.name,
        quantity: 1,
        price: 15000,
      };
      setSelectedItems((prev) => [...prev, newItem]);
    }
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteAll = () => {
    setItems([]);
    setSelectedItems([]);
  };

  const incrementQuantity = (id: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );

    setSelectedItems(
      selectedItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      })
    );
  };

  const decrementQuantity = (id: number) => {
    setItems(
      items.map((item) => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );

    setSelectedItems(
      selectedItems.map((item) => {
        if (item.id === id && item.quantity > 1) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
    );
  };
  // const BuyPrice = selectedItems.reduce(
  //   (sum, item) => sum + item.price * item.quantity,
  //   0
  // );

  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  console.log(selectedItems);

  return (
    <CartWrapper>
      <div className="cart_title">CART</div>
      <div>
        <div>
          <div className="cart_length_view">
            <span>상품 0 개</span>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <colgroup>
              <col style={{ width: "5%" }} />
              <col style={{ width: "15%" }} />
              <col style={{ width: "40%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
              <col style={{ width: "10%" }} />
            </colgroup>
            <thead>
              <tr>
                <th>
                  <input
                    type="checkbox"
                    onChange={handleSelectAll}
                    checked={Boolean(
                      items.length && selectedItems.length === items.length
                    )}
                  />
                </th>
                <th>사진</th>
                <th>상품정보</th>
                <th>가격</th>
                <th>수량</th>
                <th>합계</th>
                <th>동작</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <input
                      type="checkbox"
                      onChange={() => handleItemSelect(item)}
                      checked={selectedItems.some(
                        (selected) => selected.id === item.id
                      )}
                    />
                  </td>
                  <td>
                    <img src={item.imageUrl} alt="상품이미지" />
                  </td>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => decrementQuantity(item.id)}>
                      -
                    </button>
                    <button onClick={() => incrementQuantity(item.id)}>
                      +
                    </button>
                  </td>

                  <td>{item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => handleDelete(item.id)}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>총 금액: {totalPrice} 원</td>
              </tr>
            </tfoot>
          </table>
          <button onClick={handleDeleteAll}>장바구니 비우기</button>
        </div>
      </div>
    </CartWrapper>
  );
};

export default ShoppingCart;

const CartWrapper = styled.div`
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
    td {
      height: 110px;
      img {
        width: 80px;
        height: 80px;
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
    }
  }
`;
