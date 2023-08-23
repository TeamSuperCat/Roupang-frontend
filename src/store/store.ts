import { configureStore, combineReducers } from "@reduxjs/toolkit"; // combineReducers 추가
import cartReducer from "../slice/cartSlice";
import modalReducer from "../slice/modalSlice";
import itemReducer from "../slice/ItemSlice";
import mainReducer from "../slice/mainSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "reduxData",
  storage,
  whitelist: ["cart", "item", "main"],
};

const rootReducer = combineReducers({
  modalReducer,
  cart: cartReducer,
  item: itemReducer,
  main: mainReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
