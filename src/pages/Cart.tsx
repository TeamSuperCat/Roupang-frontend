import React, { useState, ChangeEvent } from "react";
import { styled } from "styled-components";

type Item = {
  id: number;
  name: string;
  imageUrl?: string;
  quantity: number;
  price: number;
};

const Cart: React.FC = () => {
  const [items, setItems] = useState<Item[]>([
    // 예시 데이터를 적용할 수 있습니다.
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

  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedItems(items.map((item) => item.id));
    } else {
      setSelectedItems([]);
    }
  };

  console.log(selectedItems);

  const handleItemSelect = (id: number) => {
    if (selectedItems.includes(id)) {
      setSelectedItems((prev) => prev.filter((itemId) => itemId !== id));
    } else {
      setSelectedItems((prev) => [...prev, id]);
    }
  };

  const handleDelete = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleDeleteAll = () => {
    setItems((prev) => prev.filter((item) => !selectedItems.includes(item.id)));
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
  };

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
                <th>수량</th>
                <th>가격</th>
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
                      onChange={() => handleItemSelect(item.id)}
                      checked={selectedItems.includes(item.id)}
                    />
                  </td>
                  <td>
                    <img src={item.imageUrl} alt="상품이미지" />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    <input type="number" value={item.quantity} readOnly />
                    <button onClick={() => decrementQuantity(item.id)}>
                      -
                    </button>
                    <button onClick={() => incrementQuantity(item.id)}>
                      +
                    </button>
                  </td>
                  <td>{item.price}</td>
                  <td>{item.price * item.quantity}</td>
                  <td>
                    <button onClick={() => handleDelete(item.id)}>삭제</button>
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>총 금액: {/* 계산된 총 금액 넣기 */}원</td>
              </tr>
            </tfoot>
          </table>
          <button onClick={handleDeleteAll}>장바구니 비우기</button>
        </div>
      </div>
    </CartWrapper>
  );
};

export default Cart;

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
      height: 100px;
    }
  }
`;
