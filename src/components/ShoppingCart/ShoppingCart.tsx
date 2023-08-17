import React, { ChangeEvent } from "react";
import CartItem from "./CartItem";
import { CartWrapper } from "./StCart";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  selectItem,
  deselectItem,
  removeAll,
  removeSelected,
  incrementQuantity,
  decrementQuantity,
  selectAllItems,
  deselectAllItems,
} from "../../slice/cartSlice";

type Item = {
  id: number;
  name: string;
  imageUrl?: string;
  quantity: number;
  price: number;
  stock: number;
};

interface CartState {
  items: Item[];
  selectedItems: Item[];
}
interface RootState {
  cart: CartState;
}

const ShoppingCart = () => {
  const dispatch = useDispatch();

  const items = useSelector((state: RootState) => state.cart.items);
  const selectedItems = useSelector(
    (state: RootState) => state.cart.selectedItems
  );

  const handleSelectAll = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(selectAllItems());
    } else {
      dispatch(deselectAllItems());
    }
  };

  const handleItemSelect = (itemToSelect: Item) => {
    if (selectedItems.some((item) => item.id === itemToSelect.id)) {
      dispatch(deselectItem(itemToSelect.id));
    } else {
      dispatch(selectItem(itemToSelect));
    }
  };

  const handleDelete = (id: number) => {
    dispatch(removeItem(id));
  };

  const handleDeleteAll = () => {
    dispatch(removeAll());
  };

  const handleDeleteSelected = () => {
    dispatch(removeSelected());
  };

  const plusQuantity = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item && item.quantity < item.stock) {
      dispatch(incrementQuantity(id));
    }
  };

  const minusQuantity = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item && item.quantity > 1) {
      dispatch(decrementQuantity(id));
    }
  };

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("ko-KR").format(value);
  }

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
                <CartItem
                  key={item.id}
                  item={item}
                  handleItemSelect={handleItemSelect}
                  plusQuantity={plusQuantity}
                  minusQuantity={minusQuantity}
                  handleDelete={handleDelete}
                  selectedItems={selectedItems}
                  formatCurrency={formatCurrency}
                />
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={7}>총 금액: {formatCurrency(totalPrice)} 원</td>
              </tr>
            </tfoot>
          </table>
          <div>
            <button onClick={handleDeleteAll}>장바구니 전체삭제</button>
            <button onClick={handleDeleteSelected}>선택삭제</button>
          </div>
        </div>
      </div>
    </CartWrapper>
  );
};

export default ShoppingCart;
