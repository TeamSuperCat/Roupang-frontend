import React from "react";

type Item = {
  id: number;
  name: string;
  imageUrl?: string;
  quantity: number;
  price: number;
  stock: number;
};

type CartItemProps = {
  item: Item;
  handleItemSelect: (item: Item) => void;
  plusQuantity: (id: number) => void;
  minusQuantity: (id: number) => void;
  handleDelete: (id: number) => void;
  selectedItems: Item[];
  formatCurrency: (price: number) => string;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  handleItemSelect,
  plusQuantity,
  minusQuantity,
  handleDelete,
  formatCurrency,
  selectedItems,
}) => {
  return (
    <tr key={item.id}>
      <td>
        <input
          type="checkbox"
          onChange={() => handleItemSelect(item)}
          checked={selectedItems.some((selected) => selected.id === item.id)}
        />
      </td>
      <td>
        <img src={item.imageUrl} alt="상품이미지" />
      </td>
      <td>{item.name}</td>
      <td>{formatCurrency(item.price)}</td>
      <td>
        <div className="quantity_inputbox">
          <input type="number" value={item.quantity} readOnly />
          <div className="quantity_btnbox">
            <button onClick={() => plusQuantity(item.id)}>
              <img src="/img/toparw.svg" alt="화살표" />
            </button>
            <button onClick={() => minusQuantity(item.id)}>
              <img src="/img/bottomarw.svg" alt="화살표" />
            </button>
          </div>
        </div>
        <div className="item_stock">재고 : {item.stock}</div>
      </td>

      <td>{formatCurrency(item.price * item.quantity)}</td>
      <td className="cart_item_btnbox">
        <div>주문하기</div>
        <div>위시리스트</div>
        <div onClick={() => handleDelete(item.id)}>
          삭제
          <img src="/img/delete.svg" alt="삭제" />
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
