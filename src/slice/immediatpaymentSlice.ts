import { createSlice } from "@reduxjs/toolkit";

interface orderProduct {
  amount: number;
  optionDetail: string;
  productIdx: number | null;
}

const initialState: orderProduct = {
  amount: 500,
  optionDetail: "테스트옵션",
  productIdx: 500,
};

const immediatPaymentSlice = createSlice({
  name: "immediatPayment",
  initialState,
  reducers: {
    order: (state, action) => {
      console.log("state.amount", state.amount);
      console.log("state.optionDetail", state.optionDetail);
      console.log("state.productIdx", state.productIdx);
      console.log(action);
    },
  },
});

export const { order } = immediatPaymentSlice.actions;

export default immediatPaymentSlice.reducer;
