import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/cartSlice";
import modalReducer from "../slice/modalSlice";

export const store = configureStore({
  reducer: {
    modalReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
