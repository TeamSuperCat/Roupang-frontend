type CartItemProps = {
  item: CartItem;
  handleItemSelect: (item: CartItem) => void;
  plusQuantity: (id: number) => void;
  minusQuantity: (id: number) => void;
  handleDelete: (id: number, productIdx: number) => void;
  selectedItems: CartItem[];
  formatCurrency: (price: number) => string;
  SelectgoOrder: (id: number) => void;
};

const CartItem: React.FC<CartItemProps> = ({
  item,
  handleItemSelect,
  plusQuantity,
  minusQuantity,
  handleDelete,
  formatCurrency,
  selectedItems,
  SelectgoOrder,
}) => {
  console.log(item.productIdx);
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
        <img src={item.productImg} alt="상품이미지" />
      </td>
      <td>{item.productName}</td>
      <td>{formatCurrency(item.price)}</td>
      <td>
        <div className="quantity_inputbox">
          <input type="number" value={item.amount} readOnly />
          <div className="quantity_btnbox">
            <button onClick={() => plusQuantity(item.id)}>
              <img src="/img/toparw.svg" alt="화살표" />
            </button>
            <button onClick={() => minusQuantity(item.id)}>
              <img src="/img/bottomarw.svg" alt="화살표" />
            </button>
          </div>
        </div>
        <div className="item_stock">재고 : {item.productStock}</div>
      </td>

      <td>{formatCurrency(item.price * item.amount)}</td>
      <td className="cart_item_btnbox">
        <div onClick={() => SelectgoOrder(item.id)}>주문하기</div>
        <div>위시리스트</div>
        <div onClick={() => handleDelete(item.id, item.productIdx)}>
          삭제
          <img src="/img/delete.svg" alt="삭제" />
        </div>
      </td>
    </tr>
  );
};

export default CartItem;
