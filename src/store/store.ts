import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/cartSlice";
import modalReducer from "../slice/tmpSlice";
import itemReducer from "../slice/ItemSlice";

export const store = configureStore({
  reducer: {
    modalReducer,
    cart: cartReducer,
    item: itemReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
