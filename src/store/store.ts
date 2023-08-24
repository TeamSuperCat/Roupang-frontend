import { configureStore } from "@reduxjs/toolkit"; // combineReducers 추가
import cartReducer from "../slice/cartSlice";
import modalReducer from "../slice/modalSlice";
import itemReducer from "../slice/ItemSlice";
import mainReducer from "../slice/mainSlice";
import storageSlice from "../slice/storageSlice";
import orderSlice from "../slice/orderSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "../slice/userSlice";

export const rootReducer = combineReducers({
  reducer: {
    modalReducer,
    cart: cartReducer,
    item: itemReducer,
    main: mainReducer,
    storage: storageSlice,
    order: orderSlice,
    user: userReducer,
  },
});
const persistConfig = {
  key: "reduxData",
  storage,
  whitelist: ["cart", "item", "main"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
