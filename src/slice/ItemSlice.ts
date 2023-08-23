import { PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axios";

export const getItems = createAsyncThunk(
  "item/getItems",
  async (categoryId: string | number) => {
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
    categoryId: string | number;
    category: string;
  }) => {
    const response = await axiosClient.get(
      `/products/category/${categoryId}?page=0&size=12&order=${category}`
    );
    return response.data;
  }
);

export const getSearchItems = createAsyncThunk(
  "item/getSearchItems",
  async ({
    keyword,
    sorttype = "",
  }: {
    keyword: string;
    sorttype?: string;
  }) => {
    const response = await axiosClient.get(
      `/products/search?keyword=${keyword}&page=0&size=12&order=${sorttype}`
    );
    return response.data;
  }
);

const initialState: {
  items: ItemData[];
  isLoading: boolean;
  categorynum: string | number;
  catesort: string;
  Totalitems: number;
  keyword: string;
  queryreset: number;
} = {
  items: [],
  isLoading: true,
  categorynum: "",
  catesort: "",
  Totalitems: 0,
  keyword: "",
  queryreset: 0,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    getCatenum: (state, action: PayloadAction<string | number>) => {
      state.categorynum = action.payload;
    },
    getSortType: (state, action: PayloadAction<string>) => {
      state.catesort = action.payload;
    },
    getKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    chechControl: (state) => {
      state.queryreset = Math.random();
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
        state.catesort = "";
        state.keyword = "";
        state.queryreset = 0;
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
        state.queryreset = 0;
        state.isLoading = false;
      })
      .addCase(getCateItems.rejected, (state, action) => {
        console.log(action.error, "실패");
        state.isLoading = false;
      })
      .addCase(getSearchItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSearchItems.fulfilled, (state, action) => {
        state.items = action.payload.content;
        state.Totalitems = action.payload.totalElements;
        state.queryreset = 0;
        state.isLoading = false;
      })
      .addCase(getSearchItems.rejected, (state, action) => {
        console.log(action.error, "실패");
        state.keyword = "";
        state.items = [];
        state.Totalitems = 0;
        state.queryreset = Math.random();
        state.isLoading = false;
      });
  },
});

export const { getCatenum, getSortType, getKeyword, chechControl } =
  itemSlice.actions;

export default itemSlice.reducer;
