import { RootState } from "./../store/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type TypeAddress = {
  base?: string;
  rest?: string;
};
export interface EmailType {
  forward: string;
  backward: string;
}
export interface PhoneType extends EmailType {
  prefix: string;
}

export interface FormDataType {
  To: string;
  address: string;
  phone: string;
  email: string;
}

export interface ProductsType {
  singleOrderNum: number;
  productName: string;
  productImg: string;
  description: string;
  amount: number;
  allPrice: number;
  option: string;
}

interface Data {
  zipCode: string;
  address: TypeAddress;
  phoneNum: PhoneType;
  email: EmailType;
  formData: FormDataType;
  point: number;
  products: ProductsType[];
}

const initialState: Data = {
  zipCode: "",
  address: {
    base: "",
    rest: "",
  },
  phoneNum: {
    prefix: "",
    forward: "",
    backward: "",
  },
  email: {
    forward: "",
    backward: "",
  },
  formData: {
    To: "",
    address: "",
    phone: "",
    email: "",
  },
  point: 0,
  products: [],
};

const orderSlice = createSlice({
  name: "orderInfo",
  initialState,
  reducers: {
    setZipCode: (state, action: PayloadAction<string>) => {
      state.zipCode = action.payload;
    },
    setAddress: (state, action: PayloadAction<TypeAddress>) => {
      state.address = action.payload;
    },
    setPhone: (state, action: PayloadAction<PhoneType>) => {
      state.phoneNum = action.payload;
    },
    setEmail: (state, action: PayloadAction<EmailType>) => {
      state.email = action.payload;
    },
    setFormData: (state, action: PayloadAction<FormDataType>) => {
      state.formData = action.payload;
    },
    setPoint: (state, action: PayloadAction<number>) => {
      state.point = action.payload;
    },
    setProducts: (state, action: PayloadAction<ProductsType[]>) => {
      state.products = action.payload;
    },
  },
});

export const {
  setZipCode,
  setAddress,
  setPhone,
  setEmail,
  setFormData,
  setPoint,
  setProducts,
} = orderSlice.actions;

export const zipCodeState = (state: RootState) => state.order.zipCode;
export const addressState = (state: RootState) => state.order.address;
export const phoneState = (state: RootState) => state.order.phoneNum;
export const emailState = (state: RootState) => state.order.email;
export const formData = (state: RootState) => state.order.formData;
export const pointState = (state: RootState) => state.order.point;
export const productsState = (state: RootState) => state.order.products;

export default orderSlice.reducer;
