import { useAppDispatch, useAppSelector } from "../../hooks/useDispatch";
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

export const useCartDispatch = () => {
  const dispatch = useAppDispatch();

  const items = useAppSelector((state) => state.cart.items);
  const selectedItems = useAppSelector((state) => state.cart.selectedItems);

  const handleSelectAll = (isChecked: boolean) => {
    if (isChecked) {
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
  };
};
