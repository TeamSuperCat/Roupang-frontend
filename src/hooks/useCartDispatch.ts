import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "./useDispatch";
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
} from "../slice/cartSlice";

export const useCartDispatch = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector((state) => state.cart.items);
  const selectedItems = useAppSelector((state) => state.cart.selectedItems);
  const ordered = useAppSelector((state) => state.cart.order);
  const navigate = useNavigate();

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
      dispatch(selectAllItems());
    } else {
      dispatch(deselectAllItems());
    }
  };

  const handleItemSelect = (itemToSelect: CartItem) => {
    if (selectedItems.some((item) => item.id === itemToSelect.id)) {
      dispatch(deselectItem(itemToSelect.id));
    } else {
      dispatch(selectItem(itemToSelect));
    }
  };

  const selectClear = () => {
    dispatch(clearselectedItems());
  };

  const getCartlisting = () => {
    dispatch(getCartItems());
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
    if (item && item.amount < item.productStock) {
      dispatch(incrementQuantity(id));
    }
  };

  const minusQuantity = (id: number) => {
    const item = items.find((item) => item.id === id);
    if (item && item.amount > 1) {
      dispatch(decrementQuantity(id));
    }
  };

  const goOrder = () => {
    dispatch(moveOrder());
    navigate("/order");
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
    ordered,
  };
};
