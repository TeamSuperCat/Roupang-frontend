import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axios";

export const getItems = createAsyncThunk(
  "item/getItems",
  async (categoryId: string | number) => {
    const response = await axiosClient.get(
      `/products/category/${categoryId}?page=0&size=5&order=`
    );
    return response.data.content;
  }
);

export const getCateItems = createAsyncThunk(
  "item/getCateItems",
  async ({
    categoryId,
    category,
  }: {
    categoryId: string | number;
    category: string;
  }) => {
    const response = await axiosClient.get(
      `/products/category/${categoryId}?page=0&size=5&order=${category}`
    );
    return response.data.content;
  }
);

const initialState: {
  items: ItemData[];
  isLoading: boolean;
  categorynum: string | number;
} = {
  items: [],
  isLoading: true,
  categorynum: "",
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    getCatenum: (state, action: PayloadAction<string | number>) => {
      state.categorynum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload;
        console.log(action.payload, "풀필드1");
        state.isLoading = false;
      })
      .addCase(getItems.rejected, (state, action) => {
        console.log(action.error, "실패");
        state.isLoading = false;
      })
      .addCase(getCateItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getCateItems.fulfilled, (state, action) => {
        state.items = action.payload;
        console.log(action.payload, "풀필드1");
        state.isLoading = false;
      })
      .addCase(getCateItems.rejected, (state, action) => {
        console.log(action.error, "실패");
        state.isLoading = false;
      });
  },
});

export const { getCatenum } = itemSlice.actions;

export default itemSlice.reducer;
