import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: {
  isLogin: boolean;
} = {
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
    },
    logout: (state, action: PayloadAction<boolean>) => {
      state.isLogin = action.payload;
      localStorage.removeItem("accessToken");
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
