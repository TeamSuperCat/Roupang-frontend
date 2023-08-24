import { RootState } from "./../store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Data {
  data: number[];
}

const storage = localStorage.getItem("recent");
const ids = storage ? JSON.parse(storage) : [];

const initialState: Data = {
  data: ids,
};

const localStorageSlice = createSlice({
  name: "localStorage",
  initialState,
  reducers: {
    setData: (state, action: PayloadAction<number[]>) => {
      const newData = action.payload;
      state.data = [...newData];
      // localStorage.setItem("recent", JSON.stringify(state.data));
    },
  },
});

export const { setData } = localStorageSlice.actions;
export const storageState = (state: RootState) => state.storage.data;
export default localStorageSlice.reducer;
