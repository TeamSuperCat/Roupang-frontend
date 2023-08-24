import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slice/cartSlice";
import modalReducer from "../slice/modalSlice";
import itemReducer from "../slice/ItemSlice";
import mainReducer from "../slice/mainSlice";
import storageSlice from "../slice/storageSlice";
import orderSlice from "../slice/orderSlice";

export const store = configureStore({
  reducer: {
    modalReducer,
    cart: cartReducer,
    item: itemReducer,
    main: mainReducer,
    storage: storageSlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
