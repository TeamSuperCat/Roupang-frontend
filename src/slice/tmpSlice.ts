import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

interface TmpState {
  // 상태 정의
  value: boolean;
}

// Define the initial state using that type
const initialState: TmpState = {
  // 상태
  value: false,
};

export const modalSlice = createSlice({
  name: "modalOpen",
  initialState,
  reducers: {
    // increment: (state) => {
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
    toggleOpen: (state) => {
      state.value = !state.value;
    },
  },
});

export const { toggleOpen } = modalSlice.actions;

export const toggleState = (state: RootState) => state.modalReducer.value;
// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.counter.value;

export default modalSlice.reducer;
