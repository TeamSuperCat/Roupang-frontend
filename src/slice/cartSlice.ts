import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axiosClient from "../api/axios";

export const getCartItems = createAsyncThunk<CartItem[], void>(
  "cart/getCartItems",
  async () => {
    const response = await axiosClient.get<CartItem[]>(`/cart`);
    return response.data;
  }
);
export const AlldeleteCart = createAsyncThunk(
  "cart/AlldeleteCart",
  async () => {
    const response = await axiosClient.delete(`/cart`);
    return response.data;
  }
);
export const selectdeleteCart = createAsyncThunk(
  "cart/selectdeleteCart",
  async (productIdx: number) => {
    const response = await axiosClient.patch(`/cart`, {
      productIdx,
    });

    return response.data;
  }
);

declare interface CartState {
  items: CartItem[];
  selectedItems: CartItem[];
  order: OrderItem[];
  isLoading: boolean;
  liveview: number;
}
export interface OrderItem {
  amount: number;
  optionDetail: string;
  productIdx: number;
}

//items는 장바구니 데이터, selectedItems는 현재 장바구니에서 선택된 데이터, order는 결제페이지에서 확인하는 데이터입니다.
const initialState: CartState = {
  items: [], //장바구니에 보여질화면
  selectedItems: [],
  order: [], //결제화면에 보여줄 아이템들
  isLoading: false,
  liveview: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = [];
    },
    immediatPayment: (state, action) => {
      state.order = [action.payload];
    },
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
    clearselectedItems: (state) => {
      state.selectedItems = [];
    },
    moveOrder: (state) => {
      state.order = state.selectedItems.map((item) => ({
        amount: item.amount,
        optionDetail: item.optionDetail,
        productIdx: item.productIdx,
      }));
      console.log(state.order);
    },
    selectedOrder: (state, action) => {
      const orderItem = state.items.find((item) => item.id === action.payload);
      const { amount, optionDetail, productIdx } = orderItem as OrderItem;
      state.order = [{ amount, optionDetail, productIdx }];
    },
    cartHeaderview: (state, action) => {
      state.liveview = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
      })
      .addCase(getCartItems.rejected, (state, action) => {
        console.log(action.error, "실패");
        state.isLoading = false;
      })
      .addCase(AlldeleteCart.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(AlldeleteCart.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(AlldeleteCart.rejected, (state, action) => {
        console.log(action.error, "실패");
        state.isLoading = false;
      })
      .addCase(selectdeleteCart.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(selectdeleteCart.fulfilled, (state, action) => {
        state.isLoading = false;
        console.log(action.payload);
      })
      .addCase(selectdeleteCart.rejected, (state, action) => {
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
  clearselectedItems,
  moveOrder,
  immediatPayment,
  selectedOrder,
  clearOrder,
  cartHeaderview,
} = cartSlice.actions;

export default cartSlice.reducer;
