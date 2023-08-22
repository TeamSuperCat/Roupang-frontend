import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axios";

export const getItems = createAsyncThunk(
  "item/getItems",
  async (categoryId: string) => {
    const response = await axiosClient.get(
      `/products/category/${categoryId}?page=0&size=12&order=`
    );
    return response.data;
  }
);

export const getCateItems = createAsyncThunk(
  "item/getCateItems",
  async ({
    categoryId,
    category,
  }: {
    categoryId: string;
    category: string;
  }) => {
    const response = await axiosClient.get(
      `/products/category/${categoryId}?page=0&size=12&order=${category}`
    );
    return response.data;
  }
);

const initialState: {
  items: ItemData[];
  isLoading: boolean;
  categorynum: string;
  Totalitems: number;
} = {
  items: [],
  isLoading: true,
  categorynum: "",
  Totalitems: 0,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    getCatenum: (state, action: PayloadAction<string>) => {
      state.categorynum = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.items = action.payload.content;
        state.Totalitems = action.payload.totalElements;
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
        state.items = action.payload.content;
        state.Totalitems = action.payload.totalElements;
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
