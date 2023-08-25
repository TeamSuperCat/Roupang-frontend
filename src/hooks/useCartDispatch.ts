import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "../hooks/useDispatch";
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
  getCartItems,
  clearselectedItems,
  moveOrder,
  selectedOrder,
  clearOrder,
  AlldeleteCart,
  selectdeleteCart,
} from "../slice/cartSlice";

export const useCartDispatch = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const selectedItems = useAppSelector((state) => state.cart.selectedItems);
  const ordered = useAppSelector((state) => state.cart.order);
  const navigate = useNavigate();

  //장바구니 전체 선택, 혹은 현재 전체 선택되어있다면 전체 해제합니다.
  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      dispatch(selectAllItems());
    } else {
      dispatch(deselectAllItems());
    }
  };
  //해당 상품을 선택하거나 선택 취소합니다.
  const handleItemSelect = (itemToSelect: CartItem) => {
    if (selectedItems.some((item) => item.id === itemToSelect.id)) {
      dispatch(deselectItem(itemToSelect.id));
    } else {
      dispatch(selectItem(itemToSelect));
    }
  };

  console.log(selectedItems);
  //선택된 값들을 초기화해줍니다. 장바구니에 처음 진입할때만 사용됩니다.
  const selectClear = () => {
    dispatch(clearselectedItems());
  };
  //서버로부터 내 장바구니 데이터를 받아옵니다.
  const getCartlisting = () => {
    dispatch(getCartItems());
  };
  //단일 상품을 삭제합니다.
  const handleDelete = (id: number, productIdx: number) => {
    dispatch(removeItem(id));
    dispatch(selectdeleteCart(productIdx));
  };
  //장바구니의 상품들을 전체 삭제합니다.
  const handleDeleteAll = () => {
    dispatch(AlldeleteCart());
    dispatch(removeAll());
  };
  //장바구니에서 선택된 상품들만 삭제합니다.
  const handleDeleteSelected = () => {
    dispatch(removeSelected());
  };
  //현재 장바구니의 상품 수량을 1씩 증가시킵니다.
  const plusQuantity = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item && item.amount < item.productStock) {
      dispatch(incrementQuantity(id));
    }
  };
  //현재 장바구니의 상품 수량을 1씩 감소시킵니다.
  const minusQuantity = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item && item.amount > 1) {
      dispatch(decrementQuantity(id));
    }
  };
  //현재 장바구니에서 선택된 상품들을 결제페이지에서 조회할수있게 값을 보내주고, 결제페이지로 이동합니다.
  const goOrder = () => {
    dispatch(moveOrder());
    navigate("/order");
  };
  //단일 상품 구매입니다.
  const SelectgoOrder = (id: number) => {
    dispatch(selectedOrder(id));
    navigate("/order");
  };

  const clearPayment = () => {
    dispatch(clearOrder());
  };

  return {
    items,
    selectedItems,
    handleSelectAll,
    handleItemSelect,
    handleDelete,
    handleDeleteAll,
    handleDeleteSelected,
    plusQuantity,
    minusQuantity,
    getCartlisting,
    selectClear,
    goOrder,
    SelectgoOrder,
    ordered,
    clearPayment,
  };
};
