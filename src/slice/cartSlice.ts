import { createSlice, PayloadAction } from "@reduxjs/toolkit";

declare interface CartState {
  items: CartItem[];
  selectedItems: CartItem[];
  order: CartItem[];
}

const initialState: CartState = {
  items: [],
  selectedItems: [],
  order: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    removeItem: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    selectItem: (state, action: PayloadAction<CartItem>) => {
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
        item.amount += 1;
        const selectedItem = state.selectedItems.find(
          (selected) => selected.id === id
        );
        if (selectedItem) {
          selectedItem.amount = item.amount;
        }
      }
    },
    decrementQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item && item.amount > 1) {
        item.amount -= 1;
        const selectedItem = state.selectedItems.find(
          (selected) => selected.id === id
        );
        if (selectedItem) {
          selectedItem.amount = item.amount;
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
  extraReducers: (builder) => {
    builder;
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
