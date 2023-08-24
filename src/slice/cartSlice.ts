import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axios";

export const getCartItems = createAsyncThunk<CartItem[], void>(
  "item/getCartItems",
  async () => {
    const response = await axiosClient.get<CartItem[]>(`/cart`);
    return response.data;
  }
);

declare interface CartState {
  items: CartItem[];
  selectedItems: CartItem[];
  order: CartItem[];
  isLoading: boolean;
}

const initialState: CartState = {
  items: [], //장바구니에 보여질화면
  selectedItems: [],
  order: [], //결제화면에 보여줄 아이템들
  isLoading: false,
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
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
        console.log(action.payload);
        state.isLoading = false;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action.error, "실패");
        state.isLoading = false;
      });
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
