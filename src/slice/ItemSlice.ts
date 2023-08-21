import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axios";

export const getItems = createAsyncThunk("item/getItems", async () => {
  const response = await axiosClient.get(
    "/products/category/1?page=0&size=5&order="
  );
  return response.data;
});

const initialState = {
  items: [],
  isLoading: false,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload;
        console.log(action.payload, "풀필드1");
      })
      .addCase(getItems.rejected, (state, action) => {
        console.log(action.error, "실패");
      });
  },
});

export default itemSlice.reducer;
