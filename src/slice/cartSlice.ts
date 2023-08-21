import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Item {
  id: number;
  name: string;
  imageUrl?: string;
  quantity: number;
  price: number;
  stock: number;
}

declare interface CartState {
  items: Item[];
  selectedItems: Item[];
}

const initialState: CartState = {
  items: [
    {
      id: 1,
      name: "아이템1",
      quantity: 1,
      price: 15000,
      imageUrl: "/img/cart1.jpg",
      stock: 5,
    },
    {
      id: 2,
      name: "아이템2",
      quantity: 6,
      price: 6000,
      imageUrl: "/img/cart2.jpg",
      stock: 17,
    },
  ],
  selectedItems: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    selectItem: (state, action: PayloadAction<Item>) => {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem.id);
      if (existingItem && !state.selectedItems.includes(existingItem)) {
        state.selectedItems.push(existingItem);
      }
    },
    deselectItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.selectedItems = state.selectedItems.filter(
        (item) => item.id !== id
      );
    },
    selectAllItems: (state) => {
      state.selectedItems = [...state.items];
    },
    deselectAllItems: (state) => {
      state.selectedItems = [];
    },
    incrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity += 1;
        const selectedItem = state.selectedItems.find(
          (selected) => selected.id === id
        );
        if (selectedItem) {
          selectedItem.quantity = item.quantity;
        }
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
        const selectedItem = state.selectedItems.find(
          (selected) => selected.id === id
        );
        if (selectedItem) {
          selectedItem.quantity = item.quantity;
        }
      }
    },
    removeAll: (state) => {
      state.items = [];
      state.selectedItems = [];
    },
    removeSelected: (state) => {
      const selectedItemIds = state.selectedItems.map((item) => item.id);
      state.items = state.items.filter(
        (item) => !selectedItemIds.includes(item.id)
      );
      state.selectedItems = [];
    },
  },
});

export const {
  removeItem,
  selectItem,
  deselectItem,
  selectAllItems,
  deselectAllItems,
  incrementQuantity,
  decrementQuantity,
  removeAll,
  removeSelected,
} = cartSlice.actions;

export default cartSlice.reducer;
