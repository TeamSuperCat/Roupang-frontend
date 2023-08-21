import { createAsyncThunk } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import axiosClient from "../api/axios";

export const getAllCategorys = createAsyncThunk<AllProducts[], void>(
  "main/getAllCategorys",
  async () => {
    const getCategoryUrl = (categoryId: number) =>
      `/products/category/${categoryId}?page=0&size=5&order=`;
    const categoryIds = [1, 2, 3, 4, 5, 6, 7];
    const responses = await Promise.all(
      categoryIds.map((id) => axiosClient.get(getCategoryUrl(id)))
    );
    return responses.map((response) => response.data.content);
  }
);

type AllProducts = ItemData[];

const initialState: { items: AllProducts[]; isLoading: boolean } = {
  items: [],
  isLoading: false,
};

const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCategorys.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(getAllCategorys.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = true;
      })
      .addCase(getAllCategorys.rejected, (state, action) => {
        console.log(action.error, "실패");
        state.isLoading = false;
      });
  },
});

export default mainSlice.reducer;
