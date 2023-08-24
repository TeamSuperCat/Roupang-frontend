import { createSlice } from "@reduxjs/toolkit";
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
    toggleOpen: (state) => {
      state.value = !state.value;
    },
    modalClose: (state) => {
      state.value = false;
    },
    modalOpen: (state) => {
      state.value = true;
    },
  },
});

export const { toggleOpen, modalClose, modalOpen } = modalSlice.actions;

export const toggleState = (state: RootState) => state.modal.value;

export default modalSlice.reducer;
