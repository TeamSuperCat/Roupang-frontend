import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axios";

export const getItems = createAsyncThunk("item/getItems", async () => {
  const response = await axiosClient.get(
    "/products/category/2?page=0&size=5&order="
  );
  return response.data;
});

const initialState = {
  items: [],
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        console.log("팬딩", state);
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload;
        console.log(action.payload, "풀필드");
      })
      .addCase(getItems.rejected, (state, action) => {
        console.log(state, "리젝");
        console.log(action, "리젝2");
      });
  },
});

export default itemSlice.reducer;