import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/cartSlice";
import modalReducer from "../slice/modalSlice";
import itemReducer from "../slice/ItemSlice";
import mainReducer from "../slice/mainSlice";

export const store = configureStore({
  reducer: {
    modalReducer,
    cart: cartReducer,
    item: itemReducer,
    main: mainReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
